const express=require('express')
const path =require('path')
const RouterHome=require('./routers/home.router')
const RouterBook=require('./routers/book.router')
const RouterAuth=require('./routers/auth.route')
const RouterMybooks=require('./routers/mybooks.route')
const RouterContact=require('./routers/contact.route')
const RouterAbout=require('./routers/about.route')
const session=require('express-session')
const MongoDbStore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')



const app=express()
app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')

var Store=new MongoDbStore({
    uri: 'mongodb://127.0.0.1:27017/library',
    collection:'sessions'
  }) 
  app.use(flash())
  app.use(session({
      secret:'this is my secret key hello',
      store:Store,
      resave: true,
      saveUninitialized: true 
  }))
  

app.use('/',RouterHome)
app.use('/books',RouterBook)
app.use('/',RouterAuth)
app.use('/mybooks',RouterMybooks)
app.use('/', RouterContact)
app.use('/', RouterAbout)

app.get('/dashboard',(req,res,next)=>{
  res.render('dashboard')
})

app.get('/tables',(req,res,next)=>{
  res.render('tables')
})

app.listen(3000,()=>console.log('server run in port 3000'))