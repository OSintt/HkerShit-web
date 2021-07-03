import { connect, connection } from "mongoose";


connect('mongodb+srv://admin:9AWG9sUrvbxgcI7J@cluster0.jzlzp.mongodb.net/hacker-api?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

connection.on('open', () => {
    console.log("Conectado a mongodb")
})