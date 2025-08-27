const {notificationModel , userModel} = require("../../models")

class Notifications{
    getNotifications = async(req , res)=>{
        try{
            const notifications = await notificationModel.find({userId : req.user.toString()});
            if(!notifications || notifications.length === 0){
                return res.status(200).json({message : "no notifications yet." , data : [] , error : true});
            }
            res.status(200).json({message : 'ok' , data : notifications, error : false});
        }
        catch(e){
            console.log("error in getNotificaiton api :" , e );
            res.status(500).json({message : "Internal server error." , data : null , error : true});
        }
    }
    sendNotification = async(req , res)=>{
        try{
            const {from , to , message , type  } = req.body;
            const checkTheFirstUser = await userModel.findOne({email : from});
            const checkTheNextUser = await userModel.findOne({email : to});
            if(!checkTheFirstUser || !checkTheNextUser){
                return res.status(404).json({message : "user not found." , error : "please login again" , data : null});
            };
            if(checkTheFirstUser.email == checkTheNextUser.email){
                return res.status(200).json({message : "the message has spent to user." , data : {} , error : false});
            };
            const newNotification = await notificationModel.create({
                from  : checkTheFirstUser.email ,
                to : checkTheNextUser.email ,
                userId : checkTheNextUser._id ,
                username : checkTheFirstUser.name ,
                avatar : checkTheFirstUser.profile ,
                message : message  ,
                type : type 
            });
            res.status(200).json({message : "the message has spent to user." , data : {} , error : false});
        }
        catch(e){
            console.log("error in the sendNotification api : " ,  e);
            res.status(500).json({message : "Internal server send notification error  !. " , error : true , data : null});s
        }
    }
}

module.exports = new Notifications;