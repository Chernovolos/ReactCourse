module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'require-jsdoc': 'off',
        'indent': ['error', 4],
        'no-invalid-this': 0,
        'babel/no-invalid-this': 1,
        'max-len': ['warn', {'code': 120}],
    }
};