import { Message } from "semantic-ui-react";
import { ValidationErrorProps } from "./props/ValidationErrorProps.type";

export default function ValidationError(props : ValidationErrorProps) : JSX.Element {
    return (
        <Message error>
            {props.errors && (
                <Message.List>
                    {props.errors.map((err : string, index : number) => (
                        <Message.Item key={index}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    );
}