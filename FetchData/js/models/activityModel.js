define(['Model'], function (Model) {

  var urlPath = '.wdf.sap.corp/sap/opu/odata/sap/ZS_ESCALATIONS/ActivityList?$filter=';
  var countUrlPath = '.wdf.sap.corp/sap/opu/odata/sap/ZS_ESCALATIONS/ActivityList/$count?$filter=';
  var URL_ROOT = "&$format=json";
  var urlHeader = 'https://';

  activityCollection = Model.baseCollection.extend(
   
   
   
  {

    
     
     
     
    setUrl: function () {
      this.urlPath = urlPath;
      this.countUrlPath = countUrlPath;
      this.section = '';
    },

    
     
     
     
    setFilter: function (model) {
      

      
      var array = model.IDs.split(',');
      var serviceTeamFilter = "activity_service_team eq ";
      var acitivtyElement = model.settings.acitivtyElement;

      var priority = acitivtyElement.priority;
      var status = acitivtyElement.status;
      var category = acitivtyElement.category;

      
      filter = '';
      array.forEach(function (item) {
        filter += (serviceTeamFilter + "'" + item + "' or ");
      });
      filter = filter.substring(0, filter.length - 4);

      filter = "( ( " + filter + " )";

      
       
       
       
      if (priority.length > 0) {
        filter += ' and (';
        priority.forEach(function (item) {
          filter += (" ( activity_priority eq '" + item + "' ) or");
        });

        filter = filter.substring(0, filter.length - 3) + ' )';
      }

      if (status.length > 0) {
        filter += ' and (';
        status.forEach(function (item) {
          filter += (" ( activity_status eq '" + item + "' ) or");
        });
        filter = filter.substring(0, filter.length - 3) + ' )';
      }

      if (category.length > 0) {
        filter += ' and (';
        category.forEach(function (item) {
          filter += (" ( activity_cat eq '" + item + "' ) or");
        });
        filter = filter.substring(0, filter.length - 3) + ' )';

      }

      this.filter = filter + ' )';
      console.log(this.url());
    },

    
     
     
     
    url: function () {
      var gatewayRequest = urlHeader + this.serverName + this.urlPath;
      this.section = '';

      return gatewayRequest + this.filter + this.section + URL_ROOT;
    },

    
     
     
    _getCount: function () {

      that = this;
      
      var url = this.countUrl();
      $.getJSON(url, function () {
        
      })
        .fail(function () {
          
          alert("Get Count error");
          alert("Return to index page");
          
        })
        .done(function (data) {

          
          that.toBeloaded = data;
          $('.progress-label').html('Waiting for Loading...  Total Count: ' + data);

          if (data === 0)
            $('.progress-label').append('<button id="return">Return</button>');

          var dividedBy = 9;
          if (data < 90)
            dividedBy = 6;
          else if (data > 240 && data < 360)
            dividedBy = 12;
          else if (data > 360)
            dividedBy = 18;

          that.episode = Math.ceil(data / dividedBy);

          that._fetchData();
        });

    }
  });

  
   
   
  return {
    activityCollection: activityCollection
  };
});