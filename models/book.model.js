const mongoose=require('mongoose')





let schemaBook=mongoose.Schema({
  title:String,
  description:String,
  author:String,
  price:Number,
  image:String,
  userId:String
})

var Book = mongoose.model('book',schemaBook )
var url='mongodb://127.0.0.1:27017/library'

 exports.getThreeBooks=() => {
      return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return Book.find({}).limit(3)
  
      }).then(books=>{
        mongoose.disconnect()
        resolve(books)
      }).catch(err=>reject(err))
     })
    }


  exports.getAllBooks=()=>{
      return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return Book.find({})
  
      }).then(books=>{
        mongoose.disconnect()
        resolve(books)
      }).catch(err=>reject(err))
     })
    }

    exports.getOneBookDetails=(_id)=>{
      return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return Book.findById({_id})
  
      }).then(books=>{
        mongoose.disconnect()
        resolve(books)
      }).catch(err=>reject(err))
     })
    }


    exports.postDataBook=(title,description,author,price,image,userId)=>{
      return new Promise((resolve,reject)=>{
          mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  
              let book=new Book({
                  title:title,
                  description:description,
                  author:author,
                  price:price,
                  image:image,
                  userId:userId
              })
             return book.save()
            }).then(()=>{
              mongoose.disconnect()
              resolve('added ')
          }).catch((err)=>{
              mongoose.disconnect()
              reject(err)
          })
      })
    }





    exports.getmyBooks=(userId)=>{
      return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return Book.find({userId:userId})
 
      }).then(books=>{
        mongoose.disconnect()
        resolve(books)
       }).catch(err=>reject(err))
      })
  
   }
   exports.deletebook=(id)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Book.deleteOne({_id:id})
   
       }).then(books=>{
           mongoose.disconnect()
           resolve("deleted")
   
       }).catch(err=>reject(err))
    })
 }

 exports.getPageUpdateBookModel=(id)=>{
  return new Promise((resolve,reject)=>{
  
   mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
       return Book.findById(id)
 
     }).then(books=>{
         mongoose.disconnect()
         resolve(books)
 
     }).catch(err=>reject(err))
  })


}

exports.postUpdateBookModel=(bookId,title,description,author,price,filename,userId)=>{

  return new Promise((resolve,reject)=>{
      mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

       return Book.updateOne({_id:bookId},{title:title,description:description,author:author,image:filename,price:price,userId:userId})


      }).then(()=>{
          mongoose.disconnect()
          resolve('Updated!')
      }).catch((err)=>{
          mongoose.disconnect()
          reject(err)
      })
  })

} 