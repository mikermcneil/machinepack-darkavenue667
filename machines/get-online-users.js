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
        displayName: 'stuartthestudent',
        profileUrl: 'http://asoue.proboards.com/user/7262'
      }]
    }

  },


  fn: function(inputs, exits) {

    var Http = require('machinepack-http');
    var cheerio = require('cheerio');

    // Fetch the HTML from a web page.
    Http.fetchWebpageHtml({
      url: 'http://asoue.proboards.com/',
    }).exec({

      // An unexpected error occurred.
      error: exits.error,

      // OK.
      success: function(html) {

        // Flag <h2>, <h3>, <h4>, and <h5> tags
        // with the `permalinkable` directive
        //
        // e.g.
        // if the page is #/documentation/reference/req
        // and the slug is "transport-compatibility"
        // then the final URL will be #/documentation/reference/req?q=transport-compatibility

        var env = require('jsdom').env;

        // first argument can be html string, filename, or url
        env(html, function (errors, window) {
          if (errors) {
            return exits.error(errors);
          }

          var $ = require('jquery')(window);

          var users = [];
          $($('img[title="24&#32;Hours"]').parent().next().find('tr')[2]).find('a').each(function() {
            users.push({
              displayName: $(this).text(),
              profileUrl: 'http://asoue.proboards.com/' + $(this).attr('href')
            });
          });

          return exits.success(users);
        });

      },
    });
  }


};
