import mongoose, { mongo } from 'mongoose'
import { config } from './config'

export default () => {
    const connect = () => {
        mongoose.connect(`${config.DATABASE_URL}`).then((result: any) => {
            console.log('Database successfully connected')

        }).catch((error: any) => {
            console.log('Error while connecting to the database:', error)
            return process.exit(1);
        })
    }

    connect();
    mongoose.connection.on('disconnect', connect)
}