# Angular/Node Login Samples

This project consists of samples of **traditional**, **Google** and **Facebook** login methods using **Angular 17** and **Node 20**.

## Supported Login Methods

- Traditional (username and password)
- Google
- Facebook

## Quick Start

Some login methods may require additional configurations. Check the necessary configurations for each one:

### Google

1. Set up your OAuth configuration on Google Console. To do this, follow the steps described in the [Google Identity Documentation](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid?hl=pt-br).
2. Copy your client ID and paste it into **google.clientId** *(client/src/environments/environment.ts)* and **GOOGLE_CLIENT_ID** *(server/src/.env)*.

### Facebook

- WIP

---

Now, run the project using the start script for both the client and server, and you should be able to try all the login methods yourself!
