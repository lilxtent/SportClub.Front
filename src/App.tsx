import React from 'react';
import {Container, Content, CustomProvider, Header} from "rsuite";
import {ruRU} from "rsuite/locales";
import SideBar from "./Components/SideBar";

function App() {
    return (
        <CustomProvider locale={ruRU} theme={"dark"}>
            <Container>
                <SideBar/>

                <Container>
                    <Header>
                        <h2>Page Title</h2>
                    </Header>
                    <Content>Content</Content>
                </Container>
            </Container>
        </CustomProvider>
    );
}

export default App;
