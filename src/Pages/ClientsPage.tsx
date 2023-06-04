import {Container, Content, Form, Header, Input, InputGroup, Modal, Pagination} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Client from "../Models/Client";
import ClientsTable from "../Components/Tables/ClientsTable";
import client from "../Models/Client";
import React from "react";
import ClientInfoModal from "../Components/Modals/ClientInfoModal";

const clientsMock: Client[] = [
    new Client(crypto.randomUUID(), "Ходкевич", "Александр", "Игоревич", new Date()),
    new Client(crypto.randomUUID(), "Тохман", "Никита", "Бибович", new Date()),
    new Client(crypto.randomUUID(), "Давыдков", "Никита", "Пуджевич", new Date()),
    new Client(crypto.randomUUID(), "Ходкевич", "Александр", "Игоревич", new Date()),
    new Client(crypto.randomUUID(), "Тохман", "Никита", "Бибович", new Date()),
    new Client(crypto.randomUUID(), "Давыдков", "Никита", "Пуджевич", new Date()),
    new Client(crypto.randomUUID(), "Ходкевич", "Александр", "Игоревич", new Date()),
    new Client(crypto.randomUUID(), "Тохман", "Никита", "Бибович", new Date()),
    new Client(crypto.randomUUID(), "Давыдков", "Никита", "Пуджевич", new Date()),
    new Client(crypto.randomUUID(), "Ходкевич", "Александр", "Игоревич", new Date()),
    new Client(crypto.randomUUID(), "Тохман", "Никита", "Бибович", new Date()),
    new Client(crypto.randomUUID(), "Давыдков", "Никита", "Пуджевич", new Date()),
    new Client(crypto.randomUUID(), "Ходкевич", "Александр", "Игоревич", new Date()),
    new Client(crypto.randomUUID(), "Тохман", "Никита", "Бибович", new Date()),
    new Client(crypto.randomUUID(), "Давыдков", "Никита", "Пуджевич", new Date()),
]

const tableWidth = 1000;

const containerStyles = {
    width: tableWidth + "px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "5%"
}

function ClientsPage() {
    let searchValue = "";

    const [activePage, setActivePage] = React.useState(1);
    const [clients, setClients] = React.useState(clientsMock);
    const [clientToShowInfoAbout, setClientToShowInfoAbout] = React.useState("");
    const [showClientModalPage, setShowClientModalPage] = React.useState(false);


    return (
        <div>
            <Container style={containerStyles}>
                <Content>
                    <InputGroup>
                        <Input type="text"
                               onChange={(x, event) => searchValue = x}
                        />
                        <InputGroup.Button onClick={(x) => {
                            //тут будут задаваться клиенты
                            setActivePage(1);
                            setClients(clientsMock);
                        }}>
                            <SearchIcon/>
                        </InputGroup.Button>
                    </InputGroup>
                    <div style={{marginTop: "10px"}}>
                        <ClientsTable
                            clients={clients}
                            onRowClick={(client) => {
                                setClientToShowInfoAbout(client.Id);
                                setShowClientModalPage(true);
                            }}
                            width={tableWidth}
                        />
                    </div>

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
                        total={200}
                        limit={20}
                        activePage={activePage}
                        onChangePage={setActivePage}
                    />
                </Content>
            </Container>
            <ClientInfoModal
                clientId={clientToShowInfoAbout}
                open={showClientModalPage}
                onClose={() => setShowClientModalPage(false)}/>
        </div>
    )
}

export default ClientsPage;