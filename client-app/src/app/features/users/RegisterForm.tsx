import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../stores/contextStore/storeContext";
import { observer } from "mobx-react-lite";
import { RegisterFormValidatorsSchema } from "../../validators/RegisterFormValidatorsSchema";
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() : JSX.Element {
    const { userStore } = useStore();

    return(
        <Formik 
            initialValues={{email : '', password: '', displayName: '', username: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values)
            .catch(error => setErrors({error}))}
            validationSchema={RegisterFormValidatorsSchema}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as="h2" content="Signup to Reactivities" color="teal" textAlign="center" />
                    <MyTextInput placeholder="Display Name" name="displayName" />
                    <MyTextInput placeholder="Username" name="username" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type="password" />
                    <ErrorMessage name="error" render={() => <ValidationError errors={errors.error as unknown as string[]} />} basic color="red" content={errors.error} />
                    <Button 
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} 
                        positive 
                        content="Register" 
                        type="submit" 
                        fluid
                    />
                </Form>
            )}
        </Formik>
    );
})