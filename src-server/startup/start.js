const startupParams = (envirPORT) => {
    let params; 
    // If there are no Envirnoment Process [PORT]
    if (!envirPORT) {
        params = [() => {console.log('App Started with no PORT')}];
    } else {
        params = [envirPORT, () => {console.log('App started on PORT ' + envirPORT)}];
    };

    return params
}

module.exports = startupParams