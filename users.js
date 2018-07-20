
var Users = {
    users: {},
    add: function(clientId, username) {
        Users.users[clientId] = username;
    },
    delete: function(clientId) {
        if(Users.users[clientId] !== undefined) {
            delete Users.users[clientId];
        }
    }
}
module.exports = function() { 
    return Users; 
};