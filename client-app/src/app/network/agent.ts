import axios, { AxiosError, AxiosResponse } from "axios";
import { baseURL } from "../config/configuration";
import { toast } from "react-toastify";
import { Router } from "../router/Route";
import { store } from "../stores/contextStore/storeContext";
import { User } from "../models/user";
import { Login } from "../models/login";
import { ActivityFormValues } from "../models/form-models/activityFormValues";
import { IActivity } from "../models/interfaces/activity";

const sleepFakery = (delay : number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) {
        if(token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
})
axios.interceptors.response.use(async response => {
    
        await sleepFakery(1000);
        return response;
}, (error : AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if(config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
                Router.navigate('/not-found');
            }

            if(data?.errors) {
                const modalStateError : string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateError.push(data.errors[key]);
                    }
                }

                throw modalStateError.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error("Unauthorised");
            break;
        case 403:
            toast.error("Forbidden");
            break;
        case 404:
            Router.navigate('/not-found');
            toast.error("Not Found");
            break;
        case 500:
            store.commonStore.setServerError(data);
            Router.navigate('/server-error');
            break;
        default:
            break;
    }

    return Promise.reject(error);
});

const responseBody = <T> (response : AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url : string) => axios.get<T>(url).then(responseBody),
    post: <T> (url : string, body: Object | IActivity) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url : string, body: Object | IActivity) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url : string) => axios.delete(url).then<T>(responseBody)
}

const Activities = {
    list: () => request.get<IActivity[]>('/activities'),
    details: (id : string) => request.get<IActivity>(`/activities/${id}`),
    create: (activity : ActivityFormValues) => request.post(`/activities`, activity),
    update : (activity: ActivityFormValues) => request.put(`/activities/${activity.id}`, activity),
    delete: (id : string) => request.delete(`/activities/${id}`),
    attend: (id : string) => request.post<void>(`/activities/${id}/attend`, {})
};

const Account = {
    current: () => request.get<User>("/account"),
    login: (loginModel : Login) => request.post<User>('/account/login', loginModel),
    register: (registerModal : Login) => request.post<User>("/account/register", registerModal)
};

const agent = {
    Activities,
    Account
}

export default agent;