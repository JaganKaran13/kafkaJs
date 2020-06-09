import * as Ajv from 'ajv';

// Ajv instance
var ajv = new Ajv({allErrors: true});

// Sample Schema for testing ajv validation.
var schema  = {
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
            "items": {"type": "string"}
        },
        "dob": {
            "type": "string",
            "format": "date"
        }
    }
};

// Valid Data to check the schema
var validData  = {
    "name": "Jagan",
    "age": 22,
    "fav": ["As"],
    "dob": "2020-02-20"
}

// validation
var valid = ajv.validate(schema, validData);

// Results printed based on the condition.
if (!valid) {
    console.log(valid)
    console.log(ajv.errorsText());
} else {
    console.log("valid schema data");
}

/**
 * Conditional based validation can also be done.
 * For Eg:
 * schema: { "not": { "minimum": 3 } }
 * valid: 1, 2
 * invalid: 3, 4, any non-number
 */