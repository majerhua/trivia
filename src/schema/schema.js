import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  name: yup.string().required('Completar este campo'),
  email: yup.string()
  .required('Completar este campo')
  .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'El valor ingresado no es un correo'),
  identity_document: yup.string()
  .required('Completar este campo')
  .when('type_document', (type_document) => {
    if (type_document === '1') {
        return yup.string()
        .required('Completar este campo')
        .matches(/^[0-9]+$/, 'Solo se aceptan dígitos')
        .matches(/^[1-7].*$/, 'Debe comenzar con un numero del 1 al 7')
        .length(9, 'Deben haber 9 dígitos')
    } else if(type_document === '2'){
      return yup.string()
      .required('Completar este campo')
      .matches(/^[0-9]+$/, 'Solo se aceptan dígitos')
      .matches(/^[8-9].*$/, 'Debe comenzar con un numero del 8 al 9')
      .length(12, 'Deben haber 12 dígitos') 
    }
  }),
  type_document: yup.string().required('Completar este campo'),
  phone: yup.string()
  .required('Completar este campo')
  .matches(/^[0-9]+$/, 'Solo se aceptan dígitos')
  .min(8, 'No puede tener menos de 8 dígitos')
  .max(9, 'No puede tener más de 9 dígitos'),
  is_suscriptor: yup.string().required('Completar este campo'),
  terms_conditions: yup.string().nullable().required('Completar este campo')
})

export const TriviaSchema = yup.object().shape({
  alternativeNumber: yup.number().required('Debe escoger una opción para continuar con la trivia')
})