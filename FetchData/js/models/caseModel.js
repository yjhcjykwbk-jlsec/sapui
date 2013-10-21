define(['Model'], function (Model) {

  var urlPath = '.wdf.sap.corp/sap/opu/odata/sap/ZS_ESCALATIONS/CaseList?$filter=';
  var countUrlPath = '.wdf.sap.corp/sap/opu/odata/sap/ZS_ESCALATIONS/CaseList/$count?$filter=';
  
  caseCollection = Model.baseCollection.extend ({
    setUrl: function () {
      this.urlPath = urlPath;
      this.countUrlPath = countUrlPath;
    },
    setFilter: function (model) {
      
      var array = model.IDs.split(',');
      var serviceTeamFilter = "service_team eq ";
      var caseElement = model.settings.caseElement;
      
      this.caseExpandContent = caseElement.caseExpandContent;
      var caseExpandContent = this.caseExpandContent;
      var caseExpandFilter = '';
      
      filter = '';
      array.forEach (function (item) {
        filter += (serviceTeamFilter + "'" + item + "' or ");
      });
      filter = filter.substring(0, filter.length - 4);

      filter = " ( case_type eq 'ZS02' ) and ( " + filter;
      filter += " ) and ( ( reason eq 'AGS: Global Case' ) or ( reason eq 'MCC/ESRV Initiative' ) )";
      
      filter = this.addChangeTime (filter);
      
      
      if (caseExpandContent.length > 0) {
        filter = filter.substring(0, filter.length - 1);
        filter += "and ( ( rating eq 'Red' ) or ( rating eq 'Yellow' ) ) )";
      }
      
      caseExpandContent.forEach (function (item) {
        caseExpandFilter += (item + ',');
      });
      caseExpandFilter = caseExpandFilter.substring ( 0, caseExpandFilter.length - 1 );
      
      this.expand = '&$expand=' + caseExpandFilter;
      
      this.filter = filter;
    },
    
    addChangeTime: function (filter) {
      if (this.changeTime !== 'anytime')
        filter += " and ( change_time ge '";
      
      if (this.changeTime === 'last-week')
        filter += this.getTimeAgo ( 7 ) + "' )";
      else if (this.changeTime === 'last-two-weeks')
        filter += this.getTimeAgo ( 14 ) + "' )";
      else if (this.changeTime === 'last-month')
        filter += this.getTimeAgo ( 30 ) + "' )";
      else if (this.changeTime === 'last-year')
        filter += this.getTimeAgo ( 360 ) + "' )";
      return filter;
    },
  });
   
   
  return {
    caseCollection: caseCollection
  };
});