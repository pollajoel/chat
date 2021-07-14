import  mongoose  from "mongoose";
const Schema = mongoose.Schema;
const channelSchema = Schema({
    name: {type:String, require:true, unique:true},
    user:{type: mongoose.Schema.Types.ObjectId, ref:"User", require:true},
    message:[{type: mongoose.Schema.Types.ObjectId, ref:"Message"}],
	users:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}]
},{ timestamps: true });


export default mongoose.model('Channel',channelSchema);
