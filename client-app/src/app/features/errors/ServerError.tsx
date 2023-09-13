import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/contextStore/storeContext"
import { Container, Header, Segment } from "semantic-ui-react";

export default observer(function ServerError() : JSX.Element {
    const commonStore = useStore().commonStore;

    return(
        <Container>
            <Header as={"h1"} content="Server Error" />
            <Header sub as={"h5"} color="red" content={commonStore.error?.message} />
            {commonStore.error?.details && 
                <Segment>
                    <Header as="h4" content="Stack Trace" color="teal" />
                    <code style={{marginTop: '10px'}}>{commonStore.error.details}</code>
                </Segment>
            }
        </Container>
    );
})