import { Button, Header, Segment } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import { useEffect, useState } from "react";
import { useStore } from "../../../stores/contextStore/storeContext";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import { ActivityFormValidatorSchema } from "../../../validators/ActivityFormValidatorsSchema";
import MyTextInput from "../../../common/form/MyTextInput";
import MyTextArea from "../../../common/form/MyTextArea";
import MySelectInput from "../../../common/form/MySelectInput";
import { categoryOptions } from "../../../common/options/categoryOptions";
import MyDateInput from "../../../common/form/MyDateInput";

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
            date: null,
            description: '',
            venue: ''
        }
    );

    useEffect(() => {
        if (id)
            activityStore.loadActivity(id).then(activity => setActivity(activity));
    }, [id, activityStore.loadActivity])

    function handleSubmit(activity : Activity) {
        if (!activity?.id) {
            activity!.id = uuid();
            activityStore.createActivity(activity!).then(() => navigate(`/activity/${activity!.id}`));
        } else {
            activityStore.updateActivity(activity).then(() => navigate(`/activity/${activity!.id}`));
        }
    }

    if (activityStore.loadingInitial) return <LoadingComponent />

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal" />
            <Formik validationSchema={ActivityFormValidatorSchema} enableReinitialize initialValues={activity!} onSubmit={values => handleSubmit(values)}>
                {({handleSubmit, isSubmitting, isValid, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit}>
                        <MyTextInput name="title" placeholder="Title" />
                        <MyTextArea rows={3} placeholder="Description" name="description" />
                        <MySelectInput options={categoryOptions} placeholder="Category" name="category" />
                        <MyDateInput 
                            placeholderText="Date" 
                            name="date"
                            showTimeSelect
                            timeCaption="time"
                            dateFormat={'MMMM d, yyyy h:mm aa'}
                         />
                         <Header content="Location Details" sub color="teal" />
                        <MyTextInput placeholder="City" name="city" />
                        <MyTextInput placeholder="Venue" name="venue" />
        
                        <Button disabled={isSubmitting || !isValid || !dirty} loading={activityStore.loading} floated="right" positive type="submit" content="Submit" />
                        <Button as={Link} to="/activities" floated="right" color="grey" negative type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
})