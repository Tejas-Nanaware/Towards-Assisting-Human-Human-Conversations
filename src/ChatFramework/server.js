const path = require('path');
global.rootDir = path.resolve(__dirname);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');


app.use('/css', express.static(path.join(rootDir, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(rootDir, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(rootDir, 'node_modules/jquery/dist')));
app.use('/static', express.static(path.join(rootDir, 'public/static')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ 
    secret: 'Illinois Tech', 
    saveUninitialized: false,
    cookie: { 
        maxAge: 60*60*12
    }
}));

app.use(require('./routes/routes'));

const server = require('http').Server(app);
const PORT = 3000

// Connect the database
const sequelize = require('./sequelize');
const assertDatabaseConnectionOk = async () => {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch(error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

const init = async () => {
    try {
        await assertDatabaseConnectionOk();
    } catch(error) {
        console.log('Unable to connect');
    }
    console.log(`Starting Sequelize + Express example on port ${PORT}...`);    
    app.listen(PORT, () => {
        console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/users'.`);
    });
}
init();