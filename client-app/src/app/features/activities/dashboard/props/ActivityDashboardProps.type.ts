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
     * #### Selecting a particular "Activity" function
     * @function selectActivity(id)
     * @param id is the ID of the "Activity" which is a string data type
     */
    selectActivity: (id : string) => void,
    
     /**
     * #### Deselecting a particular "Activity" function
     * @function cancelSelectedActivity()
     */
    cancelSelectedActivity: () => void,

    /**
     * #### Edit mode to determine the visibility of the form
     * mandatory
     */
    editMode : boolean,
    
    /**
     * #### Handles the form to appear
     * @param id is the "Activity" ID if it's selected by the user
     * @function handleFormOpen(id)
     */
    handleFormOpen : (id? : string) => void,

    /**
     * #### Handles the form to disappear
     * @function handleFormClose()
     */
    handleFormClose : () => void,
    handleCreateOrEditActivity: (activity: Activity) => void,
    deleteActivity: (id : string) => void
    submitting: boolean,
}