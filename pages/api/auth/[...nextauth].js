import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async session({ session, token }) {
      const nameModified = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      const userToken = token.sub;
      session.user.uid = userToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
