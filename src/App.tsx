import React from 'react';
import {Container, Content, CustomProvider, Header, Nav, Sidebar, Sidenav} from "rsuite";
import {ruRU} from "rsuite/locales";

function App() {
    return (
        <CustomProvider locale={ruRU} theme={"dark"}>
            <Container>
                <Sidebar
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Sidenav appearance="default">
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item>First</Nav.Item>
                                <Nav.Item>Settings</Nav.Item>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                </Sidebar>

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
