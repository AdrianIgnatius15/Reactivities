import { Button, Card, Image } from "semantic-ui-react";
import { ActivityDetailsProps } from "./props/ActivityDetailsProps.types";

export default function ActivityDetails({activity, cancelSelectedActivity, openForm}: ActivityDetailsProps) : JSX.Element {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity?.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity?.title}</Card.Header>
                <Card.Meta>
                    <span>{activity?.date.toString()}</span>
                </Card.Meta>
                <Card.Description>
                    {activity?.description}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths={2}>
                        <Button onClick={() => openForm(activity?.id)} basic color="blue" content="Edit" />
                        <Button onClick={() => cancelSelectedActivity()} basic color="grey" content="Cancel" />
                    </Button.Group>
                </Card.Content>
        </Card>
    );
}