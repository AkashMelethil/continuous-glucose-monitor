const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/Test'
const PORT = process.env.PORT || 4000

export {
    MONGO_URL,
    PORT
}