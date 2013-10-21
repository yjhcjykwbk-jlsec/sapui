sap.ui.controller('ContactBook.memberListTree', {

  /**
   * Called when a controller is instantiated and its View controls (if
   * available) are already created. Can be used to modify the View before it is
   * displayed, to bind event handlers and do other one-time initialization.
   * 
   * @memberOf ContactBook.memberListTree
   */
  /**
   * Similar to onAfterRendering, but this hook is invoked before the
   * controller's View is re-rendered (NOT before the first rendering! onInit()
   * is used for that one!).
   * 
   * @memberOf ContactBook.memberListTree
   */
  // onBeforeRendering: function () {
  //
  // },
  /**
   * Called when the View has been rendered (so its HTML is part of the
   * document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * 
   * @memberOf ContactBook.memberListTree
   */
  // onAfterRendering: function () {
  //
  // },
  /**
   * Called when the Controller is destroyed. Use this one to free resources and
   * finalize activities.
   * 
   * @memberOf ContactBook.memberListTree
   */
  // onExit: function () {
  //
  // }
  /*
   * fill the tree-view with the oPersonList
   * oTree is the tree-view, oPersonList is the member list data
   */
  setMemberListTreeView : function (oTree, oPersonList) {
    // var oModel = new sap.ui.model.json.JSONModel(PERSON_LIST);
    // var oNode=new sap.ui.commons.TreeNode({
    // text : '{name}',
    // icon : 'image/system.jpg',
    // selected : function () {
    // },
    // extension:
    // [
    // {number:'{number}'}
    // ]
    // });
    // this.node=oNode;
    // oTree.bindNodes('/', oNode);
    // oTree.setModel(oModel);
    var fillTreeNode = function (view, node) {
      if (view != oTree) {
        if (node.firstName) {
          view.setText(node.firstName + ' ' + node.lastName);
        }
        else {
          view.setText(node.name);
        }
        view.setIcon('image/system.jpg');
        if (node.number) {
          view.data('number', node.number);
        }
      }
      var length = node.nodes ? node.nodes.length : 0;
      for (var index = 0; index < length ; index++) {//TODO
        var temp = new sap.ui.commons.TreeNode();
        view.addNode(temp);
        fillTreeNode(temp, node.nodes[index]);
      }
    };
    fillTreeNode(oTree, oPersonList);
    return oTree;
  },
  /*
   * search the person using his name and highlight it 
   */
  searchPerson: function (oPersonDetailsList, name) {
    var oPerson = _.find(oPersonDetailsList, function (s) {
      return s.name == name;
    });
    console.log(oPerson);
  }
});
