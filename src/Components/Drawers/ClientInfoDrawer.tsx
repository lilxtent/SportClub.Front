import {
    Button,
    ButtonToolbar,
    Col,
    Container,
    DatePicker,
    Divider,
    Drawer,
    Form,
    Grid, Header, Message,
    Row
} from "rsuite";
import React from "react";
import {SchemaModel, StringType, DateType} from "schema-typed"
import Client from "../../Models/Client";
import {FormInstance} from "rsuite/esm/Form/Form";
import ClientsService from "../../Services/ClientsService";
import {PaymentFullInfo} from "../../Models/PaymentFullInfo";
import {PaymentsService} from "../../Services/PaymentsService";
import {ProlongSubscriptionModal} from "../Modals/ProlongSubscriptionModal";
import {SubscriptionsService} from "../../Services/SubscriptionsService";
import {Subscription} from "../../Models/Subscription";
import client from "../../Models/Client";
import {MinioService} from "../../Services/MinioService";
import {TakePictureModal} from "../Modals/TakePictureModal";

interface Props {
    open: boolean,
    onClose: () => void,
    client: Client,
    editInfo?: boolean
}

interface ClientInfoForm {
    id: string;
    surname: string;
    name: string;
    patronymic: string;
    birthDate: Date;
    phone: string
}

interface SubscriptionFormValue {
    name: string;
    startTime: Date;
    endTime: Date;
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
    const birthDateDatePicker = React.forwardRef((props, ref) => <DatePicker {...props} format="dd-MM-yyyy"
                                                                             ref={ref as any}/>);
    const startSubscriptionDatePicker = React.forwardRef((props, ref) => <DatePicker {...props}
                                                                                     format="dd-MM-yyyy hh:mm"
                                                                                     ref={ref as any}/>);
    const endSubscriptionDateDatePicker = React.forwardRef((props, ref) => <DatePicker {...props}
                                                                                       format="dd-MM-yyyy hh:mm"
                                                                                       ref={ref as any}/>);

    const [clientInfoFormValue, setClientInfoFormValue] = React.useState<ClientInfoForm>(GetClientInfoFormValue(props.client));
    const [clientSubscriptionFormValue, setSubscriptionFormValue] = React.useState<SubscriptionFormValue>();
    const formRef = React.useRef<FormInstance>(null);
    const [editInfo, setEditInfo] = React.useState(props.editInfo ?? false);
    const [lastPayment, setLastPayment] = React.useState<PaymentFullInfo | null>()
    const [isChooseSubscriptionToProlongModalOpen, setIsChooseSubscriptionToProlongModalOpen] = React.useState(false);
    const [availableSubscriptions, setAvailableSubscriptions] = React.useState<Subscription[]>([])
    const [clientImage, setClientImage] = React.useState<string | null>();
    const [showTakePictureModal, setShowTakePictureModal] = React.useState(false);

    React.useEffect(() => {
        (async () => UseEffect())()
    }, [showTakePictureModal]);

    return (
        <div>
            <Drawer open={props.open} onClose={props.onClose}>

                <Drawer.Header>
                    <b style={{fontSize: "18pt"}}>{`${props.client.surname}  ${props.client.name}  ${props.client.patronymic}`}</b>
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
                            ? <TakePictureModal clientId={props.client.id} onClose={() => setShowTakePictureModal(false)}/>
                            : <div/>}

                    </Container>

                    <Form
                        ref={formRef}
                        style={{paddingTop: "2%"}}
                        model={model}
                        plaintext={!editInfo}
                        formValue={clientInfoFormValue}
                        onChange={x => setClientInfoFormValue(x as ClientInfoForm)}
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
                                            <Form.Control name="birthDate" accepter={birthDateDatePicker}
                                                          style={colStyle}/>
                                        </Form.Group>
                                    </Col>

                                    <Col style={colStyle}>
                                        <Form.Group controlId="phone">
                                            <Form.ControlLabel>Номер телефона</Form.ControlLabel>
                                            <Form.Control name="phone" placeholder={phoneNumberIsNullMessage}
                                                          style={colStyle}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Grid>
                        </Container>

