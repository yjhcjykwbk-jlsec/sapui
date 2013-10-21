define(['Controller','jqueryUI'], function (Controller) {

  var URL_ROOT = "&$format=json"; 
  var urlHeader = 'https://';

  baseCollection = Backbone.Collection.extend ({
    url: function () {
      var gatewayRequest = urlHeader + this.serverName + this.urlPath;
      this.section = '&$top=' + this.top + '&$skip=' + this.skip;
      console.log (gatewayRequest + this.filter + this.section + this.expand + URL_ROOT);
      return gatewayRequest + this.filter + this.section + this.expand + URL_ROOT;
//      return '../json/problem.json';
      
    },

    
     
     
    countUrl: function () {
      var gatewayRequest = urlHeader + this.serverName + this.countUrlPath;
      console.log (gatewayRequest + this.filter);
      return gatewayRequest + this.filter;

    },

    
     
     
     
    initialize: function (model) {

      
      this.setParam (model);
      this.setUrl ();
      
      this.setFilter(model);
      
      this._getCount();
    },
    
    setParam: function (model) {
      
      this.serverName = model.settings.serverName;
      this.changeTime = model.settings.changeTime;

      
      this.fetchFinished = 0;
      
      this.skip = 0;
      
      this.section = '&$top=' + this.top + '&$skip=' + this.skip;
      
      this.origianlResult = [];
      
      this.availableFields = {};
    },
    
    

    
     
     
    
    setFilter: function (model) {},
    
    setUrl: function () {},

    
     
     
     
    _fetchData: Controller.baseController._fetchData,
    
    
     
     
    _fetchDataSpeed: Controller.baseController._fetchDataSpeed,
    
     
     
     
    _getCount: Controller.baseController._getCount,
    
    
     
     
     
    _generate: Controller.baseController._generate,

    
     
     
    _generateTable: Controller.baseController._generateTable,
    
    
     
     
     
    _showProgress: Controller.baseController._showProgress,

    
     
     
     
     
    _reconstruct: Controller.baseController._reconstruct,
    
    
     
     
     
    _getLargestObject: Controller.baseController._getLargestObject,
    
    
     
     
    _hasElement: Controller.baseController._hasElement,


    
     
     
     
     
    getTimeAgo: Controller.baseController.getTimeAgo,
    
    
     
     
     
    StringToXML: Controller.baseController.StringToXML,
    
    
     
     
    drawTable: Controller.baseController.drawTable

  });

  
   
   
  return {
    baseCollection: baseCollection
  };
});