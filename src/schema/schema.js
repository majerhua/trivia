import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  name: yup.string()
  .required('Completar este campo')
  .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\*\s]+$/,'El valor ingresado no es correcto'),
  email: yup.string()
  .required('Completar este campo')
  .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'El valor ingresado no es un correo'),
  identity_document: yup.string()
  .required('Completar este campo')
  .when('type_document', (type_document) => {
    if (type_document === '1') {
        return yup.string()
        .required('Completar este campo')
        .matches(/^[0-9]+$/, 'Solo se aceptan números')
        .matches(/^[1-7].*$/, 'Debe comenzar con un numero del 1 al 7')
        .length(9, 'Deben haber 9 dígitos')
    } else if(type_document === '2'){
      return yup.string()
      .required('Completar este campo')
      .matches(/^[0-9]+$/, 'Solo se aceptan números')
      .matches(/^[1-9].*$/, 'Debe comenzar con un numero del 1 al 9')
      .max(13, 'Deben haber como máximo 13 dígitos') 
    }
  }),
  type_document: yup.string().required('Completar este campo'),
  phone: yup.string()
  .required('Completar este campo')
  .matches(/^[0-9]+$/, 'Solo se aceptan números')
  .matches(/^[(2)(6)(7)(8)(9)].*$/, 'El número no puede iniciar con 0,1,3,4 y 5')
  .length(8, 'Deben haber 8 dígitos'),
  is_suscriptor: yup.string().nullable().required('Completar este campo'),
  terms_conditions: yup.bool().oneOf([true], 'Completar este campo'),
})


export const LoginSchema = yup.object().shape({
  username: yup.string()
  .required('Completar este campo')
  .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\*\s]+$/,'El valor ingresado no es correcto'),
  password: yup.string()
  .required('Completar este campo')
})

export const ResetTriviaSchema = yup.object().shape({
  description: yup.string()
  .required('Completar este campo')
})

export const TriviaSchema = yup.object().shape({
  alternativeNumber: yup.number().required('Debe escoger una opción para continuar con la trivia')
})