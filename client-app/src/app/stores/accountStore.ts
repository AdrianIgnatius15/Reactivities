import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../models/user";
import { Login } from "../models/login";
import agent from "../network/agent";
import { store } from "./contextStore/storeContext";
import { Router } from "../router/Route";

export default class AccountStore {
    user : User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds : Login) => {
        try {
            const user = await agent.Account.login(creds);
            runInAction(() => {
                this.user = user;
                store.commonStore.setToken(user.token);
            });

            Router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    };

    register = async (creds : Login) => {
        try {
            const user = await agent.Account.register(creds);
            runInAction(() => {
                this.user = user;
                store.commonStore.setToken(user.token);
            });

            Router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    };

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        Router.navigate("/");
    };

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => {
                this.user = user;
            });
        } catch (error) {
            throw error;
        }
    };
}