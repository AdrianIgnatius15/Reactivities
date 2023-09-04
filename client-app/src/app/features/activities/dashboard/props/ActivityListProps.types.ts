import { Activity } from "../../../../models/activity"

/**
 * ## Activity List Component Properties
 * @classdesc Defines the properties used to construct the list of "Activities" component
 * @author Adrian Joseph
 */
export type ActivityListProps = {
     /**
      * ### List of "Activity"
      * It can nullable or optional
      */
     activities?: Activity[],
     
     /**
     * #### Selecting a particular "Activity" function
     * @function selectActivity(id)
     * @param id is the ID of the "Activity" which is a string data type
     */
     selectActivity : (id: string) => void,
     deleteActivity: (id : string) => void
}