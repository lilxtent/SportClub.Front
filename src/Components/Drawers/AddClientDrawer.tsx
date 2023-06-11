import {Button, ButtonToolbar, Col, Container, DatePicker, Divider, Drawer, Form, Grid, Modal, Row} from "rsuite";
import React from "react";
import {SchemaModel, StringType, DateType} from "schema-typed"
import Client from "../../Models/Client";
import {FormInstance} from "rsuite/esm/Form/Form";
import ClientsService from "../../Services/ClientsService";

interface Props {
    open: boolean,
    onClose: () => void,
    close: () => void
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
    const [formValue, setFormValue] = React.useState<FormValues>(new FormValues());
    const [isOpen, setIsOpen] = React.useState(props.open);
    const formRef = React.useRef<FormInstance>(null);

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

                    <div>
                        <img
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                display: "block",
                                height: 256,
                                width: 256
                            }}
                            src={require('D:\\Repository\\Diplom\\sports-club-web\\src\\Images\\sonic.jpg')}
                            alt={"фото"}
                        />
                    </div>

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
            crypto.randomUUID(),
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