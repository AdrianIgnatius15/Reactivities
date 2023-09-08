import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/contextStore/storeContext";

export default function NavBar(): JSX.Element {
    const activityStore = useStore().activityStore;
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header> 
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }} />
                    Reactivities
                </Menu.Item>

                <Menu.Item name="Activities" />
                
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    );
}