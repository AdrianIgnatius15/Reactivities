import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/dashboard/details/ActivityDetails";

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
                path: '/activity/:id',
                element: <ActivityDetails />
            },
            {
                path: '/manage/:id',
                element: <ActivityForm key='manage' />
            }
        ]
    }
];

export const Router = createBrowserRouter(Routes);