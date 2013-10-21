sap.ui.jsview('ContactBook.deptTable', {

  /**
   * Specifies the Controller belonging to this View. In the case that it is not
   * implemented, or that 'null' is returned, this View does not have a
   * Controller.
   *
   * @memberOf ContactBook.deptTable
   */
  getControllerName: function () {
    return 'ContactBook.deptTable';
  },

  /**
   * Is initially called once after the Controller has been instantiated. It is
   * the place where the UI is constructed. Since the Controller is given to
   * this method, its event handlers can be attached right away.
   *
   * @memberOf ContactBook.deptTable
   */
  createContent: function (oController) {
    // Create an instance of the table control
    var oTable = new sap.ui.table.Table({
      title: 'DEPT MEMBER LIST',
      visibleRowCount: 7,
      firstVisibleRow: 3,
      selectionMode: sap.ui.table.SelectionMode.Single,
      toolbar: new sap.ui.commons.Toolbar({
        items: [new sap.ui.commons.Button({
          text: 'add person',
          // press the 'add person' button to add a new person
          press: function () {
            // oTable.setVisible(false);
          }
        }), new sap.ui.commons.Button({
          text: 'delete person',
          // press the 'add person' button to delete selected row and the
          // corresponding person
          press: function () {
            var selection = this.getSelectedIndices();
            console.log(selection);
            this.clearSelection(selection);
          }
        }), new sap.ui.commons.Button({
          text: 'display person',
          // press the 'add person' button to delete selected row and the
          // corresponding person
          press: function () {
            var selection = this.getSelectedIndices();
            console.log(selection);
          }
        })]
      })
    });

    // Define the columns and the control templates to be used
    var oColumn = new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: 'Last Name'
      }),
      template: new sap.ui.commons.TextView().bindProperty('text',
        'lastName'),
      sortProperty: 'lastName',
      filterProperty: 'lastName',
      width: '200px'
    });
    var oCustomMenu = oColumn.getMenu();
    Window.oCustomMenu = oCustomMenu; // for test
    oCustomMenu.addItem(new sap.ui.commons.MenuItem({
      text: 'customer selection'
    }));
    oColumn.setMenu(oCustomMenu.addItem(new sap.ui.commons.MenuItem({
      text: 'customer selection',
      select: function () { // here to add some customer selection
      }
    })));
    oTable.addColumn(oColumn);

    oTable.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: 'First Name'
      }),
      template: new sap.ui.commons.TextField().bindProperty('value',
        'firstName'),
      sortProperty: 'firstName',
      filterProperty: 'firstName',
      width: '100px'
    }));
    oTable.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: 'Web Site'
      }),
      template: new sap.ui.commons.Link().bindProperty('text', 'firstName')
        .bindProperty('href', 'href'),
      sortProperty: 'firstName',
      filterProperty: 'firstName'
    }));
    oTable.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: 'Checked'
      }),
      template: new sap.ui.commons.CheckBox(), // .bindProperty('checked','checked'),
      sortProperty: 'checked',
      filterProperty: 'checked',
      width: '75px',
      hAlign: 'Center'
    }));

    oTable.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: 'Image'
      }),
      template: new sap.ui.commons.Image().bindProperty('src', 'image'),
      width: '75px',
      hAlign: 'Center'
    }));
    oTable.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: 'Gender'
      }),
      template: new sap.ui.commons.ComboBox({
        items: [new sap.ui.core.ListItem({
          text: 'female'
        }), new sap.ui.core.ListItem({
          text: 'male'
        })]
      }).bindProperty('value', 'gender'),
      sortProperty: 'gender',
      filterProperty: 'gender'
    }));
    oTable.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: 'Rating'
      }),
      template: new sap.ui.commons.RatingIndicator().bindProperty('value',
        'rating'),
      sortProperty: 'rating',
      filterProperty: 'rating'
    }));
    // bind the table to data model
    oTable.bindRows('/');
    // add some customer css style to the table
    oTable.addStyleClass('box');
    oController.initView(PERSON_DETAILS);
    return oTable;
  }
});