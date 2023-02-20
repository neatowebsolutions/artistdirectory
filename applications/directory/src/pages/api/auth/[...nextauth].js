import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

function setHeaders(res, accessToken) {
  res.setHeader('Set-Cookie', [
    `access-token=${accessToken}; Max-Age=10 * 60 * 1000; Path=/;` // 10 minutes
    // `refresh-token=${data.refreshToken}; maxAge: 24 * 60 * 60 * 1000; httpOnly=true; sameSite=None; Secure`
  ]); // TODO:  Do we need this token in the cookies??
}

async function refreshAccessToken(tokenObject, res) {
  try {
    // Get a new access token
    const response = await fetch(
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

    if (response.status >= 400 && response.status < 500) {
      return {
        ...tokenObject,
        error: 'RefreshAccessTokenError'
      };
    }
    const data = await response.json();
    // add new accessToken to headers
    setHeaders(res, data.accessToken);

    return {
      ...tokenObject,
      accessToken: data.accessToken,
      accessTokenExpiry: data.accessTokenExpiry
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: 'RefreshAccessTokenError'
    };
  }
}

const nextAuthOptions = (req, res) => {
  return {
    site: process.env.NEXTAUTH_URL,
    debug: true,
    session: {
      jwt: true,
      strategy: 'jwt'
    },
    // jwt: {
    //   secret: process.env.JWT_SECRET,
    //   encryption: true
    // },
    // secret:, // If  NEXTAUTH_SECRET set as an environment variable, don't have to define this option.
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

            const response = await fetch(
              `${process.env.DIRECTORY_API_URL}/accounts`,
              {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { 'Content-Type': 'application/json' }
              }
            );

            const data = await response.json();
            // If no error and we have artist data and accessToken, return it
            if (response.ok && data) {
              setHeaders(res, data.accessToken);
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
          const { firstName, lastName, profileImageUrl, userId } = user;

          token.accessTokenExpiry = user.accessTokenExpiry;
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.user = { firstName, lastName, profileImageUrl, userId };
        }
        if (token.user) {
          // If accessTokenExpiry is 10 mins, we have to refresh token before 10 mins passes.
          const shouldRefreshTime =
            Math.round(token.accessTokenExpiry - 2 * 60 * 1000 - Date.now()) ||
            0;
          // If the token is still valid, just return it.
          if (shouldRefreshTime > 0) {
            return token;
          }

          // If the call arrives after 7minutes have passed, we allow to refresh the token.
          token = await refreshAccessToken(token, res);
          return token;
        }
        return token;
      },
      async session({ session, token, user }) {
        if (token) {
          session.user = token.user;
          session.accessToken = token.accessToken;
          session.accessTokenExpiry = token.accessTokenExpiry;
          session.error = token.error;
        }
        return session;
      }
    }
  };
};
export default (req, res) => NextAuth(req, res, nextAuthOptions(req, res));
