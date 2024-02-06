import styled from "styled-components";

export interface GridProps {
    className?: string;
    columns?: string | number;
    gap?: string;
    columnGap?: string;
    rowGap?: string;
    height?: number;
    minRowHeight?: number;
    flow?: string;
    rows?: string | number;
    areas?: string[],
    justifyContent?: string,
    alignContent?: string
}

const frGetter = (value: string | number) => typeof value === "number" ? `repeat(${value}, 1fr)` : value;
const gap = ({ gap = "8px" }) => gap;
const flow = ({ flow = "row" }) => flow;
const formatAreas = (areas: string[] ) => areas.map(area => `"${area}"`).join(" ");

const Grid = styled.div<GridProps>`
    display: grid;
    height: ${({ height = "auto" }) => height};
    grid-auto-flow: ${flow};
    grid-auto-rows: minmax(20px, auto);
    ${({ rows }) => rows && `grid-template-rows: ${frGetter(rows)}`};
    grid-template-columns: ${({ columns = 12 }) => frGetter(columns)};
    grid-gap: ${gap};
    ${({ columnGap }) => columnGap && `column-gap: ${columnGap}`};
    ${({ rowGap }) => rowGap && `row-gap: ${rowGap}`};
    ${({ areas }) => areas && `grid-template-areas: ${formatAreas(areas)}`};
    ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent}`};
    ${({ alignContent }) => alignContent && `align-content: ${alignContent}`};
`;

export default Grid;
