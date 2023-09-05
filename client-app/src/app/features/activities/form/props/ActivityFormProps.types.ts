import { Activity } from "../../../../models/activity";

/**
 * ## Activity Form Component Properties
 * @classdesc Defines the properties used to construct the form component
 * @author Adrian Joseph
 */
export type ActivityFormProps = {
    /**
     * #### Handles the form to disappear
     * @function closeForm()
     */
    closeForm : () => void,

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
    handleCreateOrEditActivity: (activity : Activity) => void,
    submitting: boolean
}