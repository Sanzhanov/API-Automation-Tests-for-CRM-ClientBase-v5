module.exports = {
    require: '@babel/register',
    spec: 'tests/**/*.spec.js',
    file: 'config/setup.js',
    timeout: 15000,
}