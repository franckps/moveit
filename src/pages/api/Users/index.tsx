import dbConnection from '../../../utils/dbConnection'
import { NextApiRequest, NextApiResponse } from 'next'

interface UserInterface {
    _id: string,
    name: string,
    id_social: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    challengesCompleted: number,
    currentExperience: number,
    level: number,
    experience: number,
    experienceUpdatedAt: string,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req
    switch(method){
        case('GET'):
            try {
                const connection = (await dbConnection(process.env.DATABASE_URL))
                let users = await connection.collection('users').find().sort({ 
                    experience: -1, experienceUpdatedAt: 1, updatedAt: 1
                })
                let data = [];
                await users.forEach((user: UserInterface) => {
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