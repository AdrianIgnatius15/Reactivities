import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../network/agent";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { store } from "./contextStore/storeContext";
import { Profile } from "../models/profileModel";
import { ActivityFormValues } from "../models/form-models/activityFormValues";

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
            a.date!.getTime() - b.date!.getTime() );
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, "dd MMM yyyy");
                //This "activities[date]" is called property accessor more like "." operator.
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key : string]: Activity[]})
        );
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

    private setActivity = (activity : Activity) => {
        const user = store.userStore.user;
        if(user) {
            activity.isGoing = activity.attendees!.some(attendee => attendee.username === user.username);
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(attendee => attendee.username === activity.hostUsername);
        }
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    setLoadingInitial = (flag : boolean) => this.loadingInitial = flag;
    
    setActivities = (obtainedActivities : Activity[]) => 
        this.activities = JSON.parse(JSON.stringify(obtainedActivities));
    
    createActivity = async (activity : ActivityFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);

        try {
            await agent.Activities.create(activity);
            const newActivity = new Activity(activity);
            newActivity.hostUsername = user!.username;
            newActivity.attendees = [attendee];
            this.setActivity(newActivity);

            runInAction(() => {
                this.selectedActivity = newActivity;
            });
        } catch (error) {
            console.error(`${ActivityStore.name} error occured due to`, error);
        }
    }

    updateActivity = async (updatedActivity : ActivityFormValues) => {
        try {
            await agent.Activities.update(updatedActivity);
            runInAction(() => {
                // this.activities = [...this.activities.filter(a => a.id !== updatedActivity.id), updatedActivity];
                if(updatedActivity.id) {
                    const activity = {...this.getActivity(updatedActivity.id), ...updatedActivity};
                    this.activityRegistry.set(activity.id!, activity as Activity);
                    this.selectedActivity = updatedActivity as Activity;
                }
            });
        } catch (error) {
            console.log(`${ActivityStore.name} error occured due to`, error);
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

    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                if (this.selectedActivity?.isGoing) {
                    this.selectedActivity.attendees 
                        = this.selectedActivity.attendees?.filter(attendee => attendee.username !== user?.username);
                    this.selectedActivity.isGoing = false;
                } else {
                    const attendee = new Profile(user!);
                    this.selectedActivity?.attendees?.push(attendee);
                    this.selectedActivity!.isGoing = true;
                }

                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            });
        } catch (error) {
            console.log("Update attendance has failed due to", error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    cancelActivityToggle = async () => {
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }
}