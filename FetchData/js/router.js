define(['tableView', 'mainView'], function (tableView, mainView, Model) {

  Router = Backbone.Router.extend ({

    routes: {
      'posts/:IDs': 'getPost', // matches http://example.com/#anything-here
      'index'     : 'toIndex'
    },

    toIndex: function () {
      window.location.href = './index.html';
    },
    
    getPost: function () {
      
    }

  });

  return {
    Router: Router
  };
});