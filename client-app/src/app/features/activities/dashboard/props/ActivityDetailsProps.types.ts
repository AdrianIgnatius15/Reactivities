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
}