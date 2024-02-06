import {ReactElement} from "react";
import {Link} from "react-router-dom";
import Config from "../../../config.ts";
import styled from "styled-components";
import {PhotoEntity} from "../../service/photo-repo.ts";

interface Props {
    photo: PhotoEntity;
}

interface BadgeProps {
    analyzed?: boolean;
}

const StyledWrapper = styled.div`
    position: relative;
    margin-bottom: 40px;
`;

const StyledLink = styled(Link)`
    transition: ${props => props.theme.transition};
    
    &:hover {
        opacity: 0.75;
    }
`

const StyledImage = styled.img`
    width: 100%;
    object-fit: cover;
    aspect-ratio: 1;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 15px;
    box-shadow: ${props => props.theme.shadows.base};
`

const StyledTitle = styled.p`
    color: ${props => props.theme.colors.foreground};
    font-weight: bold;
    font-size: 16px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    width: 100%;
`

const StyledContent = styled.div`
    padding: 5px 20px;
`

const StyledDescription = styled.p`
    font-size: 14px;
    color: ${props => props.theme.colors.foregroundDark};
    font-weight: 400;
`

const Badge = styled.div<BadgeProps>`
    padding: 5px 12px;
    font-weight: bold;
    position: absolute;
    top: 20px;
    left: 20px;
    border-radius: 20px;
    font-size: 14px;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.foreground};
    box-shadow: ${props => props.theme.shadows.base};
`

const PhotoPreview = (props: Props): ReactElement => {
    const imageUrl = Config.LINKS.IMAGE.replace(":imageId", props.photo.id);
    return (
        <StyledWrapper>
            <StyledLink to={imageUrl}>
                <Badge analyzed={!!props.photo.results}>
                    {props.photo.results ? `${props.photo.results.length} object(s)` : "Not analyzed"}
                </Badge>
                <StyledImage src={props.photo.data} />
                <StyledContent>
                    <StyledTitle>{props.photo.name}</StyledTitle>
                    <StyledDescription>Size: {props.photo.size / 100} KB. {props.photo.extension}</StyledDescription>
                </StyledContent>
            </StyledLink>
        </StyledWrapper>
    )
}

export default PhotoPreview;