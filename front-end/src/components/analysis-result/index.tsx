import {PhotoAnalysisResult} from "../../service/photo-repo.ts";
import {ReactElement} from "react";
import styled from "styled-components";
import {getColor} from "../../utils.tsx";

interface Props {
    results: PhotoAnalysisResult[]
}

const StyledSquare = styled.div<{ color? : string }>`
    width: 20px;
    height: 20px;
    background: ${props => props.color ?? props.theme.colors.primary};
    border-radius: 5px;
    margin-right: 10px;
`;

const StyledClassificationWrapper = styled.div`
    display: flex;
    align-items: center;
`

const StyledClassification = styled.code`
    font-family: monospace;
    padding: 5px 12px;
    font-weight: bold;
    border-radius: 20px;
    font-size: 14px;
    background: ${props => props.theme.colors.baseLight};
    color: ${props => props.theme.colors.foreground};
    box-shadow: ${props => props.theme.shadows.base};
`

const StyledResultWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    transition: ${props => props.theme.transition};
    cursor: pointer;
    margin-bottom: 20px;
    
    &:hover {
        opacity: 0.5;
    }
`

const StyledConfidence = styled.span`
    font-weight: 500;
    color: ${props => props.theme.colors.foreground}
`

const StyledLabel = styled.span`
    color: ${props => props.theme.colors.foregroundDark};
    margin-right: 10px;
`

const StyledImageResults = styled.div`
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const AnalysisResult = (props: Props): ReactElement => {
    const results =  props.results.map((result, index) => {
        const confidence = (result.confidence / 100).toLocaleString(undefined,{ style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 });
        return (
            <StyledResultWrapper key={`${result.class}-${index}`}>
                <StyledClassificationWrapper>
                    <StyledSquare color={getColor(index)} />
                    <StyledClassification>
                        {result.class}:{index+1}
                    </StyledClassification>
                </StyledClassificationWrapper>
                <div>
                    <StyledLabel>Confidence:</StyledLabel>
                    <StyledConfidence>{confidence}</StyledConfidence>
                </div>
            </StyledResultWrapper>
        )
    });

    return (
        <StyledImageResults>
            {props.results.length > 0 ? results : (
                <StyledLabel>No detected objects.</StyledLabel>
            )}
        </StyledImageResults>
    )
}

export default AnalysisResult;