const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const errorCodes = require('../constants/errorCodes.enum')

const dataBasePath = path.join(process.cwd(), 'dataBase', 'users.json');

const readPromisify = promisify(fs.readFile);
const writePromisify = promisify(fs.writeFile);

module.exports = {
    showAllUsers: async (req,res) => {
        try{
            const dataBaseQuery = await readPromisify(dataBasePath);
            const dataBase =  JSON.parse(dataBaseQuery.toString());

            return dataBase;
        }
        catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    createUser: async (user,res) => {
        try{
            const dataBaseQuery = await readPromisify(dataBasePath);
            const dataBase = JSON.parse(dataBaseQuery.toString());

            dataBase.push(user);

            await writePromisify(dataBasePath, JSON.stringify(dataBase));
        }
        catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    userById: async (userId,res) => {
        try{
            const dataBaseQuery = await readPromisify(dataBasePath);
            const dataBase = JSON.parse(dataBaseQuery.toString());

            const user = dataBase[userId];

            return user;
        }
        catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    deleteUser: async (userId,res) => {
        try{
            const dataBaseQuery = await readPromisify(dataBasePath);
            const dataBase = JSON.parse(dataBaseQuery.toString());

            dataBase.splice(userId,1);

            await writePromisify(dataBasePath, JSON.stringify(dataBase));
        }
        catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
}
