import {ReactElement, ReactNode} from "react";
import styled from "styled-components";
import StyledButton from "../button";

interface Props {
    children: ReactNode;
    centered?: boolean;
    onSubmit: () => void;
}

const StyledWrapper = styled.div<{ centered?: boolean }>`
    display: flex;
    width: 100%;
    justify-content: ${props => props.centered ? "center" : "flex-end"};
    margin-top: 40px;
`

const SubmitButton = (props: Props): ReactElement => {
    return (
        <StyledWrapper centered={props.centered}>
            <StyledButton onClick={props.onSubmit} fullWidth={props.centered}>
                {props.children}
            </StyledButton>
        </StyledWrapper>
    )
};

export default SubmitButton;