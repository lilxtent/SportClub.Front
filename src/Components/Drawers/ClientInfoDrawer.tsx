import {Button, ButtonToolbar, Col, Container, DatePicker, Divider, Drawer, Form, Grid, Modal, Row} from "rsuite";
import React from "react";
import {SchemaModel, StringType, DateType} from "schema-typed"
import Client from "../../Models/Client";
import {FormComponent, FormInstance} from "rsuite/esm/Form/Form";
import ClientsService from "../../Services/ClientsService";
import client from "../../Models/Client";

interface Props {
    open: boolean,
    onClose: () => void,
    client: Client
}

interface FormValues {
    id: string;
    surname: string;
    name: string;
    patronymic: string;
    birthDate: Date;
    phone: string
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

const phoneNumberIsNullMessage = "не указан";

function ClientInfoDrawer(props: Props) {
    const [formValue, setFormValue] = React.useState<FormValues>(GetFormValue(props.client));
    const formRef = React.useRef<FormInstance>(null);
    const [showInfo, setShowInfo] = React.useState(true);
    const [editInfo, setEditInfo] = React.useState(false);

    return (
        <div>
            <Drawer open={props.open} onClose={props.onClose}>

                <Drawer.Header>
                    <b style={{fontSize: "18pt"}}>{`${props.client.surname}  ${props.client.name}  ${props.client.patronymic}`}</b>
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
                        plaintext={!editInfo}
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
                                            <Form.Control name="phone" placeholder={phoneNumberIsNullMessage} style={colStyle}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Grid>
                        </Container>

                        <Divider>Действия</Divider>

                        <Container>
                            <Form.Group>
                                <ButtonToolbar style={{display: (editInfo ? "none" : "")}}>
                                    <Container>
                                        <Button onClick={() => {
                                            setShowInfo(false);
                                            setEditInfo(true)
                                        }}>Редактировать</Button>
                                    </Container>
                                </ButtonToolbar>
                                <ButtonToolbar style={{display: (editInfo ? "" : "none")}}>
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
        setFormValue(GetFormValue(props.client));

        formRef.current!.cleanErrors();

        setShowInfo(true);
        setEditInfo(false);
    }

    async function OnSubmitForm()
    {
        if(!formRef.current!.check()) {
            return;
        }

        let phone : string | null = formValue.phone;

        if (phone.trim() === "" || phone === phoneNumberIsNullMessage){
            phone = null;
        }

        await ClientsService.UpdateClient(new Client(
            formValue.id,
            formValue.surname,
            formValue.name,
            formValue.patronymic,
            formValue.birthDate.toISOString(),
            phone
        ));

        setShowInfo(true);
        setEditInfo(false);
    }
}


function GetFormValue(client: Client): FormValues {
    return new class {
        id = client.id;
        surname = client.surname;
        name = client.name;
        patronymic = client.patronymic;
        birthDate = new Date(client.birthDate);
        phone = client.phone ?? phoneNumberIsNullMessage
    }() as FormValues;
}

export default ClientInfoDrawer;