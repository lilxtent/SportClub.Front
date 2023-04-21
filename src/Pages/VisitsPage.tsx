import {Container, Content, Header} from "rsuite";
import VisitsTable from "../Components/Tables/VisitsTable";
import React from "react";
import Visit from "../Models/Visit";

const visitsLocal: Visit[] = [
    new Visit("Ходкевич","Александр", "Игоревич", new Date()),
    new Visit("Тохман","Никита", "Бибович", new Date()),
    new Visit("Давыдков","Никита", "Пуджевич", new Date()),
]

const visitTableStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "4px",
    border: "6px solid #1a1d24",
};

function VisitsPage() {
    return (
        <Container>
            <Header>
                <h2>Визиты клиентов</h2>
            </Header>
            <Content style={visitTableStyle}>
                <VisitsTable visits={visitsLocal}/>
            </Content>
        </Container>
    )
}

export default VisitsPage;