import {Subscription} from "../../Models/Subscription";
import {Button, Modal, SelectPicker} from "rsuite";
import React from "react";

interface Props {
    lastSubscription: Subscription | null,
    availableSubscriptions: Subscription[],
    onProlongButtonClick: (chosenSubscriptionId: string) => void,
    onCancelButtonClick: () => void
}

export function ProlongSubscriptionModal(props: Props) {
    const [isOpen, setIsOpen] = React.useState(true);
    const [selectedSubscriptionId, setSelectedSubscriptionId] = React.useState(props.lastSubscription?.id ?? null);

    return (
        <Modal open={isOpen}>

            <Modal.Header>
                <Modal.Title>Выбор абонемента для продления</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <SelectPicker
                    defaultValue={props.lastSubscription?.id}
                    style={{width: "100%"}}
                    onSelect={(value, item, event) => setSelectedSubscriptionId(value)}
                    data={props.availableSubscriptions.map(x => ({label: x.name, value: x.id}))}/>
            </Modal.Body>

            <Modal.Footer>

                <Button
                    onClick={() => {
                        props.onProlongButtonClick(selectedSubscriptionId!);
                        setIsOpen(false);
                    }}
                    appearance="primary"
                >
                    Продлить
                </Button>

                <Button onClick={() => {
                    props.onCancelButtonClick();
                    setIsOpen(false);
                }}>
                    Отмена
                </Button>

            </Modal.Footer>
        </Modal>
    )
}