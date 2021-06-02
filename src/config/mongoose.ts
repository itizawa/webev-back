export const mongooseConfig = [
  {
    id: 'default',
    url: process.env.MONGO_URI || 'mongodb://mongo:27017/test',
    connectionOptions: { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true },
  },
];
