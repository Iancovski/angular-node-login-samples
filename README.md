# Angular/Node Social Login

This project consists of samples of **Google** and **Facebook** login methods using **Angular 17** and **Node 20**.

## Supported Login Methods

- Google
- Facebook `WIP`

## Quick Start

Both Google and Facebook login methods require additional configurations. Check the necessary configurations for each one:

### Google

1. Set up your OAuth configuration on Google Console. To do this, follow the steps described in the [Google Identity Documentation](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid?hl=pt-br).
   - *Obs: in the "Authorized JavaScript Sources", you must add "https://localhost:4200"*
3. Copy your client ID and paste it into **login.google.clientId** *(client/src/environments/environment.development.ts)* and **GOOGLE_CLIENT_ID** *(server/src/.env)*.

### Facebook

1. Create an application in Meta for Developers following the steps described in the [App Creation Documentation](https://developers.facebook.com/docs/development/create-an-app/facebook-login-use-case).
   - *Obs: in the permissions, you need to add "email" so that the API can fetch this information*
3. Copy your app ID and paste it into **login.facebook.appId** *(client/src/environments/environment.development.ts)* and **FACEBOOK_APP_ID** *(server/src/.env)*.

---

Now, run the project using the `start` script for both the client and server, and you should be able to try all the login methods yourself!

> If your browser blocks the website saying that your connection is not secure, don't worry. This happens because the Angular application runs with a test SSL certificate since facebook login requires HTTPS.
