define (['activityModel', 
         'caseModel', 
         'topIssueModel'], function (activityModel, caseModel, topIssueModel) {
  
  tableView = Backbone.View.extend({
    //Target element of current view
    el: $('.display-area'),
    events: {
      'click #back-to-index': 'backToIndex',
      'click #return': 'backToIndex'
    },

    initialize: function (model) {
      //0014307539,0014307539
      //Set the page content
      this.$el.html (
        '<div id="progressbar"><div class="progress-label">Waiting for Response...</div></div><div id="number"></div>'
      );
      
      var listType = model.settings.listType;
      //Create a activity collection
      if (listType === 'CaseList')
        this.collection = new caseModel.caseCollection (model);
      else if (listType === 'ActivityList')
        this.collection = new activityModel.activityCollection (model);
      else if (listType === 'TopIssueList')
        this.collection = new topIssueModel.topIssueCollection (model);
      
    },

    backToIndex: function () {
      window.location.href = '#index';
    }
  });

  return {
    tableView: tableView
  };
});