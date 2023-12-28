import { check, validationResult } from 'express-validator';

// Define validation rules
const validateEmail = check('email').isEmail().withMessage('Invalid email address').exists().withMessage('Email is required');
const validateName = check('full_name').exists().withMessage('Name is required');
const validateCollegeName = check('college_name').isString().trim().isLength({ min: 5 }).withMessage('College name must be at least 5 characters long').exists().withMessage('College name is required');
const validateYear = check('year').isInt({ allow_leading_zeroes: false }).withMessage('Invalid Year').exists().withMessage('Year is required');
const validateBranch = check('branch').isString().trim().exists().withMessage('Branch is required');
const validateMobileNumber = check('mobile_number').isMobilePhone('en-IN').withMessage('Invalid mobile number').exists().withMessage('Mobile number is required');
const validateDateOfBirth = check('date_of_birth').isDate().withMessage('Invalid date of birth').exists().withMessage('Date of birth is required');


export const UserSchemaValidationChain = [validateName, validateEmail, validateCollegeName, validateYear, validateBranch, validateMobileNumber, validateDateOfBirth];

export const userSchemaValidationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() })
    }
    return next();
}