import { Activity } from "../../../../models/activity"

/**
 * ## Activity Dashboard Component Properties
 * @classdesc Defines the properties used to construct the dashboard component
 * @author Adrian Joseph
 */
export type ActivityDashboardProps = {
    /**
     * #### List of "Activity"s passed
     * optional and can be nullable
     */
    activities?: Activity[],

    /**
     * #### Selected "Activity" which will be saved in this variable
     * optional and can be nullable
     */
    selectedActivity?: Activity,

    /**
     * #### Edit mode to determine the visibility of the form
     * mandatory
     */
    editMode : boolean,
}