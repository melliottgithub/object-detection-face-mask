import {ReactElement} from "react";
import styled from "styled-components";

interface Props {
    title: string;
    subtitle: string;
}

const StyledHeader = styled.header`
    margin-bottom: 60px;
`;

const StyledTitle = styled.h1`
    margin-bottom: 0;
    word-break: break-all;
    font-size: ${props => props.theme.textSizes.title};
    color: ${props => props.theme.colors.foreground};
    font-weight: bold;
`;

const StyledSubtitle = styled.h2`
    margin: 0;
    font-size: ${props => props.theme.textSizes.regular};
    color: ${props => props.theme.colors.foregroundDark};
    font-weight: normal;
`;

const Header = (props: Props): ReactElement => {
    return (
        <StyledHeader>
            <StyledTitle>
                {props.title}
            </StyledTitle>
            <StyledSubtitle>
                {props.subtitle}
            </StyledSubtitle>
        </StyledHeader>
    )
};

export default Header;