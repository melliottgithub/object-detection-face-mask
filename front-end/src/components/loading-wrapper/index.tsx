import {ReactNode} from "react";
import styled, {keyframes} from "styled-components";

import Loading from "../../assets/icons/loading.svg?react";

interface Props {
    loading?: boolean;
    children: ReactNode;
}

const SpinAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const StyledWrapper = styled.div`
    position: relative;
`

const StyledLoadingContent = styled.div`
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
`

const StyledLoadingIndicatorWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.primary};
    fill:  ${props => props.theme.colors.primary};
`

const StyledLoadingIcon = styled(Loading)`
    width: 50px;
    height: 50px;
    animation-name: ${SpinAnimation};
    animation-duration: 1s;
    animation-iteration-count: infinite;
`

const LoadingWrapper = (props: Props): ReactNode => {
    if (!props.loading) return props.children;
    else return (
        <StyledWrapper>
            <StyledLoadingContent>
                {props.children}
            </StyledLoadingContent>
            <StyledLoadingIndicatorWrapper>
                <StyledLoadingIcon />
            </StyledLoadingIndicatorWrapper>
        </StyledWrapper>
    );
}

export default LoadingWrapper;