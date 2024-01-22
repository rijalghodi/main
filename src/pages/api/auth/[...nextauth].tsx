import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Cookies from "js-cookie";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const authOptions: AuthOptions = {
  // session: {
  //   strategy: "jwt",
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const credentialDetails = {
          email: credentials?.email,
          password: credentials?.password,
        };

        // const resp = await fetch(backendURL + "/auth/login", {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(credentialDetails),
        // });
        // const user = await resp.json();
        if (credentials?.email && credentials.password) {
          return { id: "123", ...credentials };
        } else {
          console.log("check your credentials");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      Cookies.set("accessToken", token?.accessToken as string);

      if (user) {
        token.email = "main@gmail.com";
        token.accessToken = "this_is_token_1234";
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        // session.user.email = token.email;
        // session.user.username = token.userName;
        // session.user.accessToken = token.accessToken;
        session.user = token;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
