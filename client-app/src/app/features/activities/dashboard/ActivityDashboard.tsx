import { Grid } from 'semantic-ui-react';
import { ActivityDashboardProps } from './props/ActivityDashboardProps.type';
import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import ActivityForm from '../form/ActivityForm';

export default function ActivityDashboard(props : ActivityDashboardProps) {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={props.activities} selectActivity={props.selectActivity} deleteActivity={props.deleteActivity} />
            </Grid.Column>

            <Grid.Column width={6}>
                {
                (props.selectedActivity && props.editMode === false) && 
                        <ActivityDetails activity={props.selectedActivity} cancelSelectedActivity={props.cancelSelectedActivity} openForm={props.handleFormOpen} />
                }
                {
                props.editMode && 
                    <ActivityForm selectedActivity={props.selectedActivity} editMode={props.editMode} closeForm={props.handleFormClose} 
                        handleCreateOrEditActivity={props.handleCreateOrEditActivity} />
                    }
            </Grid.Column>
        </Grid>
    );
}