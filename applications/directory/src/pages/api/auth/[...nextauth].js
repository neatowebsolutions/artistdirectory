import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';

async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await fetch(
      `${process.env.DIRECTORY_API_URL}/auth/refresh`,
      {
        method: 'POST',
        body: JSON.stringify({ token: tokenObject.refreshToken }),
        headers: {
          Authorization: `Bearer ${tokenObject.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await tokenResponse.json();
    console.log('====FROM REFRESH TOKEN FUNCTION=======');
    console.log(data);

    return {
      ...tokenObject,
      accessToken: data.accessToken,
      accessTokenExpiry: data.accessTokenExpiry, // TODO - need to assign this somewhere
      refreshToken: data.refreshToken
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: 'RefreshAccessTokenError'
    };
  }
}

// https://blog.devso.io/implementing-credentials-provider-on-nextjs-and-nextauth
const nextAuthOptions = (req, res) => {
  return {
    site: process.env.NEXTAUTH_URL,
    debug: true,
    // !!!https://next-auth.js.org/getting-started/upgrade-v4#callbacks
    session: {
      jwt: true,
      strategy: 'jwt'
    },
    // jwt: {
    //   secret: process.env.JWT_SECRET,
    //   encryption: true
    // },
    // secret:, // If you set NEXTAUTH_SECRET as an environment variable, you don't have to define this option.
    pages: {
      createAccount: '/auth/create-account',
      logIn: '/auth/login'
    },
    providers: [
      CredentialsProvider({
        id: 'credentials',
        name: 'Artist-local-auth',
        type: 'credentials',
        // args - second argument is 'req'
        async authorize(credentials) {
          try {
            // Provide logic that takes the credentials submitted and returns either an object representing an artist or value that is false/null if the credentials are invalid.

            // It is possible use the `req` object to obtain additional parameters (i.e., the request IP address)
            // TODO - checkout  https://stackoverflow.com/questions/70174989/next-auth-custom-auth-provider-with-custom-backend , https://medium.com/vmlyrpoland-tech/nextjs-with-full-stack-authorization-based-on-jwt-and-external-api-e9977f9fdd5e, https://github.com/nextauthjs/next-auth/issues/3719, https://stackoverflow.com/questions/67594977/how-to-send-httponly-cookies-client-side-when-using-next-auth-credentials-provid/69418553#69418553, https://stackoverflow.com/questions/61255258/migrating-expressjs-app-to-serverless-express-session-problem, https://github.com/nextauthjs/next-auth/discussions/1290

            const response = await fetch(
              `${process.env.DIRECTORY_API_URL}/accounts`,
              {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { 'Content-Type': 'application/json' }
              }
            );

            const data = await response.json();
            console.log('================DATA =======');
            console.log(data);
            // If no error and we have artist data, return it
            if (response.ok && data) {
              //  about Cookies https://www.webmound.com/cookies-nodejs-express-server/
              // TODO - cookies disapear on page refresh, need to fix
              res.setHeader('Set-Cookie', [
                `access-token=${data.accessToken};`,
                `refresh-token=${data.refreshToken}; httpOnly=true; sameSite=None; Secure`
              ]); // ?? maxAge: 24 * 60 * 60 * 1000

              return data;
            }
          } catch (error) {
            const errorMessage = error.response.data.message;
            // creates error message to display on auth page
            throw new Error(errorMessage);
          }
          return null;
        }
      })
    ],
    callbacks: {
      async jwt({ token, user, account }) {
        if (user) {
          //  console.log('==========JWT USER==========');
          // console.log(user);
          const { firstName, lastName, profileImageUrl, userId } = user;

          token.accessTokenExpiry = user.accessTokenExpiry;
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.user = { firstName, lastName, profileImageUrl, userId };
        }

        console.log('===accessTOkenExpiry=======');

        // If accessTokenExpiry is 10 mins, we have to refresh token before 10 mins pass.
        const shouldRefreshTime = Math.round(
          token.accessTokenExpiry - 3 * 60 * 1000 - Date.now()
        );
        console.log('===SHOULD REFRESH TIME=======');
        console.log(shouldRefreshTime);
        // If the token is still valid, just return it.
        if (shouldRefreshTime > 0) {
          return token;
        }

        // If the call arrives after 7minutes have passed, we allow to refresh the token.
        token = await refreshAccessToken(token);

        console.log('==========JWT TOKEN RETURNED==========');
        console.log(token);
        return token;
      },
      async session({ session, token, user }) {
        console.log('==========TOKEN SESSION==========');
        console.log(token);
        // console.log('======session======');
        // console.log(session);
        // console.log('======user======');
        // console.log(user);
        if (token) {
          session.user = token.user;
          //session.accessToken = token.accessToken;
          session.user.accessToken = token.accessToken;
          // session.user.refreshToken = token.refreshToken;
          session.user.accessTokenExpiry = token.accessTokenExpiry;
        }
        console.log('====SESSION======');
        console.log(session);
        return session;
      }
    }
  };
};
export default (req, res) => NextAuth(req, res, nextAuthOptions(req, res));
// ?? - https://stackoverflow.com/questions/67594977/how-to-send-httponly-cookies-client-side-when-using-next-auth-credentials-provid/69418553#69418553
