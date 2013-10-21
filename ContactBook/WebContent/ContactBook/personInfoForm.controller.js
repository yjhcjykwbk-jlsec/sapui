sap.ui.controller('ContactBook.personInfoForm', {

  /**
   * Called when a controller is instantiated and its View controls (if
   * available) are already created. Can be used to modify the View before it is
   * displayed, to bind event handlers and do other one-time initialization.
   * 
   * @memberOf ContactBook.personInfoForm
   */
  // onInit: function () {
  //
  // },
  /**
   * Similar to onAfterRendering, but this hook is invoked before the
   * controller's View is re-rendered (NOT before the first rendering! onInit()
   * is used for that one!).
   * 
   * @memberOf ContactBook.personInfoForm
   */
  // onBeforeRendering: function () {
  //
  // },
  /**
   * Called when the View has been rendered (so its HTML is part of the
   * document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * 
   * @memberOf ContactBook.personInfoForm
   */
  // onAfterRendering: function () {
  //
  // },
  /**
   * Called when the Controller is destroyed. Use this one to free resources and
   * finalize activities.
   * 
   * @memberOf ContactBook.personInfoForm
   */
  // onExit: function () {
  //
  // }
  /**
   * Use this to get view of id-person-info-form
   * 
   * @memberOf ContactBook.personInfoForm
   */
  _getView: function () {
    return getView('id-person-info-form', 'ContactBook.personInfoForm');
  },
  /**
   * Called when a specific person is selected
   * Use this to filter the person whose number=key out of oPersonDetailsList 
   * and fill the form with the data of the specific person
   * 
   * @memberOf ContactBook.personInfoForm
   */
  setPersonInfoFormView : function (personNumber, oPersonDetailsList) {
    var view = this._getView();
    var oPerson = _.find(oPersonDetailsList, function (s) {
      if (s.number == personNumber) {
        return true;
      }
    });
    console.log(oPerson);
    var oModel = new sap.ui.model.json.JSONModel(oPerson);
    console.log(oPersonDetailsList);
    console.log(view);
    view.setModel(oModel);
  },

  /**
   * Use this to hide the 'person-info-form' view
   * 
   * @memberOf ContactBook.personInfoForm
   */
  hidePersonInfoFormView : function () {
    var view = this._getView();
    // show everything in view
    _.each(view.getContent(), function (s) {
      s.setVisible(false);
    });
  },

  /**
   * Use this to show the person-info-form view
   * 
   * @memberOf ContactBook.personInfoForm
   */
  showPersonInfoFormView : function () {
    var view = this._getView();
    // hide everything in view
    _.each(view.getContent(), function (s) {
      s.setVisible(true);
    });
  }
});