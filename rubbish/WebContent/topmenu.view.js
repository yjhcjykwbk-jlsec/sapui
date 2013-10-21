sap.ui.jsview("ContactBook.topmenu", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf teamtable.topmenu
	*/ 
	getControllerName : function() {
		return "ContactBook.topmenu";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf teamtable.topmenu
	*/ 
	createContent : function(oController) {
		//Function to handle the select event of the items
		var handleSelect = function(oEvent){
			alert(oEvent.getParameter("item").getId());
		};

		// Create a menu bar instance
		var oMenuBar = new sap.ui.commons.MenuBar("menuBar");
		// Create two main menu items for the menubar - for which you define subitems lateron
		var oMenuBarItem1 = new sap.ui.commons.MenuItem("menuBar-item-1",{text:"Project"});
		oMenuBar.addItem(oMenuBarItem1);
		var oMenuBarItem2 = new sap.ui.commons.MenuItem("menuBar-item-2",{text:"Roles", enabled: false});
		oMenuBar.addItem(oMenuBarItem2);

		// Create a menu instance for the "Project" menu
		var oMenu1 = new sap.ui.commons.Menu("menu1");
		oMenuBarItem1.setSubmenu(oMenu1);

		// Create and add five sub-items for the "Project" menu
		var oMenuItem1 = new sap.ui.commons.MenuItem("item1-1",{text:"Open the project with the highest priority"});
		oMenu1.addItem(oMenuItem1);
		oMenuItem1.attachSelect(handleSelect);
		var oMenuItem2 = new sap.ui.commons.MenuItem("item1-2",{text:"Link to the project with the highest priority ..."});
		oMenu1.addItem(oMenuItem2);
		oMenuItem2.attachSelect(handleSelect);
		var oMenuItem3 = new sap.ui.commons.MenuItem("item1-3",{text:"Save", enabled: false});
		oMenu1.addItem(oMenuItem3);
		var oMenuItem4 = new sap.ui.commons.MenuItem("item1-4",{text:"Show"});
		oMenu1.addItem(oMenuItem4);
		var oMenuItem5 = new sap.ui.commons.MenuItem("item1-5",{text:"Properties"});
		oMenu1.addItem(oMenuItem5);
		oMenuItem5.attachSelect(handleSelect);

		//Create a sub menu for item "Show"
		var oMenu2 = new sap.ui.commons.Menu("menu2");
		oMenuItem4.setSubmenu(oMenu2);
		var oMenuItem6 = new sap.ui.commons.MenuItem("item2-1",{text:"Tasks"});
		oMenu2.addItem(oMenuItem6);
		oMenuItem6.attachSelect(handleSelect);
		var oMenuItem7 = new sap.ui.commons.MenuItem("item2-2",{text:"Responsibilities"});
		oMenu2.addItem(oMenuItem7);
		oMenuItem7.attachSelect(handleSelect);
		var oMenuItem8 = new sap.ui.commons.MenuItem("item2-3",{text:"Details"});
		oMenu2.addItem(oMenuItem8);
		oMenuItem8.attachSelect(handleSelect);
		var oMenuItem9 = new sap.ui.commons.MenuItem("item2-4",{text:"Properties"});
		oMenu2.addItem(oMenuItem9);
		oMenuItem9.attachSelect(handleSelect);

		// Attach the menubar to the page
		return oMenuBar;
	}

});
