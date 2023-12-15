import { observer } from "mobx-react-lite";
import { Image, List, Popup } from "semantic-ui-react";
import { ActivityListItemAttendeeProps } from "./props/ActivityListItemAttendeeProps.type";
import { Link } from "react-router-dom";
import ProfileCard from "../profiles/ProfileCard";

export default observer(function ActivityListItemAttendee(props : ActivityListItemAttendeeProps) : JSX.Element {
    return(
        <List horizontal>
            {props.attendees.map(attendee => (
                <Popup 
                    hoverable
                    key={attendee.username}
                    trigger={
                        <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                            <Image size="mini" circular src={attendee.image || "/assets/user.png"} />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    );
});