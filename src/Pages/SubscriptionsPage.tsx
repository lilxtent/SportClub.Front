import {Button, Container, Content, FlexboxGrid, Input, InputGroup, Pagination} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Client from "../Models/Client";
import React, {useEffect} from "react";
import ClientInfoDrawer from "../Components/Drawers/ClientInfoDrawer";
import ClientsService from "../Services/ClientsService";
import {SearchClientsRequest} from "../Services/Requests/SearchClientsRequest";
import {AddClientDrawer} from "../Components/Drawers/AddClientDrawer";
import {SubscriptionsTable} from "../Components/Tables/SubscriptionsTable";
import {Subscription} from "../Models/Subscription";
import {SubscriptionsService} from "../Services/SubscriptionsService";
import {SubscriptionInfoDrawer} from "../Components/Drawers/SubscriptionInfoDrawer";
import {AddSubscriptionDrawer} from "../Components/Drawers/AddSubscription";
import {SearchSubscriptionsRequest} from "../Services/Requests/SearchSubscriptionsRequest";

const tableWidth = 1000;
const rowsInTable = 15;

const containerStyles = {
    width: tableWidth + "px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "5%"
}


export function SubscriptionsPage() {

    const [activePage, setActivePage] = React.useState(1);
    const [totalSubscriptionsCount, setTotalSubscriptionsCount] = React.useState(0);
    const [subscriptions, setSubscriptions] = React.useState<Subscription[]>([]);
    const [subscriptionToShowInfoAbout, setSubscriptionToShowInfoAbout] = React.useState<Subscription>();
    const [showSubscriptionModalPage, setShowSubscriptionModalPage] = React.useState(false);
    const [showAddSubscriptionModalPage, setShowAddSubscriptionModalPage] = React.useState(false);
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
                            </InputGroup>
                        </FlexboxGrid.Item>

                        <FlexboxGrid.Item style={{marginLeft: "auto", paddingLeft: "1%"}}>
                            <Button appearance="primary" onClick={() => setShowAddSubscriptionModalPage(true)}>
                                Добавить
                            </Button>
                        </FlexboxGrid.Item>

                    </FlexboxGrid>

                    <SubscriptionsTable
                        subscriptions={subscriptions}
                        onRowClick={async (clientId) => {
                            const subscription = await SubscriptionsService.GetSubscription(clientId);
                            setSubscriptionToShowInfoAbout(subscription)
                            setShowSubscriptionModalPage(true);
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
                        total={totalSubscriptionsCount}
                        limit={rowsInTable}
                        activePage={activePage}
                        onChangePage={setActivePage}
                    />
                </Content>
            </Container>

            {showAddSubscriptionModalPage
                ? <AddSubscriptionDrawer
                    open={true}
                    close={async () => {
                        setShowAddSubscriptionModalPage(false);
                        await UseEffect();
                    }}
                    onClose={async () => {
                        await UseEffect();
                    }}/>
                : <div/>}

            {showSubscriptionModalPage
                ? <SubscriptionInfoDrawer
                    subscription={subscriptionToShowInfoAbout!}
                    open={true}
                    onClose={async () => {
                        await UseEffect();
                        setShowSubscriptionModalPage(false);
                    }}/>
                : <div/>}
        </div>
    )

    async function UseEffect() {
        if (searchValue === "") {
            const result = await SubscriptionsService.GetSubscriptions(rowsInTable * (activePage - 1), rowsInTable);

            setTotalSubscriptionsCount(result.totalCount);
            setSubscriptions(result.subscriptions);
        }
    }

    async function OnSearchButtonClick() {
        if (searchValue === "") {
            await UseEffect();

            return;
        }

        const searchResult = await SubscriptionsService.SearchSubscriptions(
            new SearchSubscriptionsRequest(searchValue))

        setSubscriptions(searchResult.subscriptions);
        setTotalSubscriptionsCount(searchResult.totalCount);
        setActivePage(1);
    }

    async function OnSearchInput(input: string) {
        setSearchValue(input);
    }
}