// Simple example of a "example" controller
module.exports = {

  // Define data tables/stores (and models) to access
  data: [ 'example' ],

  // Called by api/example "GET"
  getExample: function (req, res) {
    var self = this;
    if (req.params[0]) {
      // Get by id
      self.data.example.find({ '_id': req.params[0] }, function (err, data) {
        self.sendResponse(res, err, data);
      });
    } else {
      // Get list
      self.data.example.all(function (err, data) {
        self.sendResponse(res, err, data);
      });
    }
  },

  // Called by api/example "POST"
  createExample: function (req, res) {
    var self = this;
    self.data.example.validate(req.body, function (err, failures) {
      if (err) {
        self.sendValidationErr(res, failures);
      } else {
        self.data.example.insert(req.body, function (err, data) {
          self.sendResponse(res, err, data);
        });
      }
    });
  },

  // Called by api/example "PUT"
  updateExample: function (req, res) {
    var self = this;
    self.data.example.validate(req.body, function (err, failures) {
      if (err) {
        self.sendValidationErr(res, failures);
      } else {
        self.data.example.update({ '_id': req.params[0] }, req.body, function (err, data) {
          self.sendResponse(res, err, data);
        });
      }
    });
  },

  // Called by api/example "DELETE"
  deleteExample: function (req, res) {
    var self = this;
    self.data.example.remove({ '_id': req.params[0] }, function (err, data) {
      self.sendResponse(res, err, data);
    });
  },

  // Sends out validation errors
  sendValidationErr: function (res, failures) {
    res.send(400, { 'status': 'error', 'message': 'Failed validation on ' + failures.join() });
  },

  // Sends response to data query
  sendResponse: function (res, err, data) {
    if (err) {
      res.send(400, { 'status': 'error', 'message': err });
    } else {
      res.send(200, { 'status': 'success', 'message': data });
    }
  }
};