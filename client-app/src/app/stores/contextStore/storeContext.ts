import { createContext, useContext } from "react";
import ActivityStore from "../activityStore";
import { Store } from '../store-interface/store';
import CommonStore from "../commonStore";

export const store : Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore()
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}