const route=require('express').Router()
const AuthController=require('../controllers/auth.controller')
const body=require('express').urlencoded({extended:true})
const guardAuth=require('./guardAuth') 


route.get('/register',guardAuth.notAuth,AuthController.getRegisterPage)
route.post('/register',body,AuthController.postRegisterPage)

route.get('/login',guardAuth.notAuth,AuthController.getLoginPage)
route.post('/login',body,AuthController.postLogin)
 route.post('/logout',AuthController.logoutController)

module.exports=route