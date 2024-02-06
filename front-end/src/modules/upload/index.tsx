import {ReactElement, useState} from "react";
import DropPhoto from "../../components/drop-photo";
import Header from "../../components/header";
import {getImageDimensions, toBase64} from "../../utils.tsx";
import UploadPreview from "../../components/upload-preview";
import {useAppDispatch} from "../../redux/store";
import {addPhoto} from "../../redux/actions/photo.ts";
import LoadingWrapper from "../../components/loading-wrapper";
import {useSelector} from "react-redux";
import {State} from "../../redux/slices/state.ts";
import {RootState} from "../../redux/slices";
import SubmitButton from "../../components/submit-button";
import {ArrowUpTrayIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import Config from "../../../config.ts";

const AddPhotos = (): ReactElement => {
    const [files, setFiles] = useState<{ file: File; data: string }[]>([]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const photoStatus = useSelector<RootState, State>((state) => state.Photo.status);

    const onDrop = async (acceptedFiles: any[]) => {
        const newFiles = acceptedFiles.map(async (file) => ({
            file: file,
            data: await toBase64(new Blob([file])),
        }));

        await Promise.all(newFiles).then((files) => {
            setFiles((prevState) => {
                return prevState.concat(files);
            });
        });
    };

    const onFileDelete = (index: number) => {
        setFiles((prevState) => {
            const newState = Array.from(prevState);
            newState.splice(index, 1);
            return newState;
        });
    };

    const submit = (): void =>  {
        files.forEach(async (file) => {
            const dimensions = await getImageDimensions(file.data);

            await dispatch(addPhoto({
                data: file.data,
                name: file.file.name,
                extension: file.file.type,
                size: file.file.size,
                ...dimensions
            }));

            navigate(Config.LINKS.HOME);
        });
    }

    return (
        <LoadingWrapper loading={photoStatus === State.LOADING}>
            <Header
                title="Upload a photo"
                subtitle="Photos will be saved on your local storage and you may analyze them later."
            />
            <DropPhoto onDrop={onDrop} />
            <UploadPreview
                photos={files.map((f) => ({ data: f.data, id: f.file.name }))}
                onFileDelete={onFileDelete}
            />
            <SubmitButton onSubmit={submit}>
                <ArrowUpTrayIcon />
                <span>Upload</span>
            </SubmitButton>
        </LoadingWrapper>
    )
}

export default AddPhotos;