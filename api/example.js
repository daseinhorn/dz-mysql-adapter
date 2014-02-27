// Simple example of a "example" api endpoint
module.exports = {

  // Handle GET method
  'GET': {
    controller: 'example',
    fn: 'getExample'
  },

  // Handle POST method
  'POST': {
    controller: 'example',
    fn: 'createExample'
  },

  // Handle PUT method
  'PUT': {
    controller: 'example',
    fn: 'updateExample'
  },

  // Handle DELETE method
  'DELETE': {
    controller: 'example',
    fn: 'deleteExample'
  }
};