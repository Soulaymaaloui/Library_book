const mongoose=require('mongoose')
const bcrypt=require('bcrypt')





let schemaBook=mongoose.Schema({
    userName:String,
    email:String,
    password:String
  })
  

  var User= mongoose.model('user',schemaBook )
  var url='mongodb://127.0.0.1:27017/library'


  exports.registerModel=(name,email,password) => {
  
      // test email if exist (true go to login) (false add this user to users collection)
          return new Promise((resolve,reject)=>{
              mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
                      return User.findOne({email:email})
              }).then((user)=>{
                          if(user){
                              mongoose.disconnect()
                              reject('email is used')
                          }else{
                          return bcrypt.hash(password,10)
                          }
              }).then((hPassword)=>{
                   let user=new User({
                       name:name,
                       email:email,
                       password:hPassword
                   })
                  return user.save()
              }).then((user)=>{
                  mongoose.disconnect()
                  resolve('registered')
              }).catch((err)=>{
                  mongoose.disconnect()
                  reject(err)
          })
          })
      
        }


        exports.loginModel=(email,password)=>{
          return new Promise((resolve,reject)=>{
              mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      
                 return User.findOne({email:email})
      
              }).then((user)=>{
                  if(user){
                      bcrypt.compare(password,user.password).then((verif)=>{
                          if(verif){
                              mongoose.disconnect()
                              resolve(user._id)
      
                          }else{
                              mongoose.disconnect()
                              reject(' Password Wrong')
                          }
      
                      })
                  }else{
                      mongoose.disconnect()
                      reject("no user in our database")
      
                  }
      
              }).catch(()=>{
                  reject(err)
              })
          })
      
    
      }