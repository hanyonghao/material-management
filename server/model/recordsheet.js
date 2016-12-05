module.exports = db => {

    let RecordSheet = db.define("record_sheet", {
        id        : String,
        m_id      : String,
        ap_id     : String,
        r_count   : String,
        r_remark  : String

    }, {
        methods: {

        }
    });

    return RecordSheet;

};