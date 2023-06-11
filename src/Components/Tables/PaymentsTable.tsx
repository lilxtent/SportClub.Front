import {Table} from "rsuite";
import Visit from "../../Models/Visit";
import React from "react";
import {PaymentFullInfo} from "../../Models/PaymentFullInfo";

const {Column, HeaderCell, Cell} = Table;

interface Props {
    payments: PaymentFullInfo[],
    width: number;
}

const visitTableStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "4px",
    border: "6px solid #1a1d24",
    marginTop: "10px"
};

export function PaymentsTable(props: Props) {
    const columnWidth = (props.width) / 4;


    return (
        <Table
            data={props.payments}
            width={props.width}
            autoHeight={true}
            style={visitTableStyle}>

            <Column width={columnWidth}>
                <HeaderCell>ФИО</HeaderCell>
                <Cell>{rowData => `${(rowData as PaymentFullInfo).client.surname} ${(rowData as PaymentFullInfo).client.name} ${(rowData as PaymentFullInfo).client.patronymic}` }</Cell>
            </Column>

            <Column width={columnWidth}>
                <HeaderCell>Подписка</HeaderCell>
                <Cell>{rowData => (rowData as PaymentFullInfo).subscription.name}</Cell>
            </Column>

            <Column width={columnWidth}>
                <HeaderCell>Дата</HeaderCell>
                <Cell>{rowData => new Date((rowData as PaymentFullInfo).paymentDate).toLocaleString()}</Cell>
            </Column>

            <Column width={columnWidth}>
                <HeaderCell>Сумма</HeaderCell>
                <Cell>{rowData => (rowData as PaymentFullInfo).paymentAmount}</Cell>
            </Column>

        </Table>
    );
}