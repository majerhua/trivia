import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  name: yup.string().required('Completar este campo'),
  email: yup.string()
  .required('Completar este campo')
  .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'El valor ingresado no es un correo'),
  identity_document: yup.string().required('Completar este campo'),
  type_document: yup.string().required('Completar este campo'),
  phone: yup.string()
  .required('Completar este campo')
  .matches(/^[0-9]+$/, 'Solo se aceptan dígitos'),
  is_suscriptor: yup.string().required('Completar este campo')
})

export const TriviaSchema = yup.object().shape({
  alternativeNumber: yup.number()
})