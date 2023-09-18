import { observer } from "mobx-react-lite";
import { ProfileCardProps } from "./props/ProfileCardProps.type";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default observer(function ProfileCard({ profile } : ProfileCardProps) : JSX.Element {
    return(
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'} />

            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>Bio goes here</Card.Description>
            </Card.Content>

            <Card.Content extra>
                <Icon name="user" />
                20 followers
            </Card.Content>
        </Card>
    );
});