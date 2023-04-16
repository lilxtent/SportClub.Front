import {Table} from "rsuite";
import Visit from "../../Models/Visit";

const {Column, HeaderCell, Cell} = Table;

interface Props {
    visits: Visit[]
}

function VisitsTable(props: Props) {
    const data = props.visits.map(x => new class {
        VisitorName = x.VisitorName;
        Date = x.Date.toDateString();
    }())

    return (
        <Table data={data} width={380}>
            <Column width={250}>
                <HeaderCell>Имя</HeaderCell>
                <Cell dataKey="VisitorName"/>
            </Column>
            <Column fixed="right" width={130}>
                <HeaderCell>Дата</HeaderCell>
                <Cell dataKey="Date"/>
            </Column>
        </Table>
    );
}

export default VisitsTable;