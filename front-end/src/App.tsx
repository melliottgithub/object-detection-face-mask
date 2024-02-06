import { ReactElement } from "react";
import GlobalStyles from "./assets/styles/global.ts";
import {ThemeProvider} from "styled-components";
import Theme from "./assets/styles/theme.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Config from "../config.ts";
import Layout from "./components/layout";
import PhotoGrid from "./modules/photo-grid";
import Upload from "./modules/upload";
import { Provider as ReduxProvider } from "react-redux";
import Store from "./redux/store";
import PhotoResult from "./modules/photo-result";

const DefaultRouter = createBrowserRouter([
    {
        path: Config.LINKS.HOME,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <PhotoGrid />
            },
            {
                path: Config.LINKS.UPLOAD,
                element: <Upload />
            },
            {
                path: Config.LINKS.IMAGE,
                element: <PhotoResult />
            }
        ]
    },
])

const App = (): ReactElement => {
    return (
        <ReduxProvider store={Store}>
            <ThemeProvider theme={Theme}>
                <GlobalStyles />
                <RouterProvider router={DefaultRouter} />
            </ThemeProvider>
        </ReduxProvider>
    )
}

export default App;