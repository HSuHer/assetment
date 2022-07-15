//Get references libraries
const  express = require("express");
const morgan = require("morgan");
const app = express();

//Define server and options
app.set('port',process.env.PORT || 3000);
app.set('json spaces',2)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Define base api route
app.use('/api/contacts',require('./routes/contacts'))

//Start server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
});