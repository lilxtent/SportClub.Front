import {Nav, Sidebar, Sidenav} from "rsuite";
import React from "react";

function SideBar() {
    return (
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
    )
}

export default SideBar;