sap.ui.jsview('ContactBook.indexShell', {

  /**
   * Specifies the Controller belonging to this View. In the case that it is not
   * implemented, or that 'null' is returned, this View does not have a
   * Controller.
   * 
   * @memberOf ContactBook.indexShell
   */
  getControllerName : function () {
    return 'ContactBook.indexShell';
  },

  /**
   * Is initially called once after the Controller has been instantiated. It is
   * the place where the UI is constructed. Since the Controller is given to
   * this method, its event handlers can be attached right away.
   * 
   * @memberOf ContactBook.indexShell
   */
  createContent : function (oController) {
    var indexLabel = new sap.ui.commons.Label('id-index-label', {
      text : 'Hello world'
    });
    console.log(oController);
    // create a shell, with three select-able items: index,humanInfo,other
    var oShell = new sap.ui.ux3.Shell({
      worksetItems : [ new sap.ui.ux3.NavigationItem({
        key : 'index',
        text : 'index'
      }), new sap.ui.ux3.NavigationItem({
        key : 'contactBook',
        text : 'Contact-Book'
      }), new sap.ui.ux3.NavigationItem({
        key : 'statics',
        text : 'statics'
      }), new sap.ui.ux3.NavigationItem({
        key : 'other',
        text : 'Other'
      }) ]
    });
    // views store the pages corresponding to each shell item
    var views = {};
    views.index = oController.getIndexPage();
    views.contactBook = oController.getContactBookPage();
    views.statics = oController.getStaticsPage();
    views.other = oController.getStaticsPage();
    // this event handler handles the item selection event
    oShell.attachWorksetItemSelected(function (evt) {
        var itemSelected = evt.getParameter('key');
        // show different page according to the item selected
        oShell.setContent(views[itemSelected]);
      }
    );
    oShell.setContent(indexLabel);
    return oShell;
  }

});
