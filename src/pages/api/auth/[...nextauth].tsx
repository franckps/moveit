import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { InitOptions } from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks: {
        session: async (session, user) => {
            if (session?.user) {
                session.user['id'] = user['id'];
            }
            return session;
        },
    },
    database: process.env.DATABASE_URL
} as InitOptions

export default (req: NextApiRequest, resp: NextApiResponse): Promise<void> => NextAuth(req, resp, options)