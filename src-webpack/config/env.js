const dotEnv = () => {
    let variables = {};

    if (window.location.hostname != 'localhost') {
        variables.HOST = 'https://tempy.codezune.com'
    } else {
        variables.HOST = 'http://localhost:3000'
    }

    return variables;
}

const exportReady = dotEnv();

module.exports = exportReady