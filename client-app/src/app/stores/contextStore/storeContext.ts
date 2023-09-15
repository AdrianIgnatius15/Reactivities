import { createContext, useContext } from "react";
import ActivityStore from "../activityStore";
import { Store } from '../store-interface/store';
import CommonStore from "../commonStore";
import AccountStore from "../accountStore";
import ModalStore from "../modalStore";

export const store : Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore : new AccountStore(),
    modalStore : new ModalStore()
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}