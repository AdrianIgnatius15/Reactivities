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
     deleteActivity: (id : string) => void,
     submitting : boolean
}