const validator = require("validator");
const isEmpty = require("is-empty");

validateLoginData = (data) => {
    let errors = {};
    
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (validator.isEmpty(data.name)) {
        errors.name = "Enter valid name"
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)){
        errors.email = "Enter valid email address"
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } else if (!data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
        errors.password = "Password should contain atleast 8 characters including a number, a lowercase letter and an uppercase letter"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateLoginData;