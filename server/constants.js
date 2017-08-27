const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/Test'
const PORT = process.env.PORT || 4000
const NS_BASE_URL = `https://glucose-monitor-makeathon.herokuapp.com/`
const NS_API_SECRET = 'hellodarknessmyoldfriend'

export {
    MONGO_URL,
    PORT,
    NS_BASE_URL,
    NS_API_SECRET
}