                        <Container style={{paddingTop: "1%"}}>
                            <Form.Group>
                                <ButtonToolbar style={{display: (editInfo ? "none" : "")}}>
                                    <Container>
                                        <Button onClick={() => {
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

                    <Divider>Абонемент</Divider>
                    <Form
                        style={{paddingTop: "2%"}}
                        plaintext={true}
                        formValue={clientSubscriptionFormValue}
                    >

                        <Container>
                            {lastPayment === undefined || lastPayment === null
                                ? <b style={{marginLeft: "auto", marginRight: "auto"}}>Отсутствует</b>
                                : <Grid fluid>

                                    <Row>

                                        <Col style={colStyle}>
                                            <Form.Group controlId="name">
                                                <Form.ControlLabel>Название</Form.ControlLabel>
                                                <Form.Control name="name" style={colStyle} checkAsync/>
                                            </Form.Group>
                                        </Col>

                                        <Col style={colStyle}>
                                            <Form.Group controlId="startTime">
                                                <Form.ControlLabel>Начало</Form.ControlLabel>
                                                <Form.Control name="startTime" accepter={startSubscriptionDatePicker}
                                                              style={colStyle}/>
                                            </Form.Group>
                                        </Col>

                                        <Col style={colStyle}>
                                            <Form.Group controlId="endTime">
                                                <Form.ControlLabel>Конец</Form.ControlLabel>
                                                <Form.Control name="endTime" accepter={endSubscriptionDateDatePicker}
                                                              style={colStyle}/>
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                </Grid>}

                        </Container>

                        <Container style={{paddingTop: "2%"}}>

                            {((lastPayment === null) || (lastPayment === undefined) || new Date(lastPayment!.subscriptionEndTime) < new Date())
                                ? <Button color="green" appearance="primary"
                                          onClick={() => setIsChooseSubscriptionToProlongModalOpen(true)}>Продлить</Button>
                                : <Button
                                    onClick={() => setIsChooseSubscriptionToProlongModalOpen(true)}>Продлить</Button>}

                            {isChooseSubscriptionToProlongModalOpen
                                ? <ProlongSubscriptionModal
                                    lastSubscription={lastPayment?.subscription ?? null}
                                    availableSubscriptions={availableSubscriptions}
                                    onProlongButtonClick={async (chosenSubscriptionId) => {
                                        await PaymentsService.AddPayment(props.client.id, chosenSubscriptionId);
                                        const result = await PaymentsService.GetClientLastPayment(props.client.id);

                                        setSubscriptionFormValue(GetSubscriptionFormValue(result!))
                                        setIsChooseSubscriptionToProlongModalOpen(false);
                                    }}
                                    onCancelButtonClick={() => setIsChooseSubscriptionToProlongModalOpen(false)}/>
                                : <div/>}

                        </Container>

                    </Form>

                </Drawer.Body>
            </Drawer>
        </div>
    )

    async function UseEffect(): Promise<void> {
        const lastPaymentInfo = await PaymentsService.GetClientLastPayment(props.client.id);
        const allSubscriptions = await SubscriptionsService.GetAllSubscriptions();


        setSubscriptionFormValue(GetSubscriptionFormValue(lastPaymentInfo));
        setLastPayment(lastPaymentInfo);
        setAvailableSubscriptions(allSubscriptions);


        const img = await MinioService.GetImageOrDefault(`${props.client.id}.jpg`);

        setClientImage(URL.createObjectURL(img));
    }

    function OnCancelEditButtonClick(): void {
        setClientInfoFormValue(GetClientInfoFormValue(props.client));

        formRef.current!.cleanErrors();

        setEditInfo(false);
    }

    async function OnSubmitForm() {
        if (!formRef.current!.check()) {
            return;
        }

        let phone: string | null = clientInfoFormValue.phone;

        if (phone.trim() === "" || phone === phoneNumberIsNullMessage) {
            phone = null;
        }

        await ClientsService.UpdateClient(new Client(
            clientInfoFormValue.id,
            clientInfoFormValue.surname,
            clientInfoFormValue.name,
            clientInfoFormValue.patronymic,
            clientInfoFormValue.birthDate.toISOString(),
            phone
        ));

        setEditInfo(false);
    }
}


function GetClientInfoFormValue(client: Client): ClientInfoForm {
    return new class {
        id = client.id;
        surname = client.surname;
        name = client.name;
        patronymic = client.patronymic;
        birthDate = new Date(client.birthDate);
        phone = client.phone ?? phoneNumberIsNullMessage
    }() as ClientInfoForm;
}

function GetSubscriptionFormValue(payment: PaymentFullInfo | null): SubscriptionFormValue {
    if (payment === null) {
        return new class {
            name = "";
            startTime = new Date();
            endTime = new Date();
        }() as SubscriptionFormValue;
    }

    return new class {
        name = payment!.subscription.name;
        startTime = new Date(payment!.subscriptionStartTime);
        endTime = new Date(payment!.subscriptionEndTime);
    }() as SubscriptionFormValue;
}

export default ClientInfoDrawer;