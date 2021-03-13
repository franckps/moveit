import dbConnection from '../../../utils/dbConnection'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req
    const { name } = req.query as {name: string}
    switch(method){
        case('GET'):
            try {
                const connection = (await dbConnection(process.env.DATABASE_URL))
                    .collection('users');
                let users = await connection.findOne({name})
                return res.status(200).json({success: true, data: users})
            } catch (error) {
                return res.status(400).json({success: false})
            }
        break;

        case('PUT'):
            try {
                const { currentExperience, challengesCompleted, level } = req.body
                const connection = (await dbConnection(process.env.DATABASE_URL))
                    .collection('users');
                await connection.updateOne({name},{
                    $set: {
                        currentExperience,
                        challengesCompleted,
                        level
                    }
                })
                let users = await connection.findOne({name})
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