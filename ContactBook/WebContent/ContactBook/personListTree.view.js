sap.ui.jsview('ContactBook.personListTree', {
  // This view works with deptTable-view and personInfoForm-view
  /**
   * 
   * @memberOf ContactBook.personListTree
   */
  getControllerName : function () {
    return 'ContactBook.personListTree';
  },

  /**
   * create a tree view to display each department's person list
   * 
   * @memberOf ContactBook.personListTree
   */
  createContent : function (oController) {
    // Help function to handle the suggest events of the search field
    var doSuggest = function (oEvent) {
      return '1';
    };

    var showPersonInfoForm = function (personNumber) {
      // if a person is selected ( has a number )
      // then a form-view containing details of this person will be represented
      sap.ui.getCore().byId('id-person-info-form').getController().setPersonInfoFormView(personNumber, PERSON_DETAILS);
      sap.ui.getCore().byId('id-person-info-form').getController().showPersonInfoFormView();
    };

    var showDeptTable = function (deptName) {
      // a table-view containing all person of this dept will be represented
      var oDept = _.find(PERSON_LIST.nodes, function (s) {// filter this dept out
        // of 'PERSON_LIST'
        return s.name === deptName;
      });
      sap.ui.getCore().byId('id-dept-table').getController().setDeptTableView(PERSON_DETAILS, oDept);// oDept contains all person of  this dept
      sap.ui.getCore().byId('id-dept-table').getController().showDeptTableView();
    };

    // create a simple SearchField with suggestion list (list expander visible)
    var oSearch = new sap.ui.commons.SearchField({
      enableListSuggest : true,
      startSuggestion : 2,
      value : 'enter the id of the person',
      search : function (oEvent) {
        var number = oEvent.getParameter('query');
        console.log('search:' + number);
        sap.ui.getCore().byId('id-dept-table').getController().hideDeptTableView();
        showPersonInfoForm(number);
      },
      suggest : doSuggest,
      enableClear : true,
      select : function () {
        console.log('onclick');
        this.value = '';
      }
    });

    // create a tree-view containing all the persons and their department
    var oTree = new sap.ui.commons.Tree({
      // when a tree node is selected,
      // the deptTableView and the personInfoFormView will be refreshed
      showHeader : true,
      title : 'persons',
      width : '100%',
      showHeaderIcons : true,
      showHorizontalScrollbar : false,
      select : function (oControlEvent) {
        oControlEvent.getParameters().node.fireSelected();
        var selectednode = oControlEvent.getParameters().node;
        var personNumber = selectednode.data('number');
        var deptName = selectednode.getText();
        if (personNumber) {
          console.log('number:' + personNumber);
          deptName = selectednode.getParent().getText();
          // show the person form
          showPersonInfoForm(personNumber);
        } else {
          //hide the person form
          sap.ui.getCore().byId('id-person-info-form').getController().hidePersonInfoFormView();
        }
        //show dept table
        showDeptTable(deptName);
      }
    });
    
    //init this tree-view with data 'PERSON_LIST'
    oController.setPersonListTreeView(oTree, PERSON_LIST);
    console.log(oTree.getNodes());

    var oLayout = new sap.ui.layout.VerticalLayout();
    oLayout.addContent(oSearch);
    oLayout.addContent(oTree);
    oLayout.setVisible(true);
    // create a panel ,which contains a search field and a tree view
    var oPanel = new sap.ui.commons.Panel({
      text : 'Person List Tree',
      width: '100%'
    });
    oPanel.addContent(oLayout);
    return oPanel;
  }

});
