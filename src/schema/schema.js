import * as yup from 'yup';

export const schema = yup.object({
    firstname: yup.string().required("Name is required"),
    lastname: yup.string().required("Last name is required"),
    age: yup.number().required("Age is required"),
    country: yup.string().required("Country is required"),
    email: yup.string().required("Email is required"),    
})