import { Activity } from "../../../../models/activity";

/**
 * ## Activity Details Component Properties
 * @classdesc Defines the properties used to construct the Activity details components
 * @author Adrian Joseph
 */
export type ActivityDetailsProps = {
    /**
     * #### List of "Activity"s passed
     * optional and can be nullable
     */
    activity? : Activity;

    /**
     * #### Deselecting a particular "Activity" function
     * @function cancelSelectedActivity()
     */
    cancelSelectedActivity: () => void,

    /**
     * #### Handles the form to appear
     * @param id is the "Activity" ID if it's selected by the user
     * @function openForm(id)
     */
    openForm: (id?: string) => void
}