import axios, { AxiosResponse } from "axios";
import { baseURL } from "../config/configuration";
import { Activity } from "../models/activity";

const sleepFakery = (delay : number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = baseURL;

axios.interceptors.response.use(async response => {
    try {
        await sleepFakery(1000);
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});

const responseBody = <T> (response : AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url : string) => axios.get<T>(url).then(responseBody),
    post: <T> (url : string, body: Object | Activity) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url : string, body: Object | Activity) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url : string) => axios.delete(url).then<T>(responseBody)
}

const Activities = {
    list: () => request.get<Activity[]>('/activities'),
    details: (id : string) => request.get<Activity>(`/activities/${id}`),
    create: (activity : Activity) => request.post(`/activities`, activity),
    update : (activity: Activity) => request.put(`/activities/${activity.id}`, activity),
    delete: (id : string) => request.delete(`/activities/${id}`)
};

const agent = {
    Activities
}

export default agent;