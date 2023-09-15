import * as Yup from 'yup';

export const RegisterFormValidatorsSchema = Yup.object({
    displayName : Yup.string().required(),
    username : Yup.string().required(),
    email : Yup.string().required(),
    password : Yup.string().required(),
});