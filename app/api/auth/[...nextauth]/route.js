import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { dbConnection } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // to execute the callbacks we should pass all the callbacks inside the callbacks object the comes under the next auth
  //then only the database connection call will be called
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await dbConnection();
        const userExists = await User.findOne({
          email: profile.email,
        });
        if (!userExists) {
          await User.create({
            email: profile.email,
            //this replace is for replacing spaced names to no spaced names
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("err in signIn", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
