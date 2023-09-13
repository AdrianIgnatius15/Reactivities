import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";
import { MySelectInputProps } from "./props/MySelectInputProps.type";

export default function MySelectInput(props : MySelectInputProps) : JSX.Element {
    const [field, meta, helpers] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label htmlFor="">{props.label}</label>
            <Select 
                clearable
                options={props.options}
                value={field.value}
                onChange={(_, data) => {helpers.setValue(data.value)}}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color="red">
                    {meta.error}
                </Label>
            ) : null}
        </Form.Field>
    );
}