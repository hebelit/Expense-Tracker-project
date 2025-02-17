import User from "../models/user.model.js"

const userResolver = {
    Query:{
        authUser: async(_,__,context) =>{
            try {
                const user = await context.getUser()
                return user;
            } catch(err) {
                console.log("Error in authuser: ",err);
                throw new Error("Internal server error")
            }
        },
        user: async(_,{userId}) =>{
            try {
                const user = await User.findById(userId);
                return user;
            } catch (err) {
                console.log("Error in user query: ",err);
                throw new Error(err.message || "Error getting User")
            }
        }
    },
    Mutation:{
        signUp: async(_,{input},context) =>{
            try {
                const {username,name,password,gender} = input;
                if(!username || !name || !password || !gender){
                    throw new Error("Please fill all the fields")
                }

                const existingUser = await User.findOne({username});
                if (existingUser){
                    throw new Error("User already Exists");
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password,salt);

                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

                const newUser = new User({
                    username,
                    name,
                    password:hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic:girlProfilePic
                })

                await newUser.save();
                await context.login(newUser)

                return newUser

            } catch(err){
                console.log("Error in signup: ",err);
                throw new Error(err.message || "Internal server error")

            }
        },
        login: async(_,{input},context) =>{
            try{
                const {username,password} = input;
                const {user} = await context.authenticate("graphql-local",{username,password})

                await context.login(user)
                return user
            }
            catch (err) {
                console.log("Error in login: ",err);
                throw new Error(err.message || "Internal server error")
            }
        },
        logout: async(_,__,context) => {
            try{
                await context.logout()
                req.session.destroy((err)=>{
                    if (err) throw err;
                })
                res.clearCookie("connect.sid")

                return {message: "Logged out successfully"}
            }
            catch (err){
                console.log("Error in logout: ",err);
                throw new Error(err.message || "Internal server error")

            }
        }

    }
}

export default userResolver