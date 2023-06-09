import {Table} from "rsuite";
import Visit from "../../Models/Visit";
import React from "react";

const {Column, HeaderCell, Cell} = Table;

interface Props {
    visits: Visit[]
}

const visitTableStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "4px",
    border: "6px solid #1a1d24",
};

function VisitsTable(props: Props) {

    return (
        <Table
            data={props.visits}
            width={1010}
            autoHeight={true}
            style={visitTableStyle}>
            <Column width={250}>
                <HeaderCell>Фамилия</HeaderCell>
                <Cell>{rowData => (rowData as Visit).Client.surname}</Cell>
            </Column>
            <Column width={250}>
                <HeaderCell>Имя</HeaderCell>
                <Cell>{rowData => (rowData as Visit).Client.name}</Cell>
            </Column>
            <Column width={250}>
                <HeaderCell>Отчество</HeaderCell>
                <Cell>{rowData => (rowData as Visit).Client.patronymic}</Cell>
            </Column>
            <Column fixed="right" width={130}>
                <HeaderCell>Дата</HeaderCell>
                <Cell>{rowData => (rowData as Visit).Date.toLocaleDateString()}</Cell>
            </Column>
            <Column fixed="right" width={130}>
                <HeaderCell>Время</HeaderCell>
                <Cell>{rowData => (rowData as Visit).Date.toLocaleTimeString()}</Cell>
            </Column>
        </Table>
    );
}

export default VisitsTable;