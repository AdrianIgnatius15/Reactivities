import { useField } from "formik";
import { MyTextAreaProps } from "./props/MyTextAreaProps.type";
import { Form, Label } from "semantic-ui-react";

export default function MyTextArea(props : MyTextAreaProps) : JSX.Element {
    const [field, meta] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label htmlFor="">{props.label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color="red">
                    {meta.error}
                </Label>
            ) : null}
        </Form.Field>
    );
}