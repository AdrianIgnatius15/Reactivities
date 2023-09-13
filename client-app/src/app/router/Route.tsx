import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/dashboard/details/ActivityDetails";
import TestErrors from "../features/errors/TestError";
import NotFound from "../features/errors/NotFound";
import ServerError from "../features/errors/ServerError";

export const Routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'activities',
                element: <ActivityDashboard />
            },
            {
                path: 'createActivity',
                element: <ActivityForm key='create' />
            },
            {
                path: 'activity/:id',
                element: <ActivityDetails />
            },
            {
                path: 'manage/:id',
                element: <ActivityForm key='manage' />
            },
            {
                path: 'errors',
                element: <TestErrors />
            },
            {
                path: 'not-found',
                element: <NotFound />
            },
            {
                path: 'server-error',
                element: <ServerError />
            },
            {
                path: '*',
                element: <Navigate replace to="/not-found" />
            }
        ]
    }
];

export const Router = createBrowserRouter(Routes);