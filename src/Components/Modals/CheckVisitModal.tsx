import React from "react";
import {Html5QrcodeResult, Html5QrcodeScanner, Html5QrcodeScanType} from "html5-qrcode";
import {Button, ButtonToolbar, Col, Container, Content, FlexboxGrid, Form, Modal, Row} from "rsuite";
import Client from "../../Models/Client";
import client from "../../Models/Client";
import ClientsService from "../../Services/ClientsService";
import {VisitsService} from "../../Services/VisitsService";

interface Props {
    isOpen: boolean,
    onClose: () => void,
}

interface ClientFormValue {
    surname: string;
    name: string;
    patronymic: string;
}

const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const colStyle = {
    width: "160px"
}

export function CheckVisitModal(props: Props) {

    const [scannedClientId, setScannedClientId] = React.useState<string | null>()
    const [isModalOpen, setIsModalOpen] = React.useState(props.isOpen);
    const [clientInfoToShow, setClientInfoToShow] = React.useState<Client | null>()
    const [clientForm, setClientForm] = React.useState<ClientFormValue | null>(null)
    const [scanner, setScanner] = React.useState<Html5QrcodeScanner>()

    React.useEffect(() => {
        (async () => UseEffect())()
    }, [scannedClientId]);


    return (
        <Modal open={isModalOpen} onClose={() => {
            setIsModalOpen(false);
            props.onClose();
        }}>

            <Modal.Header>
                <Modal.Title>Отметить посещение</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <FlexboxGrid justify="center">

                    <FlexboxGrid.Item>
                        <Container style={{width: "300px", height: "300px", margin: "auto"}} id="reader"></Container>
                    </FlexboxGrid.Item>

                    {clientForm !== undefined && clientForm !== null
                        ? <FlexboxGrid.Item>

                            <Form
                                style={{paddingTop: "2%"}}
                                plaintext={true}
                                formValue={clientForm!}
                            >

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

                                <ButtonToolbar style={{paddingTop: "2%", float: "right"}}>
                                    <Button
                                        appearance="primary"
                                        onClick={async () => await AddVisit()}>
                                        Отметить
                                    </Button>
                                    <Button
                                        appearance="primary"
                                        onClick={async () => {
                                            await AddVisit();
                                            setIsModalOpen(false);
                                            props.onClose();
                                        }}>
                                        Отметить и закрыть
                                    </Button>
                                </ButtonToolbar>
                            </Form>

                        </FlexboxGrid.Item>
                        : <div/>}

                </FlexboxGrid>

            </Modal.Body>
        </Modal>
    )

    async function UseEffect() {
        ActivateScanner();

        if (scannedClientId !== null && scannedClientId !== undefined) {
            const scannedClient = await ClientsService.GetClient(scannedClientId!);

            setClientForm(GetClientFormValue(scannedClient));
            setClientInfoToShow(scannedClient);
        }
    }

    function ActivateScanner() {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                qrbox: {
                    width: 100,
                    height: 100
                },
                rememberLastUsedCamera: true,
                fps: 20,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
            },
            false);

        setScanner(scanner);

        scanner.render(OnSuccessScan, (x) => {
        });
    }

    function OnSuccessScan(stringValue: string, result: Html5QrcodeResult) {
        console.log(stringValue);
        if (!uuidRegexExp.test(stringValue)) {
            return;
        }

        scanner?.pause();
        setScannedClientId(stringValue);
    }

    async function AddVisit(): Promise<void> {
        await VisitsService.AddVisits(clientInfoToShow!.id);

        setScannedClientId(null);
        setClientForm(null);
        setClientInfoToShow(null);
    }

    function GetClientFormValue(client: Client | null): ClientFormValue | null {

        if (client === null) {
            return null;
        }

        return new class {
            surname = client!.surname;
            name = client!.name;
            patronymic = client!.patronymic;
        }() as ClientFormValue;
    }
}