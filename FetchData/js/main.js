/**
 * Path configurations for all JS files
 */
require.config ({
  paths: {
    'jquery'             :   '../script/jquery.min',
    'underscore'         :   '../script/underscore-min',
    'backbone'           :   '../script/backbone-min',
    'jqueryUI'           :   '../script/jqueryUI',
    'dataTable'          :   '../script/jquery.dataTables.nightly.min',
    'tableTool'          :   '../script/TableTools.min',
    'ZeroClipboard'      :   '../script/ZeroClipboard',
    'Model'              :   'models/model',
    'caseModel'          :   'models/caseModel',
    'activityModel'      :   'models/activityModel',
    'topIssueModel'      :   'models/topIssueModel',
    'mainView'           :   'views/mainView',
    'tableView'          :   'views/tableView',
    'Controller'         :   'controllers/Controller',
    'Router'             :   'router'

  },
  shim: {
    'backbone': {
        //These script dependencies should be loaded before loading
        //backbone.js
        deps: ['underscore', 'jquery'],
        //Once loaded, use the global 'Backbone' as the
        //module value.
        exports: 'Backbone'
    },
    'jqueryUI': {
      deps: ['jquery']
    },
    'dataTable': {
      deps: ['jquery']
    },
    'tableTool': {
      deps: ['jquery', 'dataTable']
    }

  }
});

/**
 * @requires 'Controller' and 'jquery'
 */
require (['Router', 'mainView'], function (Router, mainView) {
  //New router
  
//  test.test ();
  
  var router = new Router.Router();
  Backbone.history.start();
  //New mainView
  var appview = new mainView.View();
  
});