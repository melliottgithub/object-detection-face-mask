import {ReactElement, useEffect, useRef, useState} from "react";
import {ImageDimensions, PhotoAnalysisResult, PhotoEntity} from "../../service/photo-repo.ts";
import styled from "styled-components";
import {getColor} from "../../utils.tsx";

interface Props {
    photo: PhotoEntity;
}

interface InternalRectPositionProps {
    top: number;
    left: number;
    width: number;
    height: number;
}

interface InternalRectProps extends InternalRectPositionProps {
    color: string;
}

const StyledImage = styled.img`
    width: 100%;
    border-radius: 20px;
    box-shadow: ${props => props.theme.shadows.base};
`

const StyledImageWrapper = styled.div`
    position: relative;
    width: 100%;
`

const StyledRect = styled.div<InternalRectProps>`
    position: absolute;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border: 3px solid ${props => props.color};
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`

const StyledBadge = styled.span<InternalRectProps>`
    position: absolute;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 2px 4px;
    color: ${props => props.theme.colors.foreground};
    background: ${props => props.color};
    top: ${props => props.top - 14}px;
    left: ${props => props.left}px;
    font-size: 10px;
    font-family: monospace;
`

const calculateRectPosition = (dimensions: ImageDimensions, result: PhotoAnalysisResult): InternalRectPositionProps => {
    const left = result.boundingBox[0] * dimensions.width;
    const top = result.boundingBox[1] * dimensions.height;
    const width = result.boundingBox[2] * dimensions.width;
    const height = result.boundingBox[3] * dimensions.height;

    return {
        top,
        left,
        width,
        height
    }
}

const ImageRects = (props: Props): ReactElement => {
    const [dimensions, setDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
    const imageRef = useRef<HTMLImageElement>();

    useEffect(() => {
        const onResize = (): void => {
            setDimensions({
                width: imageRef.current?.clientWidth ?? 0,
                height: imageRef.current?.clientHeight ?? 0,
            })
        };

        onResize();
        window.addEventListener("resize", () => onResize());
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const rects = props.photo.results?.map((result, index) => {
        if (result.boundingBox.length === 4) {
            const position = calculateRectPosition(dimensions, result);
            return (
                <div key={`${result.class}-${index}`}>
                    <StyledRect
                        {...position}
                        color={getColor(index)}
                    />
                    <StyledBadge
                        {...position}
                        color={getColor(index)}
                    >
                        {result.class}:{index + 1}
                    </StyledBadge>
                </div>
            )
        } else return undefined;
    });

    return (
        <StyledImageWrapper>
            <StyledImage
                src={props.photo.data}
                alt={props.photo.name}
                ref={(ref) => {
                    if(ref) imageRef.current = ref;
                }}
            />
            {rects}
        </StyledImageWrapper>
    )
}

export default ImageRects;