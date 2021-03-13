import dbConnection from '../../../utils/dbConnection'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req
    switch(method){
        case('GET'):
            try {
                const connection = (await dbConnection(process.env.DATABASE_URL))
                let users = await connection.collection('users').find()
                let data = [];
                await users.forEach((user) => {
                    data.push(user)
                })
                return res.status(200).json({success: true, data})
            } catch (error) {
                return res.status(400).json({success: false})
            }
        break;

        default:
            return res.status(400).json({success: false})
    }
}