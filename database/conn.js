import mongoose from "mongoose";

mongoose.set('strictQuery', true)
async function connect() {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('Connection succesfully')
        return connection
    } catch (error) {
        console.log(error);
    }
}
export default connect;