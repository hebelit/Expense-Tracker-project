import Transaction from "../models/transaction.model.js"

const transactionResolver = {
    Query: {
        transactions: async (_,__,context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized")
                const userId = await context.getUser()._id

                const transactions = await Transaction.find({userId})
                return transactions
            } catch (error) {
                console.log("Error getting transactions: ", error)
                throw new Error("Error getting transactions")
            }
        },
        transaction: async (_,{transactionId},) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction
            } catch (error) {
                console.log("Error getting transaction: ", error)
                throw new Error("Error getting transaction")
            }
        }
    },
    Mutation: {
        createTransaction: async(parent,{input},context) => {
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId:context.getUser()._id
                })
                await newTransaction.save();
                return newTransaction
            } catch (error) {
                console.log("Error creating transactions: ", error)
                throw new Error("Error creating transactions")
            }
        },
        updateTransaction: async(parent,{input},context) => {
            try {
                const updateTransaction = await Transaction.findByIdAndUpdate(input.transactionId,input,{new:true})
                return updateTransaction;
            } catch (error) {
                console.log("Error updating transactions: ", error)
                throw new Error("Error updating transactions")
            }
        },
        deleteTransaction: async(parent,{transactionId},context) => {
            try {
                const deleteTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deleteTransaction
            } catch (error) {
                console.log("Error deleting transactions: ", error)
                throw new Error("Error deleting transactions")                
            }
        }
    },
};

export default transactionResolver;