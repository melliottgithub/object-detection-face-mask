import {ReactElement, useEffect} from "react";
import Header from "../../components/header";
import {useParams} from "react-router-dom";
import {RootState} from "../../redux/slices";
import {selectById} from "../../redux/slices/photo.ts";
import {useSelector} from "react-redux";
import LoadingWrapper from "../../components/loading-wrapper";
import {State} from "../../redux/slices/state.ts";
import {analyzePhoto, fetchPhoto} from "../../redux/actions/photo.ts";
import {useAppDispatch} from "../../redux/store";
import Grid from "../../components/grid/grid.tsx";
import Cell from "../../components/grid/cell.tsx";
import styled from "styled-components";
import AnalysisResult from "../../components/analysis-result";
import SubmitButton from "../../components/submit-button";
import {EyeIcon} from "@heroicons/react/24/outline";
import ImageRects from "../../components/analysis-result/image-rects.tsx";

const StyledProperty = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 18px;
    color: ${props => props.theme.colors.foregroundDark};
`

const StyledValue = styled.span`
    font-weight: 500;
    color: ${props => props.theme.colors.foreground}
`

const PhotoResult = (): ReactElement => {
    const { imageId } = useParams<{ imageId: string }>();
    const dispatch = useAppDispatch();

    const status = useSelector((state: RootState) => state.Photo.status);
    const photo = useSelector((state: RootState) => {
        if (imageId) return selectById(state, imageId);
        else return undefined;
    });

    useEffect(() => {
        if (imageId) dispatch(fetchPhoto(imageId));
    }, [dispatch, imageId]);

    const title = photo ? `Photo: ${photo.name}` : "Photo"
    const subtitle = photo?.results ? `${photo.results.length} object(s) detected` : "Not analyzed yet."

    return (
        <LoadingWrapper loading={status === State.LOADING}>
            <Header title={title} subtitle={subtitle} />
            {photo ? (
                <Grid gap="40px">
                    <Cell width={8}>
                        <ImageRects photo={photo} />
                    </Cell>
                    <Cell width={4}>
                        <StyledProperty><span>File Size:</span><StyledValue>{photo.size / 100}KB</StyledValue></StyledProperty>
                        <StyledProperty><span>Dimensions:</span><StyledValue>{photo.width}px / {photo.height}px</StyledValue></StyledProperty>
                        <StyledProperty><span>Extension:</span><StyledValue>{photo.extension}</StyledValue></StyledProperty>
                        {photo.results ? (
                            <AnalysisResult results={photo.results} />
                        ) : undefined}
                        <SubmitButton
                            onSubmit={() => dispatch(analyzePhoto(photo))}
                            centered={true}
                        >
                            <EyeIcon />
                            <span>Analyze</span>
                        </SubmitButton>
                    </Cell>
                </Grid>
            ) : undefined}
        </LoadingWrapper>
    )
}

export default PhotoResult;