import { Button, Item, Label, Segment } from "semantic-ui-react";
import { ActivityListProps } from "./props/ActivityListProps.types";
import { SyntheticEvent, useState } from "react";

export default function ActivityList({activities, selectActivity, deleteActivity, submitting}: ActivityListProps) : JSX.Element {
    const [target, setTarget] = useState<string>('');

    function handleDeleteActivity(event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return(
        <Segment>
            <Item.Group divided>
                {activities?.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as={'a'}>{activity.title}</Item.Header>
                            {/* <Item.Meta>{activity.date.toString()}</Item.Meta> */}
                            <Item.Meta>{new Date(activity.date).toLocaleDateString()}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id)} floated="right" content="View" color="blue" />
                                <Button loading={submitting && target === activity.id} name={activity.id} onClick={(e) => handleDeleteActivity(e, activity.id)} floated="right" content="Delete" color="red" />
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}