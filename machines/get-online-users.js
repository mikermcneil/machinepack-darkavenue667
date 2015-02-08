module.exports = {


  friendlyName: 'Get online users',


  description: 'List users who were online in the last 24 hours.',


  extendedDescription: '',


  inputs: {},


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    success: {
      description: 'Done.',
      example: [{
        username: 'stuartthestudent',
        profileUrl: 'http://asoue.proboards.com/user/7262'
      }]
    }

  },


  fn: function(inputs, exits) {
    return exits.success();
  }


};
