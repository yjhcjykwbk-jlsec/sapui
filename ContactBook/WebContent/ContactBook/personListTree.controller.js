sap.ui.controller('ContactBook.personListTree', {

  /**
   * Called when a controller is instantiated and its View controls (if
   * available) are already created. Can be used to modify the View before it is
   * displayed, to bind event handlers and do other one-time initialization.
   * 
   * @memberOf ContactBook.personListTree
   */
  /**
   * Similar to onAfterRendering, but this hook is invoked before the
   * controller's View is re-rendered (NOT before the first rendering! onInit()
   * is used for that one!).
   * 
   * @memberOf ContactBook.personListTree
   */
  // onBeforeRendering: function () {
  //
  // },
  /**
   * Called when the View has been rendered (so its HTML is part of the
   * document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * 
   * @memberOf ContactBook.personListTree
   */
  // onAfterRendering: function () {
  //
  // },
  /**
   * Called when the Controller is destroyed. Use this one to free resources and
   * finalize activities.
   * 
   * @memberOf ContactBook.personListTree
   */
  // onExit: function () {
  //
  // }
  /**
   * Use this to render the tree-view with the oPersonList
   * @param oTree:  the tree-view
   * @param oPersonList : the person list data
   * 
   * @memberOf ContactBook.personListTree
   */
  setPersonListTreeView : function (oTree, oPersonList) {
    // this function recursively fill the oTree view with oPersonList data
    var fillTreeNode = function (view, node) {
      if (view != oTree) {
        if (node.firstName) {
          view.setText(node.firstName + ' ' + node.lastName);
        }
        else {
          view.setText(node.name);
        }
        view.setIcon('images/system.jpg');
        if (node.number) {
          view.data('number', node.number);
        }
      }
      var length = node.nodes ? node.nodes.length : 0;
      console.log(length);
      for (var index = 0; index < length ; index++) {//TODO
        var temp = new sap.ui.commons.TreeNode();
        view.addNode(temp);
        fillTreeNode(temp, node.nodes[index]);
      }
    };
    console.log("filltreenode");
    fillTreeNode(oTree, oPersonList);
    console.log(oTree);
    return oTree;
  }
});
