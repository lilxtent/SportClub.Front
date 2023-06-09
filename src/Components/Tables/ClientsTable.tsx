import {Table} from "rsuite";
import Client from "../../Models/Client";
import React from "react";

const {Column, HeaderCell, Cell} = Table;

interface Props {
    clients: Client[];
    onRowClick: (clientId: string) => void;
    width: number;
}

const clientsTableStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "4px",
    border: "6px solid #1a1d24",
    cursor: "pointer"
};

const numberOfVisibleColumns = 4;

function ClientsTable(props: Props)
{
    const columnWidth = (props.width) / numberOfVisibleColumns;

    return (
        <Table
            data={props.clients}
            width={props.width}
            autoHeight={true}
            style={clientsTableStyle}
            onRowClick = {(x) => props.onRowClick(x.id)/*OnRowCLick((x as Client))*/}>
            <Column width={0}>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id"/>
            </Column>
            <Column width={columnWidth}>
                <HeaderCell>Фамилия</HeaderCell>
                <Cell dataKey="surname"/>
            </Column>
            <Column width={columnWidth}>
                <HeaderCell>Имя</HeaderCell>
                <Cell dataKey="name"/>
            </Column>
            <Column width={columnWidth}>
                <HeaderCell>Отчество</HeaderCell>
                <Cell dataKey="patronymic"/>
            </Column>
            <Column width={columnWidth}>
                <HeaderCell>Дата рождения</HeaderCell>
                <Cell dataKey="birthDate">{rowData => new Date(rowData.birthDate).toLocaleDateString()}</Cell>
            </Column>
        </Table>
    )
}

function OnRowCLick(rowData: Client) {
    console.log(rowData)
}

export default ClientsTable;