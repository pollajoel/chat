import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = Schema({

    contain: { type: String },
    user : {type: mongoose.Schema.Types.ObjectId, ref:"User"}
    
},{ timestamps: true });

export default mongoose.model('Message', messageSchema);