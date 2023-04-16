import React from 'react';
import {Container, Content, CustomProvider, Header} from "rsuite";
import {ruRU} from "rsuite/locales";
import SideBar from "./Components/SideBar";
import Visit from "./Models/Visit";
import VisitsTable from "./Components/Tables/VisitsTable";

const visitsLocal: Visit[] = [
    new Visit("Biba", new Date()),
    new Visit("Boba", new Date())
]

function App() {
    return (
        <CustomProvider locale={ruRU} theme={"dark"}>
            <Container>
                <SideBar/>

                <Container>
                    <Header>
                        <h2>Page Title</h2>
                    </Header>
                    <Content>
                        <VisitsTable visits={visitsLocal}/>
                    </Content>
                </Container>
            </Container>
        </CustomProvider>
    );
}

export default App;
