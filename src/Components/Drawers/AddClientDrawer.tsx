import {
    Button,
    ButtonToolbar,
    Col,
    Container,
    DatePicker,
    Divider,
    Drawer,
    Form,
    Grid,
    Header,
    Modal,
    Row
} from "rsuite";
import React from "react";
import {SchemaModel, StringType, DateType} from "schema-typed"
import Client from "../../Models/Client";
import {FormInstance} from "rsuite/esm/Form/Form";
import ClientsService from "../../Services/ClientsService";
import {TakePictureModal} from "../Modals/TakePictureModal";
import {PaymentsService} from "../../Services/PaymentsService";
import {SubscriptionsService} from "../../Services/SubscriptionsService";
import {MinioService} from "../../Services/MinioService";

interface Props {
    open: boolean;
    onClose: () => void;
    close: () => void;
    clientId: string;
}

class FormValues {
    public surname: string;
    public name: string;
    public patronymic: string;
    public birthDate: Date;
    public phone?: string;

    constructor() {
        this.surname = "";
        this.name = "";
        this.patronymic = "";
        this.birthDate = new Date();
    }
}

const model = SchemaModel({
    surname: StringType().isRequired("Фамаилия должна быть указана"),
    name: StringType().isRequired("Имя должно быть указано"),
    patronymic: StringType().isRequired("Отчество должно быть указано"),
    birthDate: DateType().isRequired("Дата рождения должна быть указана")
})

const colStyle = {
    width: "160px"
}

export function AddClientDrawer(props: Props) {
    const formRef = React.useRef<FormInstance>(null);

    const [formValue, setFormValue] = React.useState<FormValues>(new FormValues());
    const [isOpen, setIsOpen] = React.useState(props.open);
    const [clientImage, setClientImage] = React.useState<string | null>();
    const [showTakePictureModal, setShowTakePictureModal] = React.useState(false);

    React.useEffect(() => {
        (async () => UseEffect())()
    }, [showTakePictureModal]);

    return (
        <div>
            <Drawer open={isOpen} onClose={() => {
                props.onClose();
                setIsOpen(false);
            }}>

                <Drawer.Header>
                    <b style={{fontSize: "18pt"}}>Новый клиент</b>
                </Drawer.Header>

                <Drawer.Body>

                    <Container>
                        <Header> <img
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                display: "block",
                                height: 256,
                                width: 256
                            }}
                            src={clientImage!}
                            alt={"фото"}
                        />
                        </Header>

                        <Button onClick={() => setShowTakePictureModal(true)}>Сфотографировать</Button>

                        {showTakePictureModal
                            ? <TakePictureModal clientId={props.clientId} onClose={() => setShowTakePictureModal(false)}/>
                            : <div/>}

                    </Container>

                    <Form
                        ref={formRef}
                        style={{paddingTop: "2%"}}
                        model={model}
                        formValue={formValue}
                        onChange={x => setFormValue(x as FormValues)}
                        onSubmit={OnSubmitForm}
                    >

                        <Divider>Личные данные</Divider>

                        <Container>
                            <Grid fluid>

                                <Row>

                                    <Col style={colStyle}>
                                        <Form.Group controlId="surname">
                                            <Form.ControlLabel>Фамилия</Form.ControlLabel>
                                            <Form.Control name="surname" style={colStyle} checkAsync/>
                                        </Form.Group>
                                    </Col>

                                    <Col style={colStyle}>
                                        <Form.Group controlId="name">
                                            <Form.ControlLabel>Имя</Form.ControlLabel>
                                            <Form.Control name="name" style={colStyle}/>
                                        </Form.Group>
                                    </Col>

                                    <Col style={colStyle}>
                                        <Form.Group controlId="patronymic">
                                            <Form.ControlLabel>Отчество</Form.ControlLabel>
                                            <Form.Control name="patronymic" style={colStyle}/>
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Row style={{paddingTop: "2%"}}>

                                    <Col style={colStyle}>
                                        <Form.Group controlId="birthDate">
                                            <Form.ControlLabel>ДатаРождения</Form.ControlLabel>
                                            <Form.Control name="birthDate" accepter={DatePicker} style={colStyle}/>
                                        </Form.Group>
                                    </Col>

                                    <Col style={colStyle}>
                                        <Form.Group controlId="phone">
                                            <Form.ControlLabel>Номер телефона</Form.ControlLabel>
                                            <Form.Control name="phone" style={colStyle}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Grid>
                        </Container>

                        <Divider>Действия</Divider>

                        <Container>
                            <Form.Group>
                                <ButtonToolbar>
                                    <Container>
                                        <Button
                                            appearance="primary"
                                            block
                                            type="submit"
                                        >
                                            Сохранить
                                        </Button>
                                        <Button
                                            onClick={OnCancelEditButtonClick}
                                            style={{paddingTop: "2%"}}
                                            appearance="primary"
                                            color="red"
                                            block
                                        >
                                            Отмена
                                        </Button>
                                    </Container>
                                </ButtonToolbar>
                            </Form.Group>
                        </Container>
                    </Form>
                </Drawer.Body>
            </Drawer>
        </div>
    )

    async function UseEffect(): Promise<void> {
        const img = await MinioService.GetImageOrDefault(`${props.clientId}.jpg`);

        setClientImage(URL.createObjectURL(img));
    }

    function OnCancelEditButtonClick(): void
    {
        formRef.current!.cleanErrors();

        setIsOpen(false);
        props.close();
    }

    async function OnSubmitForm()
    {
        if(!formRef.current!.check()) {
            return;
        }

        await ClientsService.AddClient(new Client(
            props.clientId,
            formValue.surname,
            formValue.name,
            formValue.patronymic,
            formValue.birthDate.toISOString(),
            formValue.phone
        ));

        setIsOpen(false);
        props.close();
    }
}