const environment = {
    production: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID
    }
};

export default environment;