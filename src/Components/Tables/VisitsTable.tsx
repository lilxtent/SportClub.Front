import {Table} from "rsuite";
import Visit from "../../Models/Visit";

const {Column, HeaderCell, Cell} = Table;

interface Props {
    visits: Visit[]
}

function VisitsTable(props: Props) {
    const data = props.visits.map(x => new class {
        VisitorSurname = x.VisitorSurname;
        VisitorName = x.VisitorName;
        VisitorPatronymic = x.VisitorPatronymic;
        Date = x.Date.toLocaleDateString();
        Time = x.Date.toLocaleTimeString();
    }())

    return (
        <Table data={data} width={1010} autoHeight={true}>
            <Column width={250}>
                <HeaderCell>Фамилия</HeaderCell>
                <Cell dataKey="VisitorSurname"/>
            </Column>
            <Column width={250}>
                <HeaderCell>Имя</HeaderCell>
                <Cell dataKey="VisitorName"/>
            </Column>
            <Column width={250}>
                <HeaderCell>Отчество</HeaderCell>
                <Cell dataKey="VisitorPatronymic"/>
            </Column>
            <Column fixed="right" width={130}>
                <HeaderCell>Дата</HeaderCell>
                <Cell dataKey="Date"/>
            </Column>
            <Column fixed="right" width={130}>
                <HeaderCell>Время</HeaderCell>
                <Cell dataKey="Time"/>
            </Column>
        </Table>
    );
}

export default VisitsTable;