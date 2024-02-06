import {ReactElement} from "react";
import styled from "styled-components";
import Cell from "../grid/cell.tsx";
import {XMarkIcon} from "@heroicons/react/24/outline";

interface Props {
    index: number;
    photo: { id: string; data: string };
    onFileDelete: (index: number) => void;
}

const StyledWrapper = styled.div`
    width: 100%;
    position: relative;
    user-select: none;
`

const StyledImage = styled.img`
    width: 100%;
    object-fit: cover;
    aspect-ratio: 1;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: ${props => props.theme.shadows.base};
`

const StyledDeleteButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background: ${props => props.theme.colors.errorDark};
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: ${props => props.theme.shadows.base};
    cursor: pointer;
    
    &:hover {
        background: ${props => props.theme.colors.error};
        box-shadow: ${props => props.theme.shadows.hover};
    }
`

const StyledDeleteIcon = styled(XMarkIcon)`
    color: ${props => props.theme.colors.foreground};
    width: 18px;
    height: 18px;
`

const UploadPreviewThumbnail = (props: Props): ReactElement => {
    return (
        <Cell width={4}>
            <StyledWrapper>
                <StyledImage src={props.photo.data} />
                <StyledDeleteButton
                    onClick={(): void => props.onFileDelete(props.index)}
                >
                    <StyledDeleteIcon />
                </StyledDeleteButton>
            </StyledWrapper>
        </Cell>
    )
}

export default UploadPreviewThumbnail;