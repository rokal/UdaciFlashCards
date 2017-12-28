import {isNil, trim} from 'lodash'

const isRequired = (value) => {
    let error = null
    if(isNil(value) || trim(value) === '') {
        error = (fieldname) => `"${fieldname}" is required ` 
    }
    return error
}

const notEmptyArray = (value) => {
    if(value.length === 0) {
        return (fieldname) => `Please, provide at least on element for "${fieldname}"`
    }
    return null
}

export const newQuestionValidation = {
    'title': isRequired,
    'answers': notEmptyArray
}

export const newAnswerValidation = {
    'body': isRequired
}

export const newDeckValidation = {
    'title': isRequired
}

export const validateEntity = (entity, validations) => {
    for(let fieldName in validations) {
        const valueToValidate = entity[fieldName]
        const validationFunction = validations[fieldName] 
        const validationError = validationFunction(valueToValidate)
        if(validationError) {
            const errorMessage =  validationError(fieldName)
            return errorMessage
        }
    }
    return null
}

