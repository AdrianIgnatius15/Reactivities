import { useField } from "formik";
import { MyTextInputProps } from "./props/MyTextInputProps.type";
import { Form, Label } from "semantic-ui-react";

export default function MyTextInput(props : MyTextInputProps) : JSX.Element {
    const [field, meta] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label htmlFor="">{props.label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color="red">
                    {meta.error}
                </Label>
            ) : null}
        </Form.Field>
    );
}