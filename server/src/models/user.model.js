import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = Schema({
    name:{type:String, required: true},
    password:{type:String, required:true},
    email:{type:String, required:true, unique:true, dropDups: true}
},{ timestamps: true });

export default mongoose.model('User',userSchema);