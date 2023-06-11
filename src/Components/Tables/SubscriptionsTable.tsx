import {Table} from "rsuite";
import Client from "../../Models/Client";
import React from "react";
import {Subscription} from "../../Models/Subscription";

const {Column, HeaderCell, Cell} = Table;

interface Props {
    subscriptions: Subscription[];
    onRowClick: (clientId: string) => void;
    width: number;
}

const clientsTableStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "4px",
    border: "6px solid #1a1d24",
    cursor: "pointer",
    marginTop: "10px"
};

const numberOfVisibleColumns = 4;

export function SubscriptionsTable(props: Props)
{
    const columnWidth = (props.width) / 3;

    return (
        <Table
            data={props.subscriptions}
            width={props.width}
            autoHeight={true}
            style={clientsTableStyle}
            onRowClick = {(x) => props.onRowClick(x.id)/*OnRowCLick((x as Client))*/}>
            <Column width={0}>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id"/>
            </Column>
            <Column width={columnWidth}>
                <HeaderCell>Название</HeaderCell>
                <Cell dataKey="name"/>
            </Column>
            <Column width={columnWidth}>
                <HeaderCell>Цена</HeaderCell>
                <Cell dataKey="price">{(rowData) => `${(rowData as Subscription).price} р.`}</Cell>
            </Column>
            <Column width={columnWidth}>
                <HeaderCell>Описание</HeaderCell>
                <Cell dataKey="description"/>
            </Column>

        </Table>
    )
}

function OnRowCLick(rowData: Client) {
    console.log(rowData)
}