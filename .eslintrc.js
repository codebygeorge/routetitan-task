module.exports = {
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es2020: true
    },
    extends: [
        'plugin:react/recommended', 'airbnb' // 'airbnb/hooks'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2020
    },
    plugins: [
        'react'
    ],
    rules: {
        'react/forbid-prop-types': 'warn',
        'import/prefer-default-export': 'warn',
        'no-unused-vars': 'warn',
        'no-console': 'off',
        // 'func-names': 'off',
        // 'no-process-exit': 'off',
        // 'object-shorthand': 'off',
        // 'class-methods-use-this': 'off',
        'react/jsx-indent-props': ['off', 'first'],
        'react/jsx-indent': ['off', 'first'],
        'react/jsx-tag-spacing': ['off'],
        'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx'] }],
        'react/jsx-max-props-per-line': ['error', {
            'maximum': 3,
            'when': 'multiline'
        }],
        'react/jsx-first-prop-new-line': ['off'],
        'react/jsx-props-no-spreading': ['off'],
        'react/jsx-one-expression-per-line': ['off', { 'allow': 'single-child' }],
        'class-methods-use-this': ['warn'],
        'no-nested-ternary': 'off',
        'camelcase': ['warn', {
            properties: 'never',
            'ignoreDestructuring': true
        }],
        'no-unused-expressions': ['error', {
            allowShortCircuit: true,
            allowTernary: true
        }],
        'padded-blocks': ['off', 'always', { allowSingleLineBlocks: true }],
        'max-len': ['warn', { 'code': 170 }],
        'object-curly-newline': ['off', {
            'ImportDeclaration': 'never',
            'ExportDeclaration': {
                'multiline': true,
                'minProperties': 3
            }
        }],
        'no-multiple-empty-lines': ['error', {
            'max': 9999,
            'maxEOF': 0
        }],
        'eol-last': ['error', 'never'],
        'comma-dangle': ['error', 'never'],
        // "comma-dangle": ["error", {
        //     "arrays": "never",
        //     "objects": "never",
        //     "imports": "never",
        //     "exports": "never",
        //     "functions": "never"
        // }]
        'indent': 'off',
        // 'indent': ['error', 4],
        'quote-props': ['off'],
        'spaced-comment': ['warn', 'always', { 'exceptions': ['-', '+'] }],
        'arrow-parens': ['error', 'as-needed']
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx'],
                moduleDirectory: ['node_modules', 'src/']
            }
        }
    }
};