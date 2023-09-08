import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../stores/contextStore/storeContext';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../layout/LoadingComponent';

export default observer(function ActivityDashboard() {
    const { activityStore, } = useStore();
    const { loadActivities, activityRegistry } = activityStore;

    useEffect(() => {
        if (activityRegistry.size <= 1)
            loadActivities();
    }, [activityStore, activityRegistry.size]);

    if(activityStore.loadingInitial) return <LoadingComponent content='Loading data...' />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>

            <Grid.Column width={6}>
                <h2>Activity Filters here</h2>
            </Grid.Column>
        </Grid>
    );
})