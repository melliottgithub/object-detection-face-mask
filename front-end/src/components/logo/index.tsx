import styled from "styled-components";
import {ReactElement} from "react";
import {Link} from "react-router-dom";
import Config from "../../../config.ts";

import LogoIcon from "../../assets/icons/logo.svg";

const LogoWrapper = styled.div`
    display: flex;
    justify-items: center;
`

const StyledLogoIcon = styled.img`
    width: 2rem;
    height: 2rem;
    margin-right: 15px;
`

const Logo = (): ReactElement => {
    return (
        <Link to={Config.LINKS.HOME}>
            <LogoWrapper>
                <StyledLogoIcon src={LogoIcon} />
                <span>Computer Vision</span>
            </LogoWrapper>
        </Link>
    )
}

export default Logo;