'use strict'
module.exports = {
    birthNr: {
        validationFunctions: [
            {
                name: 'isEmpty',
                invertResult: true,
                message: "field is required"
            }

        ],
        dependants: ['name']
    }
};