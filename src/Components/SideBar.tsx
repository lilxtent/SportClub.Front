import {Nav, Navbar, Sidebar, Sidenav,} from "rsuite";
import React from "react";
import HistoryIcon from '@rsuite/icons/History';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import PageIcon from '@rsuite/icons/Page';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import BarLineChartIcon from '@rsuite/icons/BarLineChart';

interface Props {
    expanded: boolean,
    reverseExpended: () => void,
}

function SideBar(props: Props) {

    return (
        <Sidebar
            style={{
                display: "flex",
                flexDirection: "column",
                position: "fixed",
            }}
            width={props.expanded ? 200 : 56}
            collapsible
        >
            <Sidenav expanded={props.expanded} appearance="default" style={{ height: window.innerHeight - 56}}>
                <Sidenav.Header style={{fontSize: 20, padding: 20}}>{props.expanded ? "Sports Club" : "SC"}</Sidenav.Header>

                <Sidenav.Body>

                    <Nav>
                        <Nav.Item href="/clients" icon={<PeoplesIcon/>}>Клиенты</Nav.Item>
                        <Nav.Item href="/subscriptions" icon={<PageIcon/>}>Абонементы</Nav.Item>
                        <Nav.Item href="/statistics" icon={<BarLineChartIcon/>}>Статистика</Nav.Item>
                        <Nav.Item href="/visits" icon={<HistoryIcon/>}>Визиты</Nav.Item>
                        <Nav.Item href="/payments" icon={<CreditCardPlusIcon/>}>Платежи</Nav.Item>
                    </Nav>

                </Sidenav.Body>

            </Sidenav>

            <Navbar appearance="default" className="nav-toggle" id="bottomCollapse">
                <Nav pullRight>
                    <Nav.Item
                        onClick={() => props.reverseExpended()}
                        style={{
                            width: 56,
                            textAlign: 'center'
                        }}>
                        {props.expanded ? <AngleLeftIcon/> : <AngleRightIcon/>}
                    </Nav.Item>
                </Nav>
            </Navbar>
        </Sidebar>
    )
}

export default SideBar;