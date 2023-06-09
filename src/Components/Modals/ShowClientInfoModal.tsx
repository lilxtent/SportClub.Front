import {Button, Modal} from "rsuite";
import Client from "../../Models/Client";

interface Props {
    open: boolean;
    onClose: () => void;
    onEditClick: () => void;
    clientId: string;
}

function ShowClientInfoModal(props: Props) {
    let clientInfo =     new Client(crypto.randomUUID(), "Ходкевич", "Александр", "Игоревич", new Date().toDateString());


        return (
        <Modal open={props.open} onClose={props.onClose}>

            <Button onClick={props.onEditClick}>Редактировать</Button>
        </Modal>
    )
}

export default ShowClientInfoModal;