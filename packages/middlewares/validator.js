import { body } from "express-validator"
import {existCategory, existCUI, existEmail, existPhone, existProduct, existUsername, notRequiredField, objetctIdValid } from '../utils/db.validator.js'
import { validateErrors, validateErrorsWhitoutFiles } from "./validate.errors.js"

export const registerUserValidator = [
    body('company', 'Company cannot be empty')
        .isLength({max: 40})
        .toLowerCase()
        .notEmpty(),
    body('name', 'Name cannot be empty')
        .notEmpty()
        .isLength({max: 25}),
    body('surname', 'Surname cannot be empty')
        .notEmpty()
        .isLength({max: 25}),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail).
        toLowerCase(),    
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isLength({max: 8})
        .isMobilePhone(),
    body('address', 'Address cannot be empty')
        .notEmpty()
        .isLength({max: 256}),
    body('role', 'Role cannot be empty')
        .custom(notRequiredField)
        .notEmpty()
        .toUpperCase(),    
    validateErrorsWhitoutFiles,
    validateErrors
]
export const updateUSerValidator = [
    body('company')
        .optional()
        .toLowerCase()
        .custom((company, { req })=> existCompany(company, req.user)),
    body('name', 'Name cannot be empty')
        .optional()
        .notEmpty()
        .isLength({max: 25}),
    body('surname', 'Surname cannot be empty')
        .optional()
        .notEmpty()
        .isLength({max: 25}),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
    body('phone', 'Phone cannot be empty')
        .optional()
        .notEmpty()
        .isLength({max: 8})
        .isMobilePhone(),
    body('address', 'Address cannot be empty')
        .optional()
        .notEmpty()
        .isLength({max: 256}),
    body('role', 'Role cannot be empty')
        .optional()
        .notEmpty()
        .toUpperCase()
        .custom(notRequiredField),    
    validateErrors
]

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .toLowerCase()
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .toLowerCase()
        .notEmpty(),
    body('email', 'Email cannot be empty')
        .toLowerCase()
        .notEmpty()
        .isEmail()
        .custom(existEmail), 
    body('CUI','CUI cannot be empty')
        .notEmpty()
        .custom(existCUI),   
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Passwrod must be strong')
        .isLength({min:8}),  
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone()
        .custom(existPhone),   
    validateErrors
]

export const categoryValidator=[
    body('name','Name cannot be empty').notEmpty().custom(existCategory),
    validateErrors
]
export const categoryUpdateValidator=[
    body('name',).notEmpty().optional().custom((category,{req})=>existCategory(category,{_id:req.params.id})),
    body('decription').notEmpty().optional(),
    validateErrors
]

export const updateStaffValidator=[
    body('name')
        .notEmpty()
        .toLowerCase()
        .optional(),
    body('surname')
        .notEmpty()
        .toLowerCase()
        .optional(),
    body('email')
        .notEmpty()
        .isEmail()
        .custom((email, {req})=>existEmail(email, req.staff)),
    body('CUI','CUI cannot be empty')
        .notEmpty()
        .optional()
        .custom(notRequiredField),   
    body('password')
        .notEmpty()
        .optional()
        .custom(notRequiredField),
    body('phone')
        .notEmpty()
        .isMobilePhone()
        .optional()
        .custom((phone, { req }) => existPhone(phone, req.staff)),
   
    validateErrorsWhitoutFiles
]

//Producto
export const addProductValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existProduct),
    body('description', 'Description cannot be empty')
        .notEmpty()
        .isLength({max:50}),
    body('price','Price cannot be empty')
        .notEmpty(),
    body('category','Category not exist')
        .notEmpty(),
    body('stock','Stock cannot be empty')
        .notEmpty(),
    body('expirationDate')
    .optional(),
    validateErrors
]

export const productUpdateValidator=[
    body('name','Name cannot be empty').notEmpty().toLowerCase().custom(existProduct),
    body('description','Description cannot be empty').notEmpty(),
    body('price','Price cannot be empty').notEmpty(),
    body('category','Category cannot be empty').notEmpty(),
    body('stock','Stock cannot be empty').notEmpty(),
    body('expirationDate')
    .optional(),
    validateErrors
]