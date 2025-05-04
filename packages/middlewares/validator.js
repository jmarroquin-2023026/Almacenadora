import { body } from "express-validator"
import {existEmail, existUsername, notRequiredField, objetctIdValid } from "../utils/db.validators.js"
import { validateErrors, validateErrorsWhitoutFiles } from "./validate.errors.js"

//Usuario
export const registerValidator = [
    body('company', 'Company cannot be empty')
    .notEmpty(),
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    /*body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),*/
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),    
    /*body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),*/
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Passwrod must be strong')
        .isLength({min:8})
        .withMessage('Password be min 8 chacarcters'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
     body('name', 'Name cannot be empty')
        .notEmpty(),
    body('address', 'address cannot be empty')
        .notEmpty(),    
    validateErrors
]

export const updateUSerValidator = [
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom((username, { req })=> existUsername(username, req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
    body('password')
        .optional()
        .custom(notRequiredField),
    body('profilePicture')
        .optional()
        .custom(notRequiredField),
    body('role')
        .optional()
        .custom(notRequiredField),
    validateErrorsWhitoutFiles
]

//Producto
export const addProduct = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('description', 'Description cannot be empty')
        .notEmpty()
        .isLength({max:50}),
    body('price','Price cannot be empty')
        .notEmpty(),
    body('category','Category not exist')
        .notEmpty()
        .custom(objetctIdValid),
    body('stock','Stock cannot be empty')
        .notEmpty(),
    validateErrors
]