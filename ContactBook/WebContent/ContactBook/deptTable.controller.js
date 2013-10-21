sap.ui.controller('ContactBook.deptTable', {

  /**
   * Called when a controller is instantiated and its View controls (if
   * available) are already created. Can be used to modify the View before it is
   * displayed, to bind event handlers and do other one-time initialization.
   *
   * @memberOf ContactBook.deptTable
   */
  // onInit: function () {
  //
  // },
  /**
   * Similar to onAfterRendering, but this hook is invoked before the
   * controller's View is re-rendered (NOT before the first rendering! onInit()
   * is used for that one!).
   *
   * @memberOf ContactBook.deptTable
   */
  // onBeforeRendering: function () {
  //
  // },
  /**
   * Called when the View has been rendered (so its HTML is part of the
   * document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   *
   * @memberOf ContactBook.deptTable
   */
  // onAfterRendering: function () {
  //
  // },
  /**
   * Called when the Controller is destroyed. Use this one to free resources and
   * finalize activities.
   *
   * @memberOf ContactBook.deptTable
   */
  // onExit: function () {
  //
  // }
  
  /**
   * Use this to get view of id-dept-table
   * 
   * @memberOf ContactBook.deptTable
   */
  _getView: function () {
    return  getView('id-dept-table', 'ContactBook.deptTable');
  },
  /**
   * Called when the table is represented at the first time 
   * Use this to initiate the table with all persons' info data(like PERSON_DETAILS)
   * 
   * @memberOf ContactBook.deptTable
   */
  initView: function (oPersonDetailsList) {
    var view = this._getView();
    // Create a model and bind the table rows to this model
    view.setModel(new sap.ui.model.json.JSONModel(oPersonDetailsList));
  },
  /**
   * Called when a specific department is selected
   * Use this to filter the persons who belongs to oDept out of oPersonDetailsList 
   * and fill the table with all the filtered persons above
   * @param oDept: the selected department
   * @param oPersonDetailsList: all departments' persons' info
   * 
   * @memberOf ContactBook.deptTable
   */
  setDeptTableView: function (oPersonDetailsList, oDept) {
    if (!oDept) {
      return;
    }
    var oDeptPersons = oDept.nodes;
    var view = this._getView();
    // filter the persons who belongs to oDept out of oPersonDetailsList 
    var oFilteredData = _.filter(oPersonDetailsList, function (s) {
      return _.find(oDeptPersons, function (t) {
        return (s.number === t.number);
      });
    });
    console.log(oFilteredData);
    console.log(view);
    // fill the table with oFilteredData
    view.setModel(new sap.ui.model.json.JSONModel(oFilteredData));
    return view;
  },
  /**
   * Called when 'dept-table' view is not needed to be displayed
   * Use this to hide the 'dept-table' view
   * 
   * @memberOf ContactBook.deptTable
   */
  hideDeptTableView: function () {
    var view = this._getView();
    // hide everything in view
    _.each(view.getContent(), function (s) {
      s.setVisible(false);
    });
  },
  
  /**
   * Called when 'dept-table' view is needed to be displayed
   * Use this to show the dept-table
   * 
   * @memberOf ContactBook.deptTable
   */
  showDeptTableView: function () {
    var view = this._getView();
    // hide everything in view
    _.each(view.getContent(), function (s) {
      s.setVisible(true);
    });
  }
});