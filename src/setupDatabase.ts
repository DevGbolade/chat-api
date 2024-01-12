import mongoose from 'mongoose';
import { config } from './config';
import Logger from 'bunyan';
const log: Logger = config.createLogger('setupDatabase');
export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('Database successfully connected');
      })
      .catch((error: Error) => {
        log.error('Error while connecting to the database:', error);
        return process.exit(1);
      });
  };

  connect();
  mongoose.connection.on('disconnect', connect);
};
