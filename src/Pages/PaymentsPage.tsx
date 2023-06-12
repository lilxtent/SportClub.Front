import {Container, Content, Header, Pagination} from "rsuite";
import VisitsTable from "../Components/Tables/VisitsTable";
import React from "react";
import Visit from "../Models/Visit";
import Client from "../Models/Client";
import {VisitsService} from "../Services/VisitsService";
import {PaymentsService} from "../Services/PaymentsService";
import {PaymentFullInfo} from "../Models/PaymentFullInfo";
import {PaymentsTable} from "../Components/Tables/PaymentsTable";

const tableWidth = 1000;
const rowsInTable = 15;

const containerStyles = {
    width: tableWidth + "px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "4%"
}

export function PaymentsPage() {
    const [totalPaymentsCount, setTotalPaymentsCount] = React.useState(0);
    const [activePage, setActivePage] = React.useState(1);
    const [payments, setPayments] = React.useState<PaymentFullInfo[]>([]);


    React.useEffect(() => {
        (async () => UseEffect())()
    }, [activePage]);

    return (
        <Container style={containerStyles}>
            <Header>
            </Header>
            <Content>

                <PaymentsTable payments={payments} width={tableWidth}/>

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
                    total={totalPaymentsCount}
                    limit={rowsInTable}
                    activePage={activePage}
                    onChangePage={setActivePage}
                />
            </Content>
        </Container>
    )

    async function UseEffect() {
        const result = await PaymentsService.GetLastPayments(rowsInTable * (activePage - 1), rowsInTable);

        setTotalPaymentsCount(result.totalCount);
        setPayments(result.paymentFullInfo);
    }
}