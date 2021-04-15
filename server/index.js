const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { mongoose } = require('./database');
const bodyParser = require('body-parser');
const app = express();

app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Settings
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});
// app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

//Middlewares
app.use(morgan('dev')); 
app.use(express.json());
app.use(cors({origin: 'http://localhost:8100'}));

//Routes

//app.use('/api/users',require('./routes/users.routes'));
app.use('/api/productos',require('./routes/productos.routes'));
app.use('/api/recetas',require('./routes/recetas.routes'));
app.use('/api/usuarios',require('./routes/usuarios.routes'));
app.use('/api/login',require('./routes/login.routes'));

//Starting the server
app.listen(app.get('port'), ()=>{
    console.log("Server on port "+app.get('port'));
});
