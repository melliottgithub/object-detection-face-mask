import {ReactElement} from "react";
import styled from "styled-components";

interface Props {
    message: string;
}

const StyledErrorMessage = styled.p`
    font-weight: normal;
    font-size: ${props => props.theme.textSizes.small};
    color: ${props => props.theme.colors.error};
    margin: 15px 0 0 0;
`;

const ErrorMessage = (props: Props): ReactElement => {
    return (
        <StyledErrorMessage>
            {props.message}
        </StyledErrorMessage>
    )
}

export default ErrorMessage;