let config = {
    host:      'localhost', //主机名
    database:  'management', //数据库名
    user:      'root', //用户名
    password:  '', //密码
    protocol:  'mysql',
    port:      '3306',
    query:     {pool: true, debug: true}
};

module.exports = config;