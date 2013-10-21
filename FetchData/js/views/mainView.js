define (['tableView'], function (tableView) {
  
  
  var i = 0;
  priorityArray = [{value: 0, text: 'All'},
                   {value: 1, text: 'Very High'},
                   {value: 3, text: 'High'},
                   {value: 5, text: 'Medium'},
                   {value: 9, text: 'Low'}];
  statusArray = [{value: 0, text: 'All'},
                 {value: 'E0010', text: 'New'},
                 {value: 'E0011', text: 'In Process Backoffice'},
                 {value: 'E0012', text: "Responsible's Action"},
                 {value: 'E0013', text: "Confirmed"},
                 {value: 'E0014', text: "Completed"},
                 {value: 'E0018', text: "In Process SAC"},
                 {value: 'E0020', text: "In Process CIM"},
                 {value: 'E0021', text: "In Process IEM"},
                 {value: 'E0022', text: "In Process CIC"},
                 {value: 'E0023', text: "In Process COM"},
                 {value: 'E0024', text: "In Process PS"},
                 {value: 'E0025', text: "In Process IMS"}];
  categoryArray = [{value: 0, text: 'All'},
                   {value: 'Z90', text: 'GoLive Endanger'},
                   {value: 'Z91', text: 'Production Down'},
                   {value: 'Z93', text: 'MaxAttentionMSG'},
                   {value: 'ZB2', text: 'MCS BO Escalation'}];
  activityFilters = [{name: 'Priority', array: priorityArray},
                     {name: 'Status', array: statusArray},
                     {name: 'Category', array: categoryArray}];
  
  
  View = Backbone.View.extend ({
    
    el: $ ('.display-area'),
    
    events: {
      'click #show ': 'showTable',
      'click #submitid': 'submitIDs',
      'click #PriorityAll': 'checkboxPriorityOptions',
      'click #StatusAll': 'checkboxStatusOptions',
      'click #CategoryAll': 'checkboxCategoryOptions'
    },
    
    
     
     
    initialize: function () {
      that = this;
      
      
      $ ('#list-type').change (function () {
        
        var listType = $ ('#list-type option:selected').val ();
        if (listType === 'CaseList') {
          $ ('#change-time').prop('disabled', false);
          that.eraseActivityCheckBox ();
          that.insertCaseCheckBox ();
          
          
        }
        else if (listType === 'ActivityList') {
          that.eraseCaseCheckBox ();
          that.insertActivityCheckBox ();
          $ ('#change-time').prop('disabled', true);
        }
        else {
          that.eraseActivityCheckBox ();
          that.eraseCaseCheckBox ();
          $ ('#change-time').prop('disabled', true);
        }
      });
    },
    
    
     
     
     
     
    showTable: function () {
      var IDs = $ ('#service-team-id').val ();
      var settings = this.getSettings ();

      if (IDs === '') {
        alert ('Please input service team number!');
      }
      else {
        this.tablePage = new tableView.tableView ({
          IDs: IDs,
          settings: settings
        });
      }
        
    },
    
    submitIDs: function () {
      var serviceTeamId = '';
      var priority = [];
      var status = [];
      var category = [];
      var caseExpandContent = [];
      
      var checkBoxes = $ ('.myCheckBox');
      var priorityCheckBoxes = $ ('.PriorityCheckbox');
      var statusCheckBoxes = $ ('.StatusCheckbox');
      var categoryCheckBoxes = $ ('.CategoryCheckbox');
      var caseExpand = $ ('.caseCheckBox');
      
      
      for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes [i].checked === true)
          serviceTeamId += (checkBoxes [i].value + ',');
      }
      
      
       
       
      
      for (i = 0; i < priorityCheckBoxes.length; i++) {
        if (priorityCheckBoxes [i].checked === true)
          priority.push ( priorityCheckBoxes [i].value );
      }
      
      
      for (i = 0; i < statusCheckBoxes.length; i++) {
        if (statusCheckBoxes [i].checked === true)
          status.push ( statusCheckBoxes [i].value );
      }
      
      
      for (i = 0; i < categoryCheckBoxes.length; i++) {
        if (categoryCheckBoxes [i].checked === true)
          category.push ( categoryCheckBoxes [i].value );
      }
      
      
       
       
      
      for (i = 0; i < caseExpand.length; i++) {
        if (caseExpand [i].checked === true)
          caseExpandContent.push ( caseExpand [i].value );
      }
      
      
      
      
      this.activityElement = {priority: priority, status: status, category: category};
      this.caseElement = {caseExpandContent: caseExpandContent};
      

      
      serviceTeamId = serviceTeamId.substring(0, serviceTeamId.length - 1);
      $ ('#service-team-id').text (serviceTeamId);
    },
    
    getSettings: function () {
      var listType = $ ('#list-type option:selected').val ();
      var serverName = $ ('#server-name option:selected').val ();
      var changeTime = $ ('#change-time option:selected').val ();
      var acitivtyElement = this.activityElement;
      var caseElement = this.caseElement;
      return {
        listType: listType,
        serverName: serverName,
        changeTime: changeTime,
        acitivtyElement: acitivtyElement,
        caseElement: caseElement
      };
    },
    
    
     
     
    insertActivityCheckBox: function () {
      checkBoxTable = '<table>';
      
      activityFilters.forEach (function (item) {
        
        checkBoxTable += ('<tr><td class="title">' + item.name + '</td></tr>');
        
        item.array.forEach (function (value, index) {
          
          checkBoxTable += index % 7 ? '<td>' : '<tr><td>';
          if (index !== 0) {
            checkBoxTable += '<input type="checkbox" class="';
            checkBoxTable += (item.name + 'Checkbox" value="');
            checkBoxTable += (value.value + '">' + value.text);
          }
          else {
            checkBoxTable += '<input type="checkbox" id="';
            checkBoxTable += (item.name + 'All">' + value.text);
          }
          checkBoxTable += '</td>';
        });
        
        checkBoxTable += '</tr>';
      });
      
      checkBoxTable += '</table>';
      $ ('#activity-checkbox').append (checkBoxTable);
    },
    
    eraseActivityCheckBox: function () {
      $ ('#activity-checkbox').html ('');
    },

    insertCaseCheckBox: function () {
      checkBoxTable = '<table>';
      checkBoxTable += '<tr><span class="title">Extended Content (Only For Red & Yellow Rating)</span></tr>';
      
      checkBoxTable += '<td><input type="checkbox" class="caseCheckBox"' +
                       'value="Notes">Management Summary</td>';
      checkBoxTable += '<td><input type="checkbox" class="caseCheckBox"' +
                       'value="TopIssues">Open Top Issuses</td>';
      checkBoxTable += '<td><input type="checkbox" class="caseCheckBox"' +
                       'value="CaseActivities">Open Activities</td>';
      
      checkBoxTable += '</tr></table>';
      $ ('#case-checkbox').html (checkBoxTable);
    },
    
    eraseCaseCheckBox: function () {
      $ ('#case-checkbox').html ('');
    },
    
    
     
     
    checkboxPriorityOptions: function () {

      var priorityAll = $ ('#PriorityAll');
      var priorityCheckboxOthers = $ ('.PriorityCheckbox');
    
      if ( priorityAll [0].checked === true)
         for (i = 0; i < priorityCheckboxOthers.length; i++)
           priorityCheckboxOthers[i].checked = true;
      
      else
        for (i = 0; i < priorityCheckboxOthers.length; i++)
          priorityCheckboxOthers[i].checked = false;
    },
    
    checkboxStatusOptions: function () {

      var statusAll = $ ('#StatusAll');
      var statusCheckboxOthers = $ ('.StatusCheckbox');
    
      if ( statusAll [0].checked === true)
        for (i = 0; i < statusCheckboxOthers.length; i++)
          statusCheckboxOthers[i].checked = true;
      
      else
        for (i = 0; i < statusCheckboxOthers.length; i++)
          statusCheckboxOthers[i].checked = false;
    },
    
    checkboxCategoryOptions: function () {

      var categoryAll = $ ('#CategoryAll');
      var categoryCheckboxOthers = $ ('.CategoryCheckbox');
    
      if ( categoryAll [0].checked === true)
         for (i = 0; i < categoryCheckboxOthers.length; i++)
           categoryCheckboxOthers[i].checked = true;
      
      else
        for (i = 0; i < categoryCheckboxOthers.length; i++)
          categoryCheckboxOthers[i].checked = false;
    },

  });
  
  return {
    View: View
  };
});