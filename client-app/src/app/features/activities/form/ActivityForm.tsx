import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import { useEffect, useState } from "react";
import { useStore } from "../../../stores/contextStore/storeContext";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";
import { v4 as uuid } from "uuid";

export default observer(function ActivityForm() : JSX.Element{
    const activityStore = useStore().activityStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity | undefined>(
        {
            id: '',
            category: '',
            title: '',
            city: '',
            date: '',
            // date: new Date(),
            description: '',
            venue: ''
        }
    );

    useEffect(() => {
        if (id)
            activityStore.loadActivity(id).then(activity => setActivity(activity));
    }, [id, activityStore.loadActivity])

    function handleSubmit() {
        if (!activity?.id) {
            activity!.id = uuid();
            activityStore.createActivity(activity!).then(() => navigate(`/activity/${activity!.id}`));
        } else {
            activityStore.updateActivity(activity).then(() => navigate(`/activity/${activity!.id}`));
        }
    }

    function handleInputOnChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let name = event.target.name;
        let value = event.target.value;

        //We spread the "Activity" in the use state to create a new array of an Activity and then use key-value concept to update the change of any property value
        // in the same "Activity"
        setActivity({...activity!, [name]: value})
    }

    if (activityStore.loadingInitial) return <LoadingComponent />

    return (
        <Segment clearing >
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" value={activity?.title} onChange={handleInputOnChange} name="title" />
                <Form.TextArea placeholder="Description" value={activity?.description} onChange={handleInputOnChange} name="description" />
                <Form.Input placeholder="Category" value={activity?.category} onChange={handleInputOnChange} name="category" />
                {/* <Form.Input placeholder="Date" type="date" value={new Date(activity?.date).toLocaleDateString()} onChange={handleInputOnChange} name="date" /> */}
                <Form.Input placeholder="Date" type="date" value={activity?.date} onChange={handleInputOnChange} name="date" />
                <Form.Input placeholder="City" value={activity?.city} onChange={handleInputOnChange} name="city" />
                <Form.Input placeholder="Venue" value={activity?.venue} onChange={handleInputOnChange} name="venue" />

                <Button loading={activityStore.loading} floated="right" positive type="submit" content="Submit" />
                <Button as={Link} to="/activities" floated="right" color="grey" negative type="button" content="Cancel" />
            </Form>
        </Segment>
    );
})