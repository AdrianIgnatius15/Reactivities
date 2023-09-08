import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import { useState } from "react";
import { useStore } from "../../../stores/contextStore/storeContext";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() : JSX.Element{
    const activityStore = useStore().activityStore;
    const initialState : Activity = activityStore.selectedActivity ?? {
        id: '',
        category: '',
        title: '',
        city: '',
        // date: '',
        date: new Date(),
        description: '',
        venue: ''
    };

    const [activity, setActivity] = useState<Activity>(initialState);

    function handleSubmit() {
        console.log(`Submitted data of activity`, activity);
        activity.id ? activityStore.updateActivity(activity) : activityStore.createActivity(activity);

    }

    function handleInputOnChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let name = event.target.name;
        let value = event.target.value;

        //We spread the "Activity" in the use state to create a new array of an Activity and then use key-value concept to update the change of any property value
        // in the same "Activity"
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment clearing >
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" value={activity.title} onChange={handleInputOnChange} name="title" />
                <Form.TextArea placeholder="Description" value={activity.description} onChange={handleInputOnChange} name="description" />
                <Form.Input placeholder="Category" value={activity.category} onChange={handleInputOnChange} name="category" />
                <Form.Input placeholder="Date" type="date" value={new Date(activity.date).toLocaleDateString()} onChange={handleInputOnChange} name="date" />
                <Form.Input placeholder="City" value={activity.city} onChange={handleInputOnChange} name="city" />
                <Form.Input placeholder="Venue" value={activity.venue} onChange={handleInputOnChange} name="venue" />

                <Button loading={activityStore.loading} floated="right" positive type="submit" content="Submit" />
                <Button onClick={() => activityStore.closeForm()} floated="right" color="grey" negative type="button" content="Cancel" />
            </Form>
        </Segment>
    );
})