module.exports = db => {

    let Admin = db.define("administrator", {
        id        : String,
        name      : String,
        password  : String
    }, {
        methods: {
            isRight: function (username, password) {
                return this.name == username && this.password == password
            }
        }
    });

    return Admin;

};