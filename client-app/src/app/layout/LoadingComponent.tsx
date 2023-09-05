import { Dimmer, Loader } from "semantic-ui-react";
import { LoadingComponentProps } from "./props/LoadingComponentProps.types";

export default function LoadingComponent({ inverted = true, content = 'Loading...' } : LoadingComponentProps) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    );
}