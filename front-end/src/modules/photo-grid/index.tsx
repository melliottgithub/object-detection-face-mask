import {ReactElement, useEffect} from "react";
import Header from "../../components/header";
import {useSelector} from "react-redux";
import {selectAll} from "../../redux/slices/photo.ts";
import {RootState} from "../../redux/slices";
import {State} from "../../redux/slices/state.ts";
import {fetchPhotos} from "../../redux/actions/photo.ts";
import {useAppDispatch} from "../../redux/store";
import LoadingWrapper from "../../components/loading-wrapper";
import Grid from "../../components/grid/grid.tsx";
import Cell from "../../components/grid/cell.tsx";
import PhotoPreview from "../../components/photo-preview";

const PhotoGrid = (): ReactElement => {
    const status = useSelector<RootState, State>((state) => state.Photo.status);
    const images = useSelector(selectAll);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    const imageComponents = images.map(i => {
        return (
            <Cell width={3} key={i.id}>
                <PhotoPreview photo={i} />
            </Cell>
        )
    })

    return (
        <>
            <Header
                title="Home"
                subtitle="Browse all photos"
            />
            <LoadingWrapper loading={status === State.LOADING}>
                <Grid rowGap="40px" columnGap="80px">
                    {imageComponents}
                </Grid>
            </LoadingWrapper>
        </>
    )
}

export default PhotoGrid;