import NextAuth, {
  Awaitable,
  DefaultSession,
  NextAuthOptions,
  Session,
  SessionOptions,
  User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionProviderProps } from "next-auth/react";
import { JWT } from "next-auth/jwt";

// This helper function will allows us to get the domain name regardless of its form
// beta.example.com => example.com
// example.com/* => example.com
// localhost:3000 => localhost
const getDomainWithoutSubdomain = (url: string) => {
  const urlParts = new URL(url ?? "https://localhost:2000").hostname.split(".");

  return urlParts
    .slice(0)
    .slice(-(urlParts.length === 4 ? 3 : 2))
    .join(".");
};

const useSecureCookies =
  process.env.NEXTAUTH_URL?.startsWith("https://") ?? false;
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = getDomainWithoutSubdomain(process.env.NEXTAUTH_URL as string);

// Define how we want the session token to be stored in our browser
const cookies = {
  sessionToken: {
    name: `${cookiePrefix}next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: useSecureCookies,
      domain: hostName == "localhost" ? hostName : "." + hostName, // add a . in front so that subdomains are included
    },
  },
};

const options: NextAuthOptions = {
  debug: false, // if you want to debug
  //The secred that you use to hash your token
  secret: "123",
  //   secret: useSecureCookies,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      name: "credentials",
      id: "credentials",
      async authorize(credentials): Promise<any> {
        try {
          console.log("credential", credentials);
          if (credentials?.password) return { id: "123", ...credentials };
          throw new Error("salah password");
        } catch (e) {
          console.error(JSON.stringify(e));
          // Redirecting to the login page with error messsage in the URL
          throw new Error(e + "&email=" + credentials?.email);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }): Promise<any> {
      // we store the user data and access token in the token
      if (user) {
        return {
          ...token,
          ...user,
        };
        // token.user = user.user;
        // token.accessToken = user.access_token;
        // token.refreshToken = user.refresh_token;
      }

      // return "Hello";
      return null;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      session.user = { ...token, ...user };
      return session;
    },
    // redirect
  },
  cookies,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    // set pages that tell nextauth where to redirect for an action
    signIn: "/",
    // signOut: "/dashboard",
    // error: "/",
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
export default Auth;
