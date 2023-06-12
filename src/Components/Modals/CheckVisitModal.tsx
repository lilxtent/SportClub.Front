import React from "react";
import {Html5QrcodeScanner, Html5QrcodeScanType} from "html5-qrcode";
import {Container, Modal} from "rsuite";

interface Props {
    isOpen: boolean,
    onClose: () => void,
}

export function CheckVisitModal(props: Props) {
    React.useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                qrbox: {
                    width: 250,
                    height: 250
                },
                rememberLastUsedCamera: true,
                fps: 20,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
            },
            false);

        scanner.render((x, y) => {
        }, (x) => {
        });
    })

    const [isModalOpen, setIsModalOpen] = React.useState(props.isOpen);

    return (
        <Modal open={isModalOpen} onClose={() => {setIsModalOpen(false); props.onClose()}}>
            <Modal.Header>
                <Modal.Title>Отметить посещение</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container id="reader"></Container>
            </Modal.Body>
        </Modal>
    )
}