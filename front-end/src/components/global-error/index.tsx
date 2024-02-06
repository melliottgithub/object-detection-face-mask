import {ReactElement} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/slices";
import styled from "styled-components";

const StyledErrorWrapper = styled.div`
    position: fixed;
    bottom: 30px;
    right: 40px;
    border-radius: 20px;
    background: ${props => props.theme.colors.errorDark};
    padding: 15px 20px;
    font-weight: 500;
    color: ${props => props.theme.colors.foreground};
    box-shadow: ${props => props.theme.shadows.base};
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 350px;
    font-family: monospace;
`

const StyledLabel = styled.p`
    color: rgba(255, 255, 255, 0.75);
    font-weight: 400;
    font-size: 12px;
    margin-bottom: 5px;
    font-family: ${props => props.theme.font};
`

const GlobalError = (): ReactElement => {
    const error = useSelector((state: RootState) => state.Photo.error);
    if (error) return (
        <StyledErrorWrapper>
            <StyledLabel>Oops, an error has occurred:</StyledLabel>
            {error}
        </StyledErrorWrapper>
    );
    else return <></>
}

export default GlobalError;