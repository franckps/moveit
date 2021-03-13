import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    database: process.env.DATABASE_URL,
}

export default (req: NextApiRequest, resp: NextApiResponse): Promise<void> => NextAuth(req, resp, options)