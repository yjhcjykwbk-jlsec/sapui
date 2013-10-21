define(['Model'], function (Model) {

  var urlPath = '.wdf.sap.corp/sap/opu/odata/sap/ZS_ESCALATIONS/TopIssueList?$expand=Parties&$orderby=request_end desc&$filter=';
  var countUrlPath = '.wdf.sap.corp/sap/opu/odata/sap/ZS_ESCALATIONS/TopIssueList/$count?$expand=Parties&$orderby=request_end desc&$filter=';
  
  topIssueCollection = Model.baseCollection.extend ({
    
     
     
     
    setUrl: function () {
      this.urlPath = urlPath;
      this.countUrlPath = countUrlPath;
    },

    setFilter: function (model) {
      
      var array = model.IDs.split(',');
      var serviceTeamFilter = 'partner_no eq ';
      
      filter = '';
      array.forEach(function (item) {
        filter += (serviceTeamFilter + "'" + item + "' or ");
      });
      filter = filter.substring(0, filter.length - 4);
      filter += " and partner_fct eq 'ZSERST01' ";
      
      this.filter = filter;
    },
    
  });

  
   
   
  return {
    topIssueCollection: topIssueCollection
  };
});