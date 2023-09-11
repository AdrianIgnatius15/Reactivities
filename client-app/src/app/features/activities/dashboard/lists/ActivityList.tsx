import { Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../stores/contextStore/storeContext";
import ActivityListItem from "./ActivityListItem";
import React from "react";

export default observer(function ActivityList() : JSX.Element {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;
    
    return(
        <>
            {groupedActivities.map(([group, activities]) => (
                <React.Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>

                    {activities?.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </React.Fragment>
            ))}
        </>
    );
})