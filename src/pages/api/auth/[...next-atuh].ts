import NextAuth, {
  DefaultSession,
  NextAuthOptions,
  SessionOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionProviderProps } from "next-auth/react";

// This helper function will allows us to get the domain name regardless of its form
// beta.example.com => example.com
// example.com/* => example.com
// localhost:3000 => localhost
const getDomainWithoutSubdomain = (url: string) => {
  const urlParts = new URL(url ?? "").hostname.split(".");

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

type Token = {
  user: UserData;
  accessToken: string;
  refreshToken: string;
};

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
};

type UserAuth = {
  user: UserData;
  access_token: string;
  refresh_token: string;
};

type Session = {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
    role?: string;
  };
};

const callbacks = {
  async jwt({ token, user }: { token: Token; user: UserAuth }) {
    // we store the user data and access token in the token
    if (user) {
      token.user = user.user;
      token.accessToken = user.access_token;
      token.refreshToken = user.refresh_token;
    }

    return token;
  },

  async session({ session, token }: { session: Session; token: Token }) {
    session.accessToken = token.accessToken;
    const { firstName, lastName, email } = token.user;
    session.user = {
      name: `${firstName} ${lastName}`,
      email: email,
      role: "admin",
    };
    session.refreshToken = token.refreshToken;
    return session;
  },
};

const options: NextAuthOptions = {
  debug: false, // if you want to debug
  //The secred that you use to hash your token
  secret: "123",
  //   secret: useSecureCookies,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      name: "credentials",
      id: "credentials",
      async authorize(credentials, req) {
        try {
          //   const userData = await axios.post(
          //   "https://localhost:8999",
          //     {
          //       email: credentials?.email,
          //       password: credentials?.password,
          //     },
          //     {
          //       headers: {
          //         accept: "*/*",
          //         "Content-Type": "application/json",
          //       },
          //     };
          //   );

          //   if (userData.status === 200) {
          //     return userData.data;
          //   }
          if (credentials?.password) return true;
          return null;
        } catch (e) {
          console.error(JSON.stringify(e));
          // Redirecting to the login page with error messsage in the URL
          throw new Error(e + "&email=" + credentials?.email);
        }
      },
    }),
  ],
  callbacks: callbacks,
  cookies,
  pages: {
    // set pages that tell nextauth where to redirect for an action
    signIn: "/signin",
    signOut: "/",
    error: "/signin",
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
export default Auth;
