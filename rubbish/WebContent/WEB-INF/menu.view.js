sap.ui.jsview("ContactBook.menu", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf teamtable.menu
	*/ 
	getControllerName : function() {
		return "ContactBook.menu";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf teamtable.menu
	*/ 
	createContent : function(oController) {
		//Create the menu
		var createMenu = function(menuText) {
			var oMenu1 = new sap.ui.commons.Menu({
				ariaDescription : "Special Button Menu",
				tooltip : "Menu containing special button actions"
			});
			//Create the items and add them to the menu
			var oMenuItem1 = new sap.ui.commons.MenuItem({
				text : menuText,
				tooltip : menuText+".",
				select : function() {
					alert('Alert from ' + menuText);
				}
			});
			oMenu1.addItem(oMenuItem1);
			return oMenu1;
		};
		
		var oButtons=[];
		
		//Create an emphasized SplitButton
		var oSplitButton = oButtons[0] = new sap.suite.ui.commons.SplitButton({
			text : "Emphasized",
			style : sap.ui.commons.ButtonStyle.Emph
		});
		// set the menu
		oSplitButton.setMenu(createMenu("Emphasized"));
		// attach it to some element in the page
		//oSplitButton.placeAt("sample5");

		//Create an accept SplitButton
		oSplitButton  = oButtons[1]= new sap.suite.ui.commons.SplitButton({
			text : "Accept",
			style : sap.ui.commons.ButtonStyle.Accept
		});
		// set the menu
		oSplitButton.setMenu(createMenu("Accept"));
		// attach it to some element in the page
		//oSplitButton.placeAt("sample5");

		//Create an reject SplitButton
		oSplitButton  = oButtons[2] = new sap.suite.ui.commons.SplitButton({
			text : "Reject",
			style : sap.ui.commons.ButtonStyle.Reject
		});
		// set an empty menu
		oSplitButton.setMenu(createMenu("Reject"));
		// attach it to some element in the page
		//oSplitButton.placeAt("sample5");
		return oButtons;//oSplitButton;
	}
});
