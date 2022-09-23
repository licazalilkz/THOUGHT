//importando biblio
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const Filestore = require('session-file-store')(session)
const flash = require('express-flash')
//-----------------------------------------------------------------------------
//iniciando express
const app = express() 
//-----------------------------------------------------------------------------
//importando conexao
const conn = require('./db/conn')
//-----------------------------------------------------------------------------
//template engine
app.engine('handlebars', exphbs.engine())
app.set('View engine','handlebars')
//-----------------------------------------------------------------------------
//receber respostas
app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())
//-----------------------------------------------------------------------------
//sessions e middlewares
app.use(
    session({
        name:"session",
        secret:"nosso_secret",
        resave:false,
        saveUninitialized:false,
        store: new Filestore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(),'sessions'),
        }),
        cookie:{
            secure: false,
            maxAge:360000,
            expires: new Date(Date.now()+360000),
            httpOnly: true
        }
    }),
)
//-----------------------------------------------------------------------------
//flash messages
app.use(flash())
//-----------------------------------------------------------------------------
//public path
app.use(express.static('public'))

//-----------------------------------------------------------------------------
//set session to res
app.use((req, res, next) => {
    if(req.session.id){
        res.locals.session = req.session
    }
    next();
})

//-----------------------------------------------------------------------------
//chamando conexao
conn
    .sync()
    .then(()=>{
        app.listen(3000)
    })
    .catch((err)=>console.log(err))