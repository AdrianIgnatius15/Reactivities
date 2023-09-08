import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../stores/contextStore/storeContext';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>

            <Grid.Column width={6}>
                {
                (activityStore.selectedActivity && activityStore.editMode === false) && 
                        <ActivityDetails />
                }
                {
                activityStore.editMode && 
                    <ActivityForm />
                    }
            </Grid.Column>
        </Grid>
    );
})