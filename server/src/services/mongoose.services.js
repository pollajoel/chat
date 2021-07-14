import  mongoose  from "mongoose"
const uri="mongodb+srv://topiteck:so3TscJQ5qkGzilN@cluster0.evbnf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const dbConnect = ()=>{
   mongoose.connect(uri,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
    }).then(sucess=>{
        console.log('connexion sucess...')
    }).catch(err=>{
        console.log(err)
        process.exit(1)
    });

   

    

}