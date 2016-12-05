module.exports = db => {

    let Material = db.define("material_sheet", {
        id        : String,
        m_name    : String,
        m_amount  : Number,
        m_unit    : String
    }, {
        methods: {
            isEmpty: function () {
                return this.m_amount == 0;
            }
        }
    });

    return Material;

};