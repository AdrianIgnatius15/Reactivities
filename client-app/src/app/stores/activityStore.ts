import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../network/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
    // title: string = "Hello MobX";
    activities : Activity[] = [];
    activityRegistry = new Map<string, Activity>
    selectedActivity : Activity | undefined;
    editMode : boolean = false;
    loading : boolean = false;
    loadingInitial : boolean = false;

    constructor() {
        // makeObservable(this, {
        //     title: observable,
        //     setTitle: action
        //     //setTitle: action.bound
        // });

        makeAutoObservable(this);
    }

    // setTitle(by : string) {
    //     this.title = this.title + ` by ${by}`;
    // };

    // setTitle = (by : string) => {
    //     this.title = this.title + ` by ${by}`;
    // };

    get activitiesByDate() : Activity[] {
        return Array.from(this.activityRegistry.values()).sort((a , b) =>
            Date.parse(a.date) - Date.parse(b.date) );
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            for (const activity of activities) {
                this.setActivity(activity);
            }
            this.setActivities(activities);

            this.setLoadingInitial(false);
        } catch (error) {
            console.error(`${ActivityStore.name} error occured due to`, error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id : string) : Promise<Activity | undefined> => {
        let activity : Activity | undefined = this.getActivity(id);
        if(activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    this.setActivity(activity!);
                    this.selectedActivity = activity;
                });
                this.setLoadingInitial(false);

                return activity;
            } catch (error) {
                console.error(`${ActivityStore.name} error occured due to`, error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getActivity = (id : string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity : Activity) => this.activityRegistry.set(activity.id, activity);

    setLoadingInitial = (flag : boolean) => this.loadingInitial = flag;
    
    setActivities = (obtainedActivities : Activity[]) => 
        this.activities = JSON.parse(JSON.stringify(obtainedActivities));
    
    createActivity = async (activity : Activity) => {
        this.loading = true;
        activity.id = uuid();

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.error(`${ActivityStore.name} error occured due to`, error);
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
            });
        }
    }

    updateActivity = async (updatedActivity : Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(updatedActivity);
            runInAction(() => {
                // this.activities = [...this.activities.filter(a => a.id !== updatedActivity.id), updatedActivity];
                this.activityRegistry.set(updatedActivity.id, updatedActivity);
                this.selectedActivity = updatedActivity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(`${ActivityStore.name} error occured due to`, error);
            runInAction(() => this.loading = false);
        }
    }

    deleteActivity = async (id : string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                // this.activities = [...this.activities.filter(a => a.id !== id)];
                this.activityRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(`${ActivityStore.name} error occured due to`, error);
            runInAction(() => this.loading = false);
        }
    }
}