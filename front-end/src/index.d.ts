import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string;
            primaryDark: string;
            primaryLight: string;
            base: string;
            baseLight: string;
            foreground: string;
            foregroundDark: string;
            error: string;
            errorDark: string;
        },
        textSizes: {
            regular: string;
            small: string;
            title: string;
            xsmall: string;
        },
        shadows: {
            base: string,
            hover: string
        },
        font: string;
        transition: string;
    }
}