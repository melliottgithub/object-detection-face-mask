import {ReactElement} from "react";
import Logo from "../logo";
import styled from "styled-components";
import {Outlet} from "react-router-dom";
import Container from "../container";
import Config from "../../../config.ts";
import NavButton from "../nav-button";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import GlobalError from "../global-error";

const MainHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 0;
`

const MainContentWraper = styled.main`
    padding: 40px 0;
`

const Layout = (): ReactElement => {
    return (
        <Container>
            <MainHeader>
                <Logo />
                <NavButton to={Config.LINKS.UPLOAD}>
                    <ArrowUpTrayIcon />
                    <span>Upload</span>
                </NavButton>
            </MainHeader>
            <MainContentWraper>
                <Outlet />
            </MainContentWraper>
            <GlobalError />
        </Container>
    )
};

export default Layout;