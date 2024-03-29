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
    const { id_social } = req.query as {id_social: string}
    switch(method){
        case('GET'):
            try {
                const connection = (await dbConnection(process.env.DATABASE_URL))
                    .collection('users');
                let users: UserInterface = await connection.findOne({id_social})
                return res.status(200).json({success: true, data: users})
            } catch (error) {
                return res.status(400).json({success: false})
            }
        break;

        case('PUT'):
            try {
                const { experience, currentExperience, challengesCompleted, level } = req.body
                const connection = (await dbConnection(process.env.DATABASE_URL))
                    .collection('users');
                await connection.updateOne({id_social},{
                    $set: {
                        experience,
                        currentExperience,
                        challengesCompleted,
                        level,
                        experienceUpdatedAt: (new Date())
                    }
                })
                let users: UserInterface = await connection.findOne({id_social})
                return res.status(201).json({success: true, data: users})
            } catch (error) {
                console.log('error: ', error)
                return res.status(400).json({success: false})
            }
        break;

        default:
            return res.status(400).json({success: false})
    }
}