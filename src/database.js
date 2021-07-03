import { connect, connection } from "mongoose";


connect('db :p', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

connection.on('open', () => {
    console.log("Conectado a mongodb")
})
