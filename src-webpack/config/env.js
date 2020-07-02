const dotEnv = () => {
    let variables = {};

    if (window.location.hostname != 'localhost') {
        variables.HOST = `https://${window.location.hostname}`;
    } else {
        variables.HOST = 'http://localhost:3000'
    }

    return variables;
}

const exportReady = dotEnv();

module.exports = exportReady