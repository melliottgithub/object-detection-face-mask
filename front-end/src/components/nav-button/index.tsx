import {NavLink, NavLinkProps} from "react-router-dom";
import StyledButton from "../button";
import {ReactNode} from "react";
import styled from "styled-components";

interface Props {
    to: string;
    children: ReactNode;
}

const StyledNavLink = styled(NavLink)<NavLinkProps>`    
    &.active {
        pointer-events: none;
        opacity: 0.35;
    }
`

const NavButton = (props: Props) => {
    return (
        <StyledNavLink to={props.to}>
            <StyledButton>
                {props.children}
            </StyledButton>
        </StyledNavLink>
    )
}

export default NavButton;