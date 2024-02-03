import { check, validationResult } from 'express-validator';

// Define validation rules
const validateEmail = check('email').trim().isEmail().withMessage('Invalid email address').exists().withMessage('Email is required');
const validateName = check('full_name').trim().exists().withMessage('Name is required');
const validateCollegeName = check('college_name').isString().trim().isLength({ min: 2 }).withMessage('College name must be at least 5 characters long').exists().withMessage('College name is required');
// const validateYear = check('year').isInt({ allow_leading_zeroes: false }).withMessage('Invalid Year').exists().withMessage('Year is required');
// const validateBranch = check('branch').isString().trim().exists().withMessage('Branch is required');
const validateMobileNumber = check('mobile_number').trim().isMobilePhone('en-IN').withMessage('Invalid mobile number').exists().withMessage('Mobile number is required');
// const validateDateOfBirth = check('date_of_birth').isString().trim().isLength({ min: 10, max: 10 }).withMessage('Invalid date of birth').exists().withMessage('Date of birth is required');


export const UserSchemaValidationChain = [validateName, validateEmail, validateCollegeName ,validateMobileNumber];
// export const UserSchemaValidationChain = [validateName, validateEmail];


export const userSchemaValidationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() })
    }
    return next();
}