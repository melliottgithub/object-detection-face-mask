import {ReactElement, useState} from "react";
import {Accept, useDropzone} from "react-dropzone";
import Config from "../../../config.ts";
import styled from "styled-components";
import ErrorMessage from "../error-message";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

interface Props {
    onDrop: <T extends File>(files: T[]) => void
}

const AcceptedFormats: Accept = Config.PHOTO.FORMATS.reduce<Accept>((acceptedMap, current): Accept => {
    return { ...acceptedMap, [current]: [] }
}, {})

const StyledTitle = styled.h2<{ $active?: boolean }>`
    font-weight: bold;
    color: ${props => props.$active ? props.theme.colors.foreground : props.theme.colors.foregroundDark};
    transition: ${props => props.theme.transition};
`;

const StyledDescription = styled.p`
    font-weight: normal;
    margin-top: 5px;
    color: ${props => props.theme.colors.foregroundDark}
`;

const StyledUploadIcon = styled(ArrowUpTrayIcon)`
    width: 3rem;
    height: 3rem;
    color: ${props => props.theme.colors.foregroundDark};
    margin: 0 auto 15px auto;
    transition: ${props => props.theme.transition};
`;

const StyledContentWrapper = styled.div`
    text-align: center;
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 40px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const StyledDrop = styled.form`
    border: 2px dashed ${props => props.theme.colors.baseLight};
    position: relative;
    width: 100%;
    cursor: pointer;
    border-radius: 20px;
    height: 350px;
    user-select: none;
    transition: ${props => props.theme.transition};
    
    
    &:hover,
    &:hover svg,
    &.drag-active,
    &.drag-active svg {
        border-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
    }
    
    &:hover h2,
    &.drag-active h2 {
        color: ${props => props.theme.colors.foreground};
    }
`;

const DropPhotos = ({ onDrop }: Props): ReactElement => {
    const [error, setError] = useState<string | undefined>();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: AcceptedFormats,
        onDropRejected: () => setError("Invalid selected files."),
        onDropAccepted: () => setError(undefined),
    });

    return (
        <>
            <StyledDrop
                {...getRootProps()}
                className={isDragActive ? "drag-active" : undefined}
            >
                <input {...getInputProps()} className="h-full" />
                <StyledContentWrapper>
                    <StyledUploadIcon />
                    <StyledTitle>
                        Drop or select your images here
                    </StyledTitle>
                    <StyledDescription>
                        Accepted Files: {Config.PHOTO.FORMATS.join(", ")}
                    </StyledDescription>
                </StyledContentWrapper>
            </StyledDrop>
            {error && <ErrorMessage message={error} />}
        </>
    );
}

export default DropPhotos;