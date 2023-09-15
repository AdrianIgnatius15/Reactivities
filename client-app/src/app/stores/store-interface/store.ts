import AccountStore from "../accountStore";
import ActivityStore from "../activityStore";
import CommonStore from "../commonStore";
import ModalStore from "../modalStore";

export interface Store {
    activityStore : ActivityStore,
    commonStore : CommonStore,
    userStore : AccountStore,
    modalStore : ModalStore
}