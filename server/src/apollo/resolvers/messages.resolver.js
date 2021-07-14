import messageModel from "../../models/message.model"
export default {
    Query:{
        messages: () => {
            return messageModel.find({}).populate("user");
        },
        message: (parent, args) => {
            const id = args.id;
            return messageModel.findById(id).populate("user");
        }
    },
    Mutation: {
        createMessage: (_, args)=> {
			
            const messageTosend = new messageModel({
                contain: args.contain,
                user: args.userid
            });

            return messageTosend.save();

        },
		deleteMessage: async(_, args) => {
			const msgId =  args.msgId;
			try{
				const data =  await messageModel.deleteOne({_id:msgId});
				return data
			}catch(error){
				
			}
		}
    }
}