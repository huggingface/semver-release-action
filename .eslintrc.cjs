module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: ['eslint:recommended', 'standard'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        "consistent-return": 2,
        "indent": [1, 4],
        "no-else-return": 1,
        "semi": [1, "always"],
        "space-unary-ops": 2
    }
}
