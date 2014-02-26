var mysql = require('mysql');

// DozerJS MySQL adapter
var mysqlAdapter = function(table, config) {
    this.table = table;
    this.config = config;
    this.store = mysql.createPool({
        host: config.host,
        user: config.user,
        password: config.pass,
        database: config.database
    });
};

//Helpers

// Parse the query. We have to do this manually due to node-mysql limitations...

mysqlAdapter.prototype.parseFilterObject = function(filterObj) {
    var self = this;

    var tmpArr = [];
    Object.keys(filterObj).forEach(function(key) {
        var val = filterObj[key];
        tmpArr.push(key + " = " + self.store.escape(val));
    });
    return tmpArr.join(" AND ");
}

// DB Interface

// Returns count of fields based on query
mysqlAdapter.prototype.count = function(query, cb) {
    var self = this;
    self.store.getConnection(function(err, connection) {
        connection.query('SELECT COUNT(*) FROM ' + self.table + ' WHERE ' + self.parseFilterObject(query), function(err, results) {
            connection.release();

            cb(err, results);
        });
    });
};

// Returns entire contents of data store
mysqlAdapter.prototype.all = function(cb) {
    var self = this;
    self.store.getConnection(function(err, connection) {
        var sql = "SELECT * FROM " + self.table;
        connection.query(sql, function(err, results) {
            connection.release();

            cb(err, results);
        });
    });
};

// Finds specific entry
mysqlAdapter.prototype.find = function(query, cb) {
    var self = this;
    self.store.getConnection(function(err, connection) {
        connection.query('SELECT * FROM ' + self.table + ' WHERE ' + self.parseFilterObject(query), function(err, results) {
            connection.release();

            cb(err, results);
        });
    });
};

// Inserts new record
mysqlAdapter.prototype.insert = function(data, cb) {
    var self = this;
    self.store.getConnection(function(err, connection) {
        connection.query('INSERT INTO ' + self.table + ' SET ? ', data, function(err, results) {
            connection.release();

            cb(err, results);
        });
    });
};

// Updates existing record
mysqlAdapter.prototype.update = function(query, data, cb) {
    var self = this;
    self.store.getConnection(function(err, connection) {
        connection.query('UPDATE ' + self.table + ' SET ? WHERE ' + self.parseFilterObject(query), data, function(err, results) {
            connection.release();

            cb(err, results);
        });
    });
};

// Removes existing record
mysqlAdapter.prototype.remove = function(query, cb) {
    var self = this;
    self.store.getConnection(function(err, connection) {
        connection.query('DELETE FROM ' + self.table + ' WHERE ' + self.parseFilterObject(query), function(err, results) {
            connection.release();

            cb(err, results);
        });
    });
};



module.exports = mysqlAdapter;
