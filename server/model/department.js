module.exports = db => {

    let Department = db.define("department", {
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

    return Department;

};