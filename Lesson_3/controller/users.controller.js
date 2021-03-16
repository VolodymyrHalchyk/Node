const usersServices = require('../services/users.services');

const statusCode = require('../constants/errorCodes.enum');
const messages = require('../errors/error.messages');

module.exports = {
    getAllUsers: async (req,res) => {
        try{
            const users = await usersServices.showAllUsers();

            res.status(statusCode.OK).json(users);
        }
        catch (e){
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    authorizationUser: async (req,res) => {
        try{
            const {name, email, password} = req.body;
            const authUser = {name, email, password};

            await usersServices.createUser(authUser);

            res.status(statusCode.CREATED).json(messages.SUCCESS_CREATED['en']);
            
        }
        catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    getChosenUser: async (req,res) => {
        try{
            const {userId} = req.params;
            const chosenUser = await usersServices.userById(userId);

            res.status(statusCode.OK).json(chosenUser);
        }
        catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    deleteChosenUser: async (req,res) => {
        try{
            const {userId} = req.params;
            const deleteUser = await usersServices.deleteUser(userId);

            res.status(statusCode.OK).json(messages.SUCCESS_DELETED['en']);
        }
        catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
};
