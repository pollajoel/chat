import { ValidationError } from "apollo-server-express";
import channelModel from "../../models/channel.model"
const  ObjectId = require('mongoose').Types.ObjectId;
 
export default {
    Query:{

        channels: async() => {
			const val = await channelModel.find({}).populate("user").populate("message");
			console.log( val );
            return channelModel.find({}).populate("user").populate("message");
        },
        channel: (parent, args) => {
            const id = args.id;
            return channelModel.findById(id).populate("user").populate("message");
        }
    },

    Mutation: {
		
		
		
        createChannel: (_, args) => {
			
            const channelNew = new channelModel({
                 name: args.name,
				 user: args.userid
             });
            return channelNew.save();
        },
		
		
		deleteChannel: async(_, args) => {
			const channelId =  args.channelid;
			try{
				const data =  await channelModel.deleteOne({_id:channelId});
				return data
			}catch(error){
				
			}
		},

        sendMessage: async(_, args) => {
            const MessageTosend = args.messagetos; // id of message
            const idchannel = args.channelid; // id of channel

            try{
                const channel = await channelModel.findById(idchannel);
                await channel.message.push(MessageTosend);
                const savedchannel = await channel.save();
                return savedchannel;

            }catch(err){
                    throw new Error(err);
            }


        }
    }
}