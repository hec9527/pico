module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'airbnb',
        'plugin:react/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    plugins: ['react', 'import', '@typescript-eslint', 'react-hooks'],
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'no-undef': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'import/no-named-as-default': 0,
        'import/no-extraneous-dependencies': 0,
        'react/display-name': 0,
        'react/button-has-type': 0,
        'react/require-default-props': 0,
        'react/jsx-filename-extension': 0,
        'react/function-component-definition': 0,
        'react/jsx-props-no-spreading': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
    },
};
