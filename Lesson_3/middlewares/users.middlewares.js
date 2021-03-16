const userServices = require("../services/users.services");

const statusCode = require('../constants/errorCodes.enum');
const messages = require('../errors/error.messages');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const {showAllUsers} = userServices;

            const userId = +req.params.userId;

            if (userId >= showAllUsers.length-1){
                throw new Error(messages.NON_EXISTENT_USER['en']);
            };

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)){
                throw new Error(messages.INCORRECTLY_SPECIFIED['en']);
            }

            next();
        }
        catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    checkIsNameValid: (req, res, next) => {
        try{
            const {name} = req.body;

            if(!name){
                throw new Error(messages.EMPTY_NAME['en']);
            }
            if(name.length < 5){
                throw new Error(messages.SHORT_NAME['en']);
            }
            next();
        }
        catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    checkIsPasswordValid: (req, res, next) => {
        try{
            const {password} = req.body;

            if(!password){
                throw new Error(messages.EMPTY_PASS['en']);
            }
            if(password.length < 6){
                throw new Error(messages.SHORT_PASS['en']);
            }
            next();
        }
        catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
    checkIsEmailValid: (req, res, next) => {
        try{
            const {email} = req.body;

            if(!email){
                throw new Error(messages.EMPTY_EMAIL['en']);
            };

            next();
        }
        catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
};
