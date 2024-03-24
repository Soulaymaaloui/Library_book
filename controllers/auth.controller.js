const authModel=require('../models/auth.model')


exports.getRegisterPage=(req,res,next) => {
    res.render('register',{v_User:req.session.userId,messErr:req.flash('error')[0]}) 
}


exports.postRegisterPage=(req,res,next) => {
   authModel.registerModel(req.body.name,req.body.email,req.body.password).then((user)=>{
    res.redirect('login')
    }).catch((err)=>{
        //console.log(err)
         req.flash('error',err)
         res.redirect('/register')
    })
  
}

exports.getLoginPage=(req,res,next)=>{

    res.render('login',{v_User:req.session.userId,messErr:req.flash('error')[0]}) 

}

exports.postLogin=(req,res,next)=>{

    authModel.loginModel(req.body.email,req.body.password).then((id)=>{
        
        req.session.userId=id
        res.redirect('/')
    }).catch((err)=>{
       // console.log(err)
       req.flash('error',err)
       res.redirect('/login')
    })
  
}

exports.logoutController=(req,res,next)=>{
    req.session.destroy(()=>{
    res.redirect('/login')
    })
}