sap.ui.jsview('ContactBook.personInfoForm', {

  /**
   * Specifies the Controller belonging to this View. In the case that it is not
   * implemented, or that 'null' is returned, this View does not have a
   * Controller.
   * 
   * @memberOf ContactBook.personInfoForm
   */
  getControllerName : function () {
    return 'ContactBook.personInfoForm';
  },

  /**
   * create person information's form view
   * 
   * @memberOf ContactBook.personInfoForm
   */
  createContent : function (oController) {

    var oLayout1 = new sap.ui.layout.form.GridLayout();
    var oLayout2 = new sap.ui.layout.form.ResponsiveGridLayout();
    var oForm = new sap.ui.layout.form.Form({
      title : 'Person Detail Info',
      layout : oLayout1,
      formContainers : [
          new sap.ui.layout.form.FormContainer('F1C1', {
            title : 'Person data',
            formElements : [
                new sap.ui.layout.form.FormElement({
                  fields : [ new sap.ui.commons.Image({
                    src : '{/image}',
                    width : '100px',
                    layoutData : new sap.ui.core.VariantLayoutData({
                      multipleLayoutData : [
                          new sap.ui.layout.ResponsiveFlowLayoutData({
                            minWidth : 110
                          }), new sap.ui.layout.form.GridElementData({
                            hCells : '2',
                            vCells : 5
                          }), new sap.ui.layout.GridData({
                            span : 'L1 M1 S12'
                          }) 
                        ]
                    })
                  }) ],
                  layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                    weight : 4,
                    margin : false
                  })
                }),
                new sap.ui.layout.form.FormElement({
                  label : new sap.ui.commons.Label({
                    text : 'name',
                    layoutData : new sap.ui.core.VariantLayoutData({
                      multipleLayoutData : [
                          new sap.ui.layout.ResponsiveFlowLayoutData({
                            weight : 1
                          }), new sap.ui.layout.form.GridElementData({
                            hCells : '1'
                          }), new sap.ui.layout.GridData({
                            span : 'L1 M1 S12'
                          }) 
                        ]
                    })
                  }),
                  fields : [
                      new sap.ui.commons.Label({
                        text : '{/firstName}',
                        width : '40px',
                        layoutData : new sap.ui.core.VariantLayoutData({
                          multipleLayoutData : [
                              new sap.ui.layout.ResponsiveFlowLayoutData({
                                weight : 3
                              }), new sap.ui.layout.GridData({
                                span : 'L5 M5 S5'
                              }) 
                            ]
                        })
                      }),
                      new sap.ui.commons.Label({
                        text : '{/lastName}',
                        width : '40px',
                        layoutData : new sap.ui.core.VariantLayoutData({
                          multipleLayoutData : [
                              new sap.ui.layout.ResponsiveFlowLayoutData({
                                weight : 3
                              }), new sap.ui.layout.GridData({
                                span : 'L5 M5 S5'
                              })
                            ]
                        })
                      }) 
                    ],
                  layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                    linebreak : true,
                    margin : false
                  })
                }),
                new sap.ui.layout.form.FormElement({
                  label : new sap.ui.commons.Label({
                    text : 'Date of Birth',
                    layoutData : new sap.ui.core.VariantLayoutData({
                      multipleLayoutData : [
                          new sap.ui.layout.ResponsiveFlowLayoutData({
                            weight : 1
                          }), new sap.ui.layout.form.GridElementData({
                            hCells : '1'
                          }) 
                        ]
                    })
                  }),
                  fields : [ new sap.ui.commons.DatePicker({
                    yyyymmdd : '19990909',
                    layoutData : new sap.ui.core.VariantLayoutData({
                      multipleLayoutData : [
                          new sap.ui.layout.ResponsiveFlowLayoutData({
                            weight : 4
                          }), new sap.ui.layout.form.GridElementData({
                            hCells : '3'
                          })
                        ]
                    })
                  }) ],
                  layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                    linebreak : true,
                    margin : false
                  })
                }),
                new sap.ui.layout.form.FormElement({
                  label : new sap.ui.commons.Label({
                    text : 'Gender',
                    layoutData : new sap.ui.core.VariantLayoutData({
                      multipleLayoutData : [
                          new sap.ui.layout.ResponsiveFlowLayoutData({
                            weight : 1
                          }), new sap.ui.layout.form.GridElementData({
                            hCells : '1'
                          })
                        ]
                    })
                  }),
                  fields : [ new sap.ui.commons.RadioButtonGroup({
                    items : [ new sap.ui.core.Item({
                      text : 'male'
                    }), new sap.ui.core.Item({
                      text : 'female'
                    }) ],
                    layoutData : new sap.ui.core.VariantLayoutData({
                      multipleLayoutData : [
                          new sap.ui.layout.ResponsiveFlowLayoutData({
                            weight : 4
                          }), new sap.ui.layout.form.GridElementData({
                            vCells : 2
                          })
                        ]
                    })
                  }) ]
                })
              ],
            layoutData : new sap.ui.core.VariantLayoutData({
              multipleLayoutData : [ new sap.ui.layout.GridData({
                span : 'L12 M12 S12'
              }) ]
            })
          }),
          new sap.ui.layout.form.FormContainer('F1C2', {
            title : new sap.ui.core.Title({
              text : 'Address',
              tooltip : 'Address data'
            }),
            formElements : [
                new sap.ui.layout.form.FormElement({
                  label : 'Street / Number',
                  fields : [
                      new sap.ui.commons.Label({
                        text : '...',
                        layoutData : new sap.ui.core.VariantLayoutData({
                          multipleLayoutData : [
                              new sap.ui.layout.ResponsiveFlowLayoutData({
                                weight : 3
                              }), new sap.ui.layout.form.GridElementData({
                                hCells : '3'
                              })
                            ]
                        })
                      }),
                      new sap.ui.commons.Label({
                        text : '{/streetNum}',
                        width : '3em',
                        layoutData : new sap.ui.core.VariantLayoutData({
                          multipleLayoutData : [
                              new sap.ui.layout.ResponsiveFlowLayoutData({
                                weight : 1
                              }), new sap.ui.layout.form.GridElementData({
                                hCells : '2'
                              }), new sap.ui.layout.GridData({
                                span : 'L2 M2 S12'
                              })
                            ]
                        })
                      })
                    ]
                }), new sap.ui.layout.form.FormElement({
                  label : new sap.ui.commons.Label({
                    text : 'Zip Code / City',
                    layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                      weight : 2
                    })
                  }),
                  fields : [ new sap.ui.commons.Label({
                    text : '{/zipcode}',
                    layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                      weight : 1
                    })
                  }), new sap.ui.commons.Label({
                    text : '{/city}',
                    layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                      weight : 2
                    })
                  }) ],
                  layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                    linebreak : true,
                    margin : false
                  })
                }), new sap.ui.layout.form.FormElement({
                  label : new sap.ui.commons.Label({
                    text : 'Country',
                    layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                      weight : 2
                    })
                  }),
                  fields : [ new sap.ui.commons.Label({
                    text : '{/country}',
                    layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                      weight : 3
                    })
                  }) ]
                })
              ],
            layoutData : new sap.ui.core.VariantLayoutData({
              multipleLayoutData : [
                  new sap.ui.layout.ResponsiveFlowLayoutData({
                    linebreak : true,
                    minWidth : 150
                  }), new sap.ui.layout.form.GridContainerData({
                    halfGrid : true
                  }), new sap.ui.layout.GridData({
                    linebreakL : true
                  })
                ]
            })
          }),
          new sap.ui.layout.form.FormContainer('F1C3', {
            title : 'contact',
            expandable : true,
            formElements : [ new sap.ui.layout.form.FormElement({
              label : 'Phone Number',
              fields : [ new sap.ui.commons.Label({
                text : '{/phoneNum}',
                layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                  weight : 4
                })
              }) ],
              layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                linebreak : true,
                margin : false
              })
            }), new sap.ui.layout.form.FormElement({
              label : 'Mobile',
              fields : [ new sap.ui.commons.Label({
                text : '{/mobile}',
                layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                  weight : 4
                })
              }) ],
              layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                linebreak : true,
                margin : false
              })
            }), new sap.ui.layout.form.FormElement({
              label : 'Email',
              fields : [ new sap.ui.commons.Label({
                text : '{/email}',
                layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                  weight : 4
                })
              }) ],
              layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                linebreak : true,
                margin : false
              })
            }) ],
            layoutData : new sap.ui.core.VariantLayoutData({
              multipleLayoutData : [ new sap.ui.layout.form.GridContainerData({
                halfGrid : true
              }), new sap.ui.layout.ResponsiveFlowLayoutData({
                minWidth : 150
              }), new sap.ui.layout.GridData({
                linebreakL : false
              }) ]
            })
          }),
          new sap.ui.layout.form.FormContainer('F1C4', {
            title : 'choose LayoutData',
            formElements : [ new sap.ui.layout.form.FormElement({
              label : 'LayoutData',
              fields : [ new sap.ui.commons.RadioButtonGroup({
                columns : 3,
                items : [ new sap.ui.core.Item('I1', {
                  text : 'GridLayout'
                }), new sap.ui.core.Item('I2', {
                  text : 'ResponsiveGridLayout'
                }) ],
                layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({
                  weight : 9
                }),
                select : function (oEvent) {
                  var oForm = sap.ui.getCore().byId('F1');
                  if (oEvent.getParameter('selectedIndex') === 0) {
                    oForm.setLayout(oLayout1);
                  } else if (oEvent.getParameter('selectedIndex') === 1) {
                    oForm.setLayout(oLayout2);
                  }
                }
              }) ]
            })],
            layoutData : new sap.ui.core.VariantLayoutData({
              multipleLayoutData : [
                  new sap.ui.layout.ResponsiveFlowLayoutData({
                    linebreak : true
                  }), new sap.ui.layout.GridData({
                    linebreakL : true,
                    span : 'L12 M12 S12'
                  })
                ]
            })
          })
        ]
    });
    oForm.addStyleClass('box');
    Window.oForm = oForm;
    return oForm; 
  }
});
