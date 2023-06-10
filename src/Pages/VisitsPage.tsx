import {Container, Content, Header, Pagination} from "rsuite";
import VisitsTable from "../Components/Tables/VisitsTable";
import React from "react";
import Visit from "../Models/Visit";
import Client from "../Models/Client";
import {VisitsService} from "../Services/VisitsService";

interface Props {
    clients: Client[];
    onRowClick: (clientId: string) => void;
    width: number;
}

const tableWidth = 1000;
const rowsInTable = 15;

const containerStyles = {
    width: tableWidth + "px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "5%"
}

function VisitsPage() {
    const [totalVisitsCount, setTotalVisitsCount] = React.useState(0);
    const [activePage, setActivePage] = React.useState(1);
    const [visits, setVisits] = React.useState<Visit[]>([]);


    React.useEffect(() => {
        (async () => UseEffect())()
    }, [activePage]);

    return (
        <Container style={containerStyles}>
            <Header>
            </Header>
            <Content>

                <VisitsTable visits={visits}/>

                <Pagination
                    style={{
                        marginTop: "10px",
                        textAlign: "center",
                        display: "inline-block",
                        width: tableWidth + "px"
                    }}
                    size="md"
                    prev
                    next
                    maxButtons={20}
                    total={totalVisitsCount}
                    limit={rowsInTable}
                    activePage={activePage}
                    onChangePage={setActivePage}
                />
            </Content>
        </Container>
    )

    async function UseEffect() {
        const result = await VisitsService.GetVisits(rowsInTable * (activePage - 1), rowsInTable);

        setTotalVisitsCount(result.totalVisitsCount);
        setVisits(result.visits);
    }

}

export default VisitsPage;