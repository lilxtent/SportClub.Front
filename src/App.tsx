import React, {useState} from 'react';
import {Container, Content, CustomProvider} from "rsuite";
import {ruRU} from "rsuite/locales";
import SideBar from "./Components/SideBar";
import {Route, Routes} from "react-router-dom";
import VisitsPage from "./Pages/VisitsPage";

function App() {
    const [expanded, setExpanded] = useState(true);

    return (
        <CustomProvider locale={ruRU} theme={"dark"}>
            <Container>
                <SideBar
                    expanded={expanded}
                    reverseExpended={() => setExpanded(!expanded)}/>
                <Container>
                    <Content style={{paddingLeft: 20}}>
                        <Routes>
                            <Route path="/visits" element={<VisitsPage/>}/>
                        </Routes>
                    </Content>
                </Container>
            </Container>
        </CustomProvider>
    );
}

export default App;
