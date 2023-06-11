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
    Input,
    Modal,
    Row
} from "rsuite";
import React from "react";
import {SchemaModel, StringType, DateType, NumberType} from "schema-typed"
import Client from "../../Models/Client";
import {FormInstance} from "rsuite/esm/Form/Form";
import ClientsService from "../../Services/ClientsService";
import {Subscription} from "../../Models/Subscription";
import {SubscriptionsService} from "../../Services/SubscriptionsService";

interface Props {
    open: boolean,
    onClose: () => void,
    subscription: Subscription,
    editInfo?: boolean
}

interface FormValues {
    id: string,
    name: string,
    price: number,
    daysLong: number,
    description: string
}

const model = SchemaModel({
    name: StringType().isRequired("Название должно быть указано."),
    price: NumberType().range(0, 500000).isRequired("Цена должна быть указана."),
    daysLong: NumberType().range(0, 365 * 10).isRequired("Продолжительность должна быт ьуказана.")
})

const colStyle = {
    width: "160px"
}

const descriptionIsNullMessage = "не указан";

export function SubscriptionInfoDrawer(props: Props) {
    const Textarea = React.forwardRef(
        (props, ref) => <Input {...props} rows={8} as="textarea" ref={ref as React.RefObject<HTMLTextAreaElement>}/>);

    const [formValue, setFormValue] = React.useState<FormValues>(GetFormValue(props.subscription));
    const formRef = React.useRef<FormInstance>(null);
    const [editInfo, setEditInfo] = React.useState(props.editInfo ?? false);

    return (
        <div>
            <Drawer open={props.open} onClose={props.onClose}>

                <Drawer.Header>
                    <b style={{fontSize: "18pt"}}>{`${props.subscription.name} `}</b>
                </Drawer.Header>

                <Drawer.Body>

                    <Form
                        ref={formRef}
                        style={{paddingTop: "2%"}}
                        model={model}
                        plaintext={!editInfo}
                        formValue={formValue}
                        onChange={x => setFormValue(x as FormValues)}
                        onSubmit={OnSubmitForm}
                    >

                        <Divider>Информация</Divider>

                        <Container>
                            <Grid fluid>

                                <Row>

                                    <Col style={colStyle}>
                                        <Form.Group controlId="name">
                                            <Form.ControlLabel>Название</Form.ControlLabel>
                                            <Form.Control name="name" style={colStyle} checkAsync/>
                                        </Form.Group>
                                    </Col>

                                    <Col style={colStyle} xs={16}>
                                        <Form.Group controlId="price">
                                            <Form.ControlLabel>Цена (руб.)</Form.ControlLabel>
                                            <Form.Control name="price" style={colStyle}/>
                                        </Form.Group>
                                    </Col>

                                    <Col style={colStyle}>
                                        <Form.Group controlId="daysLong">
                                            <Form.ControlLabel>Продолжительность</Form.ControlLabel>
                                            <Form.Control name="daysLong" style={colStyle}/>
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group controlId="description" >
                                            <Form.ControlLabel>Описание</Form.ControlLabel>
                                            <Form.Control name="description" accepter={Textarea} style={{display: "flex", flex: 1}}/>
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

    function OnCancelEditButtonClick(): void {
        setFormValue(GetFormValue(props.subscription));

        formRef.current!.cleanErrors();

        setEditInfo(false);
    }

    async function OnSubmitForm() {
        if (!formRef.current!.check()) {
            return;
        }

        let description: string | null = formValue.description;

        if (description.trim() === "" || description === descriptionIsNullMessage) {
            description = null;
        }

        await SubscriptionsService.UpdateSubscription(new Subscription(
            formValue.id,
            formValue.name,
            formValue.price,
            formValue.daysLong,
            formValue.description
        ));

        setEditInfo(false);
    }
}


function GetFormValue(subscription: Subscription): FormValues {
    return new class {
        id = subscription.id;
        name = subscription.name;
        price = subscription.price;
        daysLong = subscription.daysLong;
        description = subscription.description ?? descriptionIsNullMessage;
    }() as FormValues;
}