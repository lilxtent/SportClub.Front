import {
    Button,
    ButtonToolbar,
    Col,
    Container,
    Divider,
    Drawer,
    Form,
    Grid,
    Input,
    Row
} from "rsuite";
import React from "react";
import {SchemaModel, StringType, NumberType} from "schema-typed"
import {FormInstance} from "rsuite/esm/Form/Form";
import {SubscriptionsService} from "../../Services/SubscriptionsService";
import {Subscription} from "../../Models/Subscription";

interface Props {
    open: boolean,
    onClose: () => void,
    close: () => void
}

class FormValues {
    public name: string;
    public price: number;
    public daysLong: number;
    public description?: string | null;

    constructor() {
        this.name = "";
        this.price = 0;
        this.daysLong = 0;
        this.description = ""
    }
}

const model = SchemaModel({
    name: StringType().isRequired("Название должно быть указано."),
    price: NumberType().range(0, 500000).isRequired("Цена должна быть указана."),
    daysLong: NumberType().range(0, 365 * 10).isRequired("Продолжительность должна быт ьуказана.")
})

const colStyle = {
    width: "160px"
}

export function AddSubscriptionDrawer(props: Props) {
    const Textarea = React.forwardRef(
        (props, ref) => <Input {...props} rows={8} as="textarea" ref={ref as any}/>);

    const [formValue, setFormValue] = React.useState(new FormValues());
    const [isOpen, setIsOpen] = React.useState(props.open);
    const formRef = React.useRef<FormInstance>(null);

    return (
        <div>
            <Drawer open={isOpen} onClose={() => {
                props.onClose();
                setIsOpen(false);
            }}>

                <Drawer.Header>
                    <b style={{fontSize: "18pt"}}>{`Новый абонемент`}</b>
                </Drawer.Header>

                <Drawer.Body>

                    <Form
                        ref={formRef}
                        style={{paddingTop: "2%"}}
                        model={model}
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

        await SubscriptionsService.AddSubscription(new Subscription(
            crypto.randomUUID(),
            formValue.name,
            formValue.price,
            formValue.daysLong,
            formValue.description
        ))


        setIsOpen(false);
        props.close();
    }
}