import * as Ajv from 'ajv';

// User interface.
interface User {
    name: string,
    age: number,
    fav: string[],
    dob: string
}


// Ajv instance
let ajv = new Ajv({ allErrors: true });

// Sample Schema for testing ajv validation.
let schema = {
    "properties": {
        "name": {
            "type": "string",
            "maxLength": 10,
            "minLength": 5,

        },
        "age": {
            "type": "number",
        },
        "fav": {
            "type": "array",
            "items": { "type": "string" }
        },
        "dob": {
            "type": "string",
            "format": "date"
        }
    }
};

// Valid Data to check the schema
let validData = {
    "name": "Jagan",
    "age": 22,
    "fav": ["As"],
    "dob": "2020-02-20"
}

// Calls the function to validate the schema.
validateSchema(validData);

function validateSchema(userDetails: User): void {
    // Schema validation.
    let valid = ajv.validate(schema, userDetails);

    // Results printed based on the condition.
    if (!valid) {
        console.log(valid)
        console.log(ajv.errorsText());
    } else {
        console.log("valid schema data");
    }
}

/**
 * Conditional based validation can also be done.
 * For Eg:
 * schema: { "not": { "minimum": 3 } }
 * valid: 1, 2
 * invalid: 3, 4, any non-number
 */
