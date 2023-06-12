import React, {useState} from 'react';
import {Container, Content, CustomProvider, Footer, Header, IconButton, Modal} from "rsuite";
import {ruRU} from "rsuite/locales";
import SideBar from "./Components/SideBar";
import {Route, Routes} from "react-router-dom";
import VisitsPage from "./Pages/VisitsPage";
import ClientsPage from "./Pages/ClientsPage";
import {SubscriptionsPage} from "./Pages/SubscriptionsPage";
import {PaymentsPage} from "./Pages/PaymentsPage";
import QrcodeIcon from '@rsuite/icons/Qrcode';
import {Html5QrcodeScanType, Html5QrcodeScanner} from "html5-qrcode";
import {CheckVisitModal} from "./Components/Modals/CheckVisitModal";

function App() {
    const [expanded, setExpanded] = useState(true);
    const [isVisitModalOpen, setIsVisitModalOpen] = React.useState(false);

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
                            <Route path="/clients" element={<ClientsPage/>}/>
                            <Route path="/subscriptions" element={<SubscriptionsPage/>}/>
                            <Route path="/payments" element={<PaymentsPage/>}/>
                        </Routes>

                    </Content>

                    <Footer style={{paddingBottom: "1%", width: "99.5%"}}>
                        <IconButton style={{float: "right"}}
                                    icon={<QrcodeIcon style={{
                                        height: "2em",
                                        width: "2em"
                                    }}
                                                      onClick={() => setIsVisitModalOpen(true)}/>}/>
                    </Footer>

                    {isVisitModalOpen ? <CheckVisitModal isOpen={isVisitModalOpen} onClose={() => setIsVisitModalOpen(false)}/> : <div/>}

                </Container>
            </Container>
        </CustomProvider>
    );
}

export default App;
