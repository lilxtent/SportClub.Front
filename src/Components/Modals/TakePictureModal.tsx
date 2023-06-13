import {Button, ButtonToolbar, Container, Modal} from "rsuite";
import Webcam from "react-webcam";
import React from "react";
import {MinioService} from "../../Services/MinioService";

interface Props {
    onClose: () => void;
    clientId: string;
}

export function TakePictureModal(props: Props) {
    const webCamRef = React.useRef<Webcam>(null);
    const [isOpen, setIsOpen] = React.useState(true);
    const [imgSrc, setImgSrc] = React.useState<string | null>(null)

    const capture = React.useCallback(async () => {
        const imageSrc = webCamRef.current!.getScreenshot();
        setImgSrc(imageSrc);

    }, [webCamRef]);


    return (
        <Modal open={isOpen} onClose={() => {
            setIsOpen(false);
            props.onClose();
        }}>

            <Modal.Header>
                <Modal.Title>Сфотографировать клиента</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {imgSrc === null
                    ?
                    <Container >
                        <Webcam height={450} width={450} style={{margin: "auto"}} screenshotFormat="image/jpeg" ref={webCamRef}/>
                    </Container>
                    :
                    <Container style={{margin: "auto"}}>
                        <img src={imgSrc}  alt="webcam"/>
                    </Container>}


                {imgSrc === null
                    ?
                    <ButtonToolbar style={{paddingTop: "2%", float: "right"}}>
                        <Button appearance="primary" onClick={() => capture()}>Сфотографировать</Button>
                    </ButtonToolbar>
                    : <ButtonToolbar style={{paddingTop: "2%", float: "right"}}>
                        <Button appearance="primary" onClick={async () => {
                            await MinioService.AddImage(props.clientId, imgSrc);
                            setIsOpen(false);
                            props.onClose();
                        }}>Сохранить</Button>
                        <Button appearance="default" onClick={() => setImgSrc(null)}>Перефотографировать</Button>
                    </ButtonToolbar>}


            </Modal.Body>

        </Modal>
    )
}