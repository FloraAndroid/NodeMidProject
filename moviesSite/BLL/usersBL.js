const usersDAL = require('../DAL/usersJsonDAL');


exports.getAllUsers = async () => {
    try {
        let resp = await usersDAL.getUsers();
        let users = resp.users;
        return users
    }
    catch (error) {
        return error

    }
}

 function getIndexOfUser(id,users){
    let index = users.findIndex(x => x.id == id)
    return index

}
exports.getUserById = async (id) => {
    try {
        let resp = await usersDAL.getUsers();
        let users = resp.users;
        let user = users.find(x => x.id == id)
        return user
    }
    catch (error) {
        return error

    }
}

exports.addUSer = async (obj) => {
    let resp = await usersDAL.getUsers();
    let users = resp.users;
    let lastUser = users[users.length - 1]
    console.log(user);
    let id = lastUser.id + 1
    let admin = "false"
    if (obj.admin) {
        admin = true
    }
    users.push({
        "id": id, "userName": obj.uName,"password": obj.pwd,
        "createdDate": obj.date,
        "numOfTrans": obj.trans,
        "admin": admin
    })
    let result = await usersDAL.updateUsersFile(users)
    return result

}



exports.updateUser = async (obj, id) => {

    let resp = await usersDAL.getUsers();
    let users = resp.users;
    let index= getIndexOfUser(id,users)

    let admin = "false"
    if (obj.admin) {
        admin = true
    }
    users[index] = {
        "id": id, "userName": obj.uName,
        "password": obj.pwd,
        "createdDate": obj.date,
        "numOfTrans": obj.trans,
        "admin": admin
    }
    let result = await usersDAL.updateUsersFile(users)
    console.log("result")
    return result

}

exports.deleteUser = async (id) => {
    let resp = await usersDAL.getUsers();
    let users = resp.users;

    let index= getIndexOfUser(id,users)

    users.splice(index, 1)
    let result = await usersDAL.updateUsersFile(users)
    console.log("result")
    return result

}
exports.isUserExist = (async (uName, pwd) => {

    let result = false
    try {
        let resp = await usersDAL.getUsers();
        let users = resp.users
        let user = users.find(x => x.userName == uName && x.password == pwd)

        if (user != null) {
            result = true
        }
        else {

            result = false
        }
    }
    catch (error) {
        result = false
    }

    return result

})


// return new Promise((resolve,reject)=>{
//     usersDAL.getUsers().then(data=>{


//     }).catch((error)=>{

//         re
//         reject(err)
//     })
// });





exports.isUserAdmin = (uName, pwd) => {

}