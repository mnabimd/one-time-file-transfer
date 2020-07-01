const dotEnv = () => {
    let variables = {};

    if (window.location.hostname != 'localhost') {
        variables.HOST = 'https://codezune-tempy.herokuapp.com/'
    } else {
        variables.HOST = 'http://localhost:3000'
    }

    return variables;
}

const exportReady = dotEnv();

module.exports = exportReady