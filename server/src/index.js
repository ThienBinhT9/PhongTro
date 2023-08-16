const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./Router')
const db = require('./Utils/dbMongoose')

const app = express()


app.use(cors())

//Connect to DB
db.connect()

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({
    limit:'50mb',
    extended:true,
    parameterLimit:50000
}))
app.use(cookieParser())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true, limit:'50mb'}))

app.use(helmet())

//Router
router(app)


app.listen(8000, () => {
    console.log('Server is running...');
})