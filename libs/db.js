import mongoose from 'mongoose';

// eslint-disable-next-line no-import-assign
let isConnected;

export const connectToDatabase = async () => {
  if (isConnected) {
    return isConnected;
  }
  const { connections } = await mongoose.connect(process.env.DB);
  isConnected = connections[0].readyState;
  return isConnected;
};
