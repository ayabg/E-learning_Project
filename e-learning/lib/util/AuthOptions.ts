import { SignToken } from "@/lib/util/SIgnToken"
import { Account, Profile, Session, User } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./db"
import { Roles } from "@prisma/client"
import { JWT } from "next-auth/jwt"
import { compare } from "bcryptjs"

export interface CustomUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string; // Optional id field
    provider?: string; // Custom provider field
    role?: Roles
}

interface CustomSession extends Session {
    user?: CustomUser;  // Use the custom user type in the session
}
  

const AuthOptions = {
    pages:  {
        signIn: "/auth/sign-in"
    },
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({where: {email_provider: {email: credentials?.email as string, provider: "credentials"}}})
                if(!user){
                  throw new Error("L'utilisateur n'existe pas.");
                }
                const passwdMatch = await compare(credentials?.password as string, user.password as string )
                if(!passwdMatch){
                  throw new Error("Le mot de passe est incorrect.");
                }
                return {...user, id: user.id.toString()}
              }
        })
    ],
    callbacks: {
        async signIn({user, account, profile}: {user: User | AdapterUser, account: Account | null, profile?: Profile | undefined}){
            const FoundUser = await prisma.user.findFirst({where: {email: user?.email as string, provider: account?.provider as string}})
            if(FoundUser){
                return true
            }else{
                const newUser = await prisma.user.create({
                data: {
                    email: user.email as string,
                    provider: account?.provider,
                    name: user.name as string,
                    image: {
                        create: {
                            path: user.image as string,
                            location: "online"
                        }
                    }
                }
                })
                return true
            }
        },
        async jwt({token, user, account, profile, trigger, isNewUser}: {token: JWT, user: User | AdapterUser, account: Account | null, profile?: Profile | undefined, trigger?: "signIn" | "signUp" | "update" | undefined, isNewUser?: boolean}){
            if (account) {
              const FoundUser = await prisma.user.findFirst({where: {email: user?.email as string, provider: account?.provider as string}, select: {role: true, image: true}})
              const userLoggedIn = SignToken(user?.email as string)
              token.loggedUser = userLoggedIn
              token.provider = account.provider
              token.role = FoundUser?.role
              token.image = FoundUser?.image?.path
            }
            return token;
        },
        async session({session, token}: {session: CustomSession, token: JWT}){
        if(token){
            session.user = {...session.user, provider: token.provider as string, role: token.role as Roles, image: token.image as string}
        }
        return session
        }
    },
    secret: process.env.JWT_SECRET as string,
}

export default AuthOptions