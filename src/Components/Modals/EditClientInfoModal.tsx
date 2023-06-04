import {Modal} from "rsuite";

interface Props {
    open: boolean;
    onClose: () => void;
    clientId: string;
}

function EditClientInfoModal(props: Props) {

    return (
        <Modal open={props.open} onClose={props.onClose}>

        </Modal>
    )
}

export default EditClientInfoModal;