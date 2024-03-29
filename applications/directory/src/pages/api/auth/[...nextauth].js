import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// https://blog.devso.io/implementing-credentials-provider-on-nextjs-and-nextauth
const options = {
  debug: true,
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Artist-local-auth',
      type: 'credentials',
      async authorize(credentials, req) {
        try {
          // Provide logic that takes the credentials submitted and returns either an object representing an artist or value that is false/null if the credentials are invalid.

          // It is possible use the `req` object to obtain additional parameters (i.e., the request IP address)
          const res = await fetch(`${process.env.DIRECTORY_API_URL}/accounts`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
          });
          const artist = await res.json();
          // console.log(artist);
          // If no error and we have artist data, return it
          if (res.ok && artist) {
            return artist;
          }
        } catch (error) {
          const errorMessage = error.response.data.message;
          // creates error message to display on auth page
          throw new Error(errorMessage);
        }
      }
    })
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    createAccount: '/auth/create-account',
    logIn: '/auth/login'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const { firstName, lastName, profileImageUrl, _id } = user;
        return {
          ...token,
          accessToken: user.data?.token,
          refreshToken: user.data?.refreshToken,
          user: { firstName, lastName, profileImageUrl, _id }
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user = token.user;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.accessTokenExpires = token.accessTokenExpires;
      }

      return session;
    }
  }
};
export default (req, res) => NextAuth(req, res, options);
