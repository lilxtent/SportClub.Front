import {Container, Content, Input, InputGroup, Pagination} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Client from "../Models/Client";
import ClientsTable from "../Components/Tables/ClientsTable";
import React from "react";
import ClientInfoDrawer from "../Components/Drawers/ClientInfoDrawer";
import ClientsService from "../Services/ClientsService";
import {SearchClientsRequest} from "../Services/Requests/SearchClientsRequest";

const tableWidth = 1000;
const rowsInTable = 15;

const containerStyles = {
    width: tableWidth + "px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "5%"
}


function ClientsPage() {

    const [activePage, setActivePage] = React.useState(1);
    const [totalClientsCount, setTotalClientsCount] = React.useState(0);
    const [clients, setClients] = React.useState<Client[]>([]);
    const [clientToShowInfoAbout, setClientToShowInfoAbout] = React.useState<Client>();
    const [showClientModalPage, setShowClientModalPage] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");


    React.useEffect(() => {(async () => UseEffect())()}, [activePage]);




    return (
        <div>
            <Container style={containerStyles}>
                <Content>
                    <InputGroup>
                        <Input type="text"
                               onChange={(x, event) => OnSearchInput(x)}
                        />
                        <InputGroup.Button onClick={(x) => OnSearchButtonClick()}>
                            <SearchIcon/>
                        </InputGroup.Button>
                    </InputGroup>
                    <div style={{marginTop: "10px"}}>
                        <ClientsTable
                            clients={clients}
                            onRowClick={async (clientId) => {
                                const clientInfo = await ClientsService.GetClient(clientId);
                                setClientToShowInfoAbout(clientInfo)
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
                        maxButtons={20}
                        total={totalClientsCount}
                        limit={15}
                        activePage={activePage}
                        onChangePage={setActivePage}
                    />
                </Content>
            </Container>
            {showClientModalPage
                ? <ClientInfoDrawer
                    client={clientToShowInfoAbout!}
                    open={showClientModalPage}
                    onClose={async () => {await UseEffect(); setShowClientModalPage(false);}}/>
                : <div/>}
        </div>
    )

    async function UseEffect()
    {
        if (searchValue === "") {

            const result = await ClientsService.GetClients(rowsInTable * (activePage - 1), rowsInTable);

            setTotalClientsCount(result.totalCount);
            setClients(result.clients);
        }
    }

    async function OnSearchButtonClick()
    {
        if (searchValue === "") {
            await UseEffect();

            return;
        }

        const searchResult = await ClientsService.SearchClients(new SearchClientsRequest(searchValue))

        setClients(searchResult.clients);
        setTotalClientsCount(searchResult.totalCount);
        setActivePage(1);
    }

    async function OnSearchInput(input: string)
    {
        setSearchValue(input);
    }
}

export default ClientsPage;