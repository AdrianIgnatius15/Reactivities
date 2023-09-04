import { Button, Container, Menu } from "semantic-ui-react";
import { NavBarProps } from "./props/NavBarProps.types";

export default function NavBar(props: NavBarProps): JSX.Element {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header> 
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }} />
                    Reactivities
                </Menu.Item>

                <Menu.Item name="Activities" />
                
                <Menu.Item>
                    <Button onClick={() => props.openForm()} positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    );
}