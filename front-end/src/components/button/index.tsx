import styled from "styled-components";
import {ReactElement, ReactNode} from "react";

const StyledButton = styled.button<{ fullWidth?: boolean }>`
    display: inline-flex;
    border-radius: 0.75rem;
    padding: 15px 24px;
    align-items: center;
    line-height: 1;
    font-weight: bold;
    gap: 10px;
    box-shadow: ${props => props.theme.shadows.base};
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.foreground};
    font-size: ${props => props.theme.textSizes.xsmall};
    width: ${props => props.fullWidth ? "100%" : "auto"};
    justify-content: ${props => props.fullWidth ? "center" : "flex-start"};
    
    &:hover {
        background-color: ${props => props.theme.colors.primaryLight};
        color: ${props => props.theme.colors.foreground};
        box-shadow: ${props => props.theme.shadows.hover};
    }
`;

interface Props {
    children: ReactNode;
    fullWidth?: boolean;
    onClick?: () => void;
}

const Button = (props: Props): ReactElement => {
    return (
        <StyledButton
            onClick={props.onClick}
            fullWidth={props.fullWidth}
        >
            {props.children}
        </StyledButton>)
}

export default Button;