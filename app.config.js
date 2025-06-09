import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    auth0Domain: process.env.AUTH0_DOMAIN,
    auth0ClientId: process.env.AUTH0_CLIENT_ID,
    auth0Audience: process.env.AUTH0_AUDIENCE,
  },
});
