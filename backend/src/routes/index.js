const express = require("express");
const Router = express.Router();
Router.use(express.json());

const PostsRouter = require("./posts");

const DashboardRouter = require("./dashboard");

const ExploreRouter = require("./explore");

const AdminProtection = require("../middleware/admin");

const AdminRouter = require("./admin");

const SearchRouter = require("./search");

const ChatRouter = require("./chats");


const NotificationRouter = require("./notifications");

//protection routes :
const AuthMiddleWare = require("../middleware/auth");

//for user login and register api:
const AuthRouter = require("./auth");
// All auth related routes are assigned to the auth folder:
Router.use("/auth" , AuthRouter);

//for posts api :
Router.use("/post" , AuthMiddleWare , PostsRouter);


//for dashboard api :
Router.use("/dashboard" , AuthMiddleWare , DashboardRouter);

//for explore api:
Router.use("/explore" , AuthMiddleWare , ExploreRouter );

//for adming premision : 
Router.use("/admin" , AuthMiddleWare , AdminProtection , AdminRouter);

//for searching  : 
Router.use("/search" , AuthMiddleWare , SearchRouter);

//for notification : 
Router.use("/notification" , AuthMiddleWare , NotificationRouter);


//for chats api :
Router.use("/chat" , AuthMiddleWare  ,ChatRouter );

module.exports = Router;