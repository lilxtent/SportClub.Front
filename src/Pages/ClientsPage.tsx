import {Button, Container, Content, FlexboxGrid, Input, InputGroup, Pagination} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Client from "../Models/Client";
import ClientsTable from "../Components/Tables/ClientsTable";
import React, {useEffect} from "react";
import ClientInfoDrawer from "../Components/Drawers/ClientInfoDrawer";
import ClientsService from "../Services/ClientsService";
import {SearchClientsRequest} from "../Services/Requests/SearchClientsRequest";
import {AddClientDrawer} from "../Components/Drawers/AddClientDrawer";

const tableWidth = 1000;
const rowsInTable = 15;

const containerStyles = {
    width: tableWidth + "px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "4%"
}


function ClientsPage() {

    const [activePage, setActivePage] = React.useState(1);
    const [totalClientsCount, setTotalClientsCount] = React.useState(0);
    const [clients, setClients] = React.useState<Client[]>([]);
    const [clientToShowInfoAbout, setClientToShowInfoAbout] = React.useState<Client>();
    const [showClientModalPage, setShowClientModalPage] = React.useState(false);
    const [addClientModalPage, setAddClientModalPage] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");


    React.useEffect(() => {
        (async () => UseEffect())()
    }, [activePage]);


    return (
        <div>
            <Container style={containerStyles}>
                <Content>

                    <FlexboxGrid>

                        <FlexboxGrid.Item style={{display: "flex", flex: 1}}>
                            <InputGroup>
                                <Input type="text"
                                       onChange={(x, event) => OnSearchInput(x)}
                                />
                                <InputGroup.Button onClick={(x) => OnSearchButtonClick()}>
                                    <SearchIcon/>
                                </InputGroup.Button>
                                <InputGroup.Addon>{`${totalClientsCount} клиента`}</InputGroup.Addon>
                            </InputGroup>
                        </FlexboxGrid.Item>

                        <FlexboxGrid.Item style={{marginLeft: "auto", paddingLeft: "1%"}}>
                            <Button appearance="primary" onClick={() => setAddClientModalPage(true)}>
                                Добавить
                            </Button>
                        </FlexboxGrid.Item>

                    </FlexboxGrid>

                    <ClientsTable
                        clients={clients}
                        onRowClick={async (clientId) => {
                            const clientInfo = await ClientsService.GetClient(clientId);
                            setClientToShowInfoAbout(clientInfo)
                            setShowClientModalPage(true);
                        }}
                        width={tableWidth}
                    />

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
                        total={totalClientsCount}
                        limit={rowsInTable}
                        activePage={activePage}
                        onChangePage={setActivePage}
                    />
                </Content>
            </Container>

            {addClientModalPage
                ? <AddClientDrawer
                    open={true}
                    close={async () => {
                        setAddClientModalPage(false);
                        await UseEffect();
                    }}
                    onClose={async () => {
                        await UseEffect();
                    }}/>
                : <div/>}

            {showClientModalPage
                ? <ClientInfoDrawer
                    client={clientToShowInfoAbout!}
                    open={true}
                    onClose={async () => {
                        await UseEffect();
                        setShowClientModalPage(false);
                    }}/>
                : <div/>}
        </div>
    )

    async function UseEffect() {
        if (searchValue === "") {
            const result = await ClientsService.GetClients(rowsInTable * (activePage - 1), rowsInTable);

            setTotalClientsCount(result.totalCount);
            setClients(result.clients);
        }
    }

    async function OnSearchButtonClick() {
        if (searchValue === "") {
            await UseEffect();

            return;
        }

        const searchResult = await ClientsService.SearchClients(new SearchClientsRequest(searchValue))

        setClients(searchResult.clients);
        setTotalClientsCount(searchResult.totalCount);
        setActivePage(1);
    }

    async function OnSearchInput(input: string) {
        setSearchValue(input);
    }
}

export default ClientsPage;