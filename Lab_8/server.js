const express = require('express')
const app = express()
const portNumber = 8080
// Code here for how to set 'public' as the static folder for express
app.use(express.static("public"))
// Code here to have the app listen on port 8080....please provide a console.log message
app.listen(port, () => {
    console.log("Listening with port 8080...")
})