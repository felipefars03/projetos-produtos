const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
// const flash = require('express-flash');
const FileStore = require('session-file-store')(session);
// const User = require = ('./models/User');
// const Tought = require('./models/Tought');
const conn = require('./db/conn');
const produtosRoutes = require('./routes/produtosRoutes')
// const toughtsRoutes = require('./controllers/ToughtsRoutes');
// const tougthController = require('.controllers/tougthController');
 const authRoutes = require('./routes/authRoutes');
// const handlebars = require('handlebars');
const app = express();

const Usuario = require('./models/Usuario')
const Produto = require('./models/Produto')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFN: function(){},
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie:{
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
    }
}));

// app.use(flash());
app.use((req, res, next) => {
    if(req.session.userid){
        res.locals.session = req.session;
    }
    next();
})

app.use('/', authRoutes)
app.use('/produtos', produtosRoutes)
app.use(express.static('public'))

conn.sync()
.then(()=>{
    app.listen(3000)
}) .catch((e)=>{
    console.log(e)
})