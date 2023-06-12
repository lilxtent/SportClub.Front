import {Container, Content, Header, Pagination} from "rsuite";
import VisitsTable from "../Components/Tables/VisitsTable";
import React from "react";
import Visit from "../Models/Visit";
import Client from "../Models/Client";
import {VisitsService} from "../Services/VisitsService";
import {Bar, BarChart, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {
    PaymentsStatistic,
    StatisticsService,
    SubscriptionStatistic,
    VisitsStatistic
} from "../Services/StatisticsService";


const containerStyles = {
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "4%"
}

export function StatisticsPage() {

    const [lastVisits, setLastVisits] = React.useState<VisitsStatistic[]>([]);
    const [subscriptions, setSubscriptions] = React.useState<SubscriptionStatistic[]>([]);
    const [payments, setPayments] = React.useState<PaymentsStatistic[]>([]);

    React.useEffect(() => {
        (async () => UseEffect())()
    }, []);

    return (
        <Container style={containerStyles}>
            <Header>
            </Header>
            <Content>

                <Container>
                    <Header style={{fontSize: "20px", margin: "auto"}}><b>Визиты за последние 7 дней</b></Header>
                    <LineChart
                        style={{margin: "auto"}}
                        width={500}
                        height={300}
                        data={lastVisits.map(x => new class {
                            xLabel = `${x.day} число`;
                            day = x.day;
                            visitsCount = x.visitsCount;
                        })}
                    >
                        <XAxis dataKey="xLabel"></XAxis>
                        <YAxis/>
                        <Tooltip />
                        <Line type="monotone" dataKey="visitsCount"/>
                    </LineChart>
                </Container>

                <Container>
                    <Header style={{fontSize: "20px", margin: "auto"}}><b>Выручка за год</b></Header>
                    <LineChart
                        style={{margin: "auto"}}
                        width={500}
                        height={300}
                        data={payments}
                    >
                        <XAxis dataKey="month"></XAxis>
                        <YAxis/>
                        <Tooltip />
                        <Line type="monotone" dataKey="sumTotal"/>
                    </LineChart>
                </Container>


                <Container>
                    <Header style={{fontSize: "20px", margin: "auto"}}><b>Активные абонементы</b></Header>
                    <BarChart
                        style={{margin: "auto"}}
                        width={500}
                        height={300}
                        data={subscriptions}
                    >
                        <XAxis dataKey="subscriptionName"></XAxis>
                        <YAxis/>
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </Container>

            </Content>
        </Container>
    )

    async function UseEffect() {
        const visitsStat = await StatisticsService.GetVisits();

        setLastVisits(visitsStat);

        const subs = await StatisticsService.GetSubscriptions();

        setSubscriptions(subs);

        const paymentsStat = await StatisticsService.GetPayments();

        setPayments(paymentsStat);
    }
}