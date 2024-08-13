import {users} from "../dummyData/data.js"

const userResolver = {
    Query:{
        users:() => {
            return users
        },
        user:(_,{userID}) => {
            return users.find((user)=>user._id === userID)
        } 
    },
    Mutation:{}
}

export default userResolver