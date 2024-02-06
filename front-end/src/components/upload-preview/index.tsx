import {ReactElement} from "react";
import Grid from "../grid/grid.tsx";
import UploadPreviewThumbnail from "./thumbnail.tsx";
import styled from "styled-components";

interface Props {
    photos: { id: string; data: string }[];
    onFileDelete: (index: number) => void;
}

const StyledGrid = styled(Grid)`
    margin-top: 40px;
`;

const StyledEmptyWrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 80px 0 40px 0;
`

const StyledTitle = styled.h2`
    font-weight: bold;
    color: ${props => props.theme.colors.foregroundDark};
    transition: ${props => props.theme.transition};
`;

const StyledDescription = styled.p`
    font-weight: normal;
    margin-top: 5px;
    color: ${props => props.theme.colors.foregroundDark}
`;

const UploadPreview = (props: Props): ReactElement => {
    if (props.photos.length > 0) {
        const thumbnails = props.photos.map((photo, index): ReactElement => (
            <UploadPreviewThumbnail
                key={`${photo.id}-${index}`}
                photo={photo}
                index={index}
                onFileDelete={props.onFileDelete}
            />
        ));

        return (
            <StyledGrid
                columns={12}
                gap="40px"
            >
                {thumbnails}
            </StyledGrid>
        )
    } else return (
        <StyledEmptyWrapper>
            <StyledTitle>This is empty</StyledTitle>
            <StyledDescription>A preview of all images to upload will be shown here.</StyledDescription>
        </StyledEmptyWrapper>
    )
}

export default UploadPreview;