const environment = {
    production: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    google: {
        clientId: '352111847351-q974jpoc2nsvg9d7phnipir4olnnijib.apps.googleusercontent.com'
    }
};

export default environment;