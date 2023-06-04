import {Button, ButtonToolbar, Col, Container, DatePicker, Divider, Drawer, Form, Grid, Modal, Row} from "rsuite";
import React from "react";
import {SchemaModel, StringType, DateType} from "schema-typed"
import Client from "../../Models/Client";
import {FormComponent, FormInstance} from "rsuite/esm/Form/Form";

interface Props {
    open: boolean,
    onClose: () => void,
    clientId: string
}

interface FormValues {
    Id: string;
    Surname: string;
    Name: string;
    Patronymic: string;
    BirtDate: Date;
}

const model = SchemaModel({
    Surname: StringType().isRequired("Фмаилия должна быть указана"),
    Name: StringType().isRequired("Имя должно быть указано"),
    Patronymic: StringType().isRequired("Отчество должно быть указано"),
    BirthDate: DateType().isRequired("Дата рождения должна быть указана")
})

const colStyle = {
    width: "160px"
}

function ClientInfoModal(props: Props) {
    const formRef = React.useRef<FormInstance>(null);

    let clientInfo = new Client(crypto.randomUUID(), "Ходкевич", "Александр", "Игоревич", new Date());

    const [formValue, setFormValue] = React.useState(GetFormValue(clientInfo));
    const [showInfo, setShowInfo] = React.useState(true);
    const [editInfo, setEditInfo] = React.useState(false);

    return (
        <div>
            <Drawer open={props.open} onClose={props.onClose}>
                <Drawer.Header>
                    <b style={{fontSize: "18pt"}}>{`${clientInfo.Surname}  ${clientInfo.Name}  ${clientInfo.Patronymic}`}</b>
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
                                        <Form.Group controlId="Surname">
                                            <Form.ControlLabel>Фамилия</Form.ControlLabel>
                                            <Form.Control name="Surname" style={colStyle} checkAsync/>
                                        </Form.Group>
                                    </Col>
                                    <Col style={colStyle}>
                                        <Form.Group controlId="Name">
                                            <Form.ControlLabel>Имя</Form.ControlLabel>
                                            <Form.Control name="Name" style={colStyle}/>
                                        </Form.Group>
                                    </Col>
                                    <Col style={colStyle}>
                                        <Form.Group controlId="Patronymic">
                                            <Form.ControlLabel>Отчество</Form.ControlLabel>
                                            <Form.Control name="Patronymic" style={colStyle}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{paddingTop: "2%"}}>
                                    <Col style={colStyle}>
                                        <Form.Group controlId="BirtDate">
                                            <Form.ControlLabel>ДатаРождения</Form.ControlLabel>
                                            <Form.Control name="BirtDate" accepter={DatePicker} style={colStyle}/>
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
        setFormValue(GetFormValue(clientInfo));

        formRef.current!.cleanErrors();

        setShowInfo(true);
        setEditInfo(false);
    }

    function OnSubmitForm()
    {
        if(!formRef.current!.check()) {
            return;
        }

        setShowInfo(true);
        setEditInfo(false);
    }
}


function GetFormValue(client: Client): FormValues {
    return new class {
        Id = client.Id;
        Surname = client.Surname;
        Name = client.Name;
        Patronymic = client.Patronymic;
        BirtDate = client.BirthDate;
    }() as FormValues;
}

export default ClientInfoModal;