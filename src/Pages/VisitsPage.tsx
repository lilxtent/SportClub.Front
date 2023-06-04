import {Container, Content, Header} from "rsuite";
import VisitsTable from "../Components/Tables/VisitsTable";
import React from "react";
import Visit from "../Models/Visit";
import Client from "../Models/Client";

const visitsLocal: Visit[] = [
    new Visit(
        new Client(crypto.randomUUID(), "Ходкевич","Александр", "Игоревич", new Date()),
        new Date()),
    new Visit(
        new Client(crypto.randomUUID(),"Тохман","Никита", "Бибович", new Date()),
        new Date()),
    new Visit(
        new Client(crypto.randomUUID(),"Давыдков","Никита", "Пуджевич", new Date()),
        new Date()),
]

function VisitsPage() {
    return (
        <Container>
            <Header>
                <h2>Визиты клиентов</h2>
            </Header>
            <Content>
                <VisitsTable visits={visitsLocal}/>
            </Content>
        </Container>
    )
}

export default VisitsPage;