sap.ui.controller('ContactBook.indexShell', {

  /**
   * Called when a controller is instantiated and its View controls (if
   * available) are already created. Can be used to modify the View before it is
   * displayed, to bind event handlers and do other one-time initialization.
   * 
   * @memberOf ContactBook.indexShell
   */
  // onInit: function () {
  //
  // },
  /**
   * Similar to onAfterRendering, but this hook is invoked before the
   * controller's View is re-rendered (NOT before the first rendering! onInit()
   * is used for that one!).
   * 
   * @memberOf ContactBook.indexShell
   */
  // onBeforeRendering: function () {
  //
  // },
  /**
   * Called when the View has been rendered (so its HTML is part of the
   * document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * 
   * @memberOf ContactBook.indexShell
   */
  // onAfterRendering: function () {
  //
  // },
  /**
   * Use this to get view of id-index-shell 
   * 
   * @memberOf ContactBook.indexShell
   */
  _getView : function () {
    return getView('id-index-shell', 'ContactBook.indexShell').getContent()[0];
  },
   /**
    * Called when item 'statics' is selected
    * Use this to get the statics chart page 
    * 
    * @memberOf ContactBook.indexShell
    */
  getStaticsPage : function () {
    var oLabel = new sap.ui.commons.Label({
      text : 'Page In Construction'
    });
    return oLabel;
  },
  /**
   * Called when item 'index' selected
   * Used this to get the index page 
   * 
   * @memberOf ContactBook.indexShell
   */
  getIndexPage : function () {
    var indexLabel = getView('id-index-label');
    return indexLabel;
  },
  /**
   * Called when item 'contact-book' selected 
   * Use this to get the contact-book page
   * 
   * @memberOf ContactBook.indexShell
   */
  getContactBookPage : function () {
    console.log(this);
    //get shell view
    // get a view : personListTree
    var mainTreeView = getView('id-person-list-tree', 'ContactBook.personListTree');
    // get a view : deptTable
    var deptTableView = getView('id-dept-table', 'ContactBook.deptTable');
    deptTableView.getController().showDeptTableView();
    // get a view : personInfoForm
    var personInfoFormView = getView('id-person-info-form', 'ContactBook.personInfoForm');
    personInfoFormView.getController().hidePersonInfoFormView();
    // use splitter to split the mainTreeView,deptTableView,personInfoFormView
    // into two screen
    var oSplitterV = sap.ui.getCore().byId('id-splitter');
    // create the splitter
    if (!oSplitterV) {// TODO:constructor
      oSplitterV = new sap.ui.commons.Splitter('id-splitter', {
        splitterOrientation : sap.ui.commons.Orientation.vertical,
        splitterPosition : '20%',
        minSizeFirstPane : '20%',
        minSizeSecondPane : '50%',
        width : '100%',
        firstPaneContent : [ mainTreeView ],
        secondPaneContent : [ deptTableView, personInfoFormView ]
      });
    }
    return oSplitterV;
  },
//  /**
//   * Triggered when shell item is selected
//   * Use this to handle the item-selection event
//   * @param evt: item selection event
//   * @param controller: the controller of indexShell
//   * 
//   * @memberOf ContactBook.indexShell
//   */
//  itemSelected : function (evt,controller) {
//    console.log(this);
//    var itemSelected = evt.getParameter('key');
//    var oShell = this._getView();
//    // prepare the handlers for the shell item selection event
//    var views = {};
//    views.index = this._showIndex(),
//    views.contactBook = this._showContactBook(),
//    views.statics = this._showStatics(),
//    views.others = this._showStatics()
//    };
//    Window.shellController = this;
//    // trigger the corresponding handler
//    oShell.setContent(views[itemSelected]);
//    //handlers[itemSelected].call(controller);
//  }
});
