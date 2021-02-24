const fs = require('fs');

const filePath = __dirname + '/Users';

fs.mkdir(`${filePath}`, err => {
    if (err) console.log(err)
})

createUserFile = (user) => {
    fs.writeFile(`${filePath}/${user.name}.txt`, JSON.stringify(user), err => {
        if (err) console.log(err)
    } )
}

createUserDir = (name) => {
    fs.mkdir(`${filePath}/${name}`, {recursive: true}, err => {
        if(err) console.log(err)
    })
}

userVerification = (user, gender, age) => {
    if (gender === 'male' && age < 20){
        fs.rename(`${filePath}/${user.name}.txt`, `${filePath}/ManYounger20/${user.name}.txt`, err => {
            if(err) console.log(err)
        } )
    }
    if (gender === 'male' && age >= 20){
        fs.rename(`${filePath}/${user.name}.txt`, `${filePath}/ManOlder20/${user.name}.txt`, err => {
            if(err) console.log(err)
        } )
    }
    if (gender === 'female' && age < 20){
        fs.rename(`${filePath}/${user.name}.txt`, `${filePath}/WomanYounger20/${user.name}.txt`, err => {
            if(err) console.log(err)
        } )
    }
    if (gender === 'female' && age >= 20){
        fs.rename(`${filePath}/${user.name}.txt`, `${filePath}/WomanOlder20/${user.name}.txt`, err => {
            if(err) console.log(err)
        } )
    }
}

createUserDir('ManYounger20');
createUserDir('ManOlder20');
createUserDir('WomanYounger20');
createUserDir('WomanOlder20');

const users = [
    {name: 'Dima', gender: 'male', age: 18},
    {name: 'Tanya', gender: 'female', age: 15},
    {name: 'Viola', gender: 'female', age: 25},
    {name: 'Petro', gender: 'male', age: 30},
    {name: 'Ivan', gender: 'male', age: 40},
    {name: 'Ruslan', gender: 'male', age: 50}
];
for (const user of users) {
    createUserFile(user);
    userVerification(user, user.gender, user.age);
}

