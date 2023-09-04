/**
 * ## Nav Bar Component Properties
 * @classdesc Defines the properties used to construct the navigation bar component
 * @author Adrian Joseph
 */
export type NavBarProps = {
    /**
     * #### Handles the form to appear
     * @param id is the "Activity" ID if it's selected by the user
     * @function openForm(id)
     */
    openForm: (id? : string) => void
}