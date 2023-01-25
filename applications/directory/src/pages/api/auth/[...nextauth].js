import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
    jwt: {
      secret: process.env.JWT_SECRET,
      encryption: true
    },
    // secret:, // If you set NEXTAUTH_SECRET as an environment variable, you don't have to define this option.
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

            console.log(credentials);
            const response = await fetch(
              `${process.env.DIRECTORY_API_URL}/accounts`,
              {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { 'Content-Type': 'application/json' }
              }
            );

            console.log('================COOKIES=======');

            console.log(response.headers);
            const artist = await response.json();
            // console.log(artist);
            // If no error and we have artist data, return it

            if (response.ok && artist) {
              return artist;
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
    //secret: process.env.JWT_SECRET, // if you set NEXTAUTH_SECRET as an environment variable, you don't have to define this option.
    pages: {
      createAccount: '/auth/create-account',
      logIn: '/auth/login'
    },
    callbacks: {
      async jwt({ token, user, account }) {
        console.log(token);
        console.log('======account======');
        // console.log(account);
        console.log('======user======');
        //console.log(user);
        if (account && user) {
          const { firstName, lastName, profileImageUrl, _id } = user;
          return {
            ...token,
            // accessToken: user.data?.token,
            // refreshToken: user.data?.refreshToken,
            user: { firstName, lastName, profileImageUrl, _id }
          };
        }
        return token;
      },
      async session({ session, token, user }) {
        if (token) {
          session.user = token.user;
          // session.user.accessToken = token.accessToken;
          // session.user.refreshToken = token.refreshToken;
          // session.user.accessTokenExpires = token.accessTokenExpires;
        }

        return session;
      }
    }
  };
};
export default (req, res) => NextAuth(req, res, nextAuthOptions(req, res));
// ?? - https://stackoverflow.com/questions/67594977/how-to-send-httponly-cookies-client-side-when-using-next-auth-credentials-provid/69418553#69418553
