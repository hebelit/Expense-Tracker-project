const userTypeDef = `#graphql

type User {
    _id:ID!
    username:String!
    name:String!
    password:String!
    profilePicture:String!
    gender:String!
}

type Query {
    authUser:User
    user(userID:ID!):User
}

type Mutation {
    signUp(input: SignUpInput!): User
    login(input: LogInInput!): User
    logout: LogoutResponse
}

input SignUpInput{
    name:String!
    username:String!
    password:String!
    gender:String!
}

input LogInInput{
    username:String!
    password:String!
}

type LogoutResponse{
    message:String!
}

`

export default userTypeDef