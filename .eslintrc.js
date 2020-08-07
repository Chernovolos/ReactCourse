module.exports = {
  'env': {
    'browser': true,
    'es2020': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 11,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'babel'
  ],
  'rules': {
    'require-jsdoc': 'off',
    'indent': ['error', 4],
    'no-invalid-this': 0,
    'babel/no-invalid-this': 1,
    'max-len': ['warn', {'code': 120}],
    // custom
    // 'max-lines': ['warn', {"max": 400, 'skipBlankLines': false, 'skipComments': false}]
  },
};
