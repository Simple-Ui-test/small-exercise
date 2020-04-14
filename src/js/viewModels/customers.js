/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define(['accUtils',
'knockout', 
'ojs/ojarraydataprovider', 
'ojs/ojconverter-number',
'ojs/ojknockout', 
'ojs/ojtable', 
'ojs/ojbutton',
'ojs/ojrouter',
'ojs/ojinputtext',
'ojs/ojformlayout',
'ojs/ojdialog'
],
 function(accUtils, ko, ArrayDataProvider, converterNumber) {

    function CustomerViewModel() {
      var self = this;
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        accUtils.announce('Customers page loaded.');
        self.setDialog('modalDialog');
        self.setTitle("Customers");
        // Implement further logic if needed
      };

      self.setTitle = function(str){
        document.title = str
      }

      self.setDialog = function(id) {
        self.modalDialog = document.getElementById(id);
      }

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };


      /**
       * Customer List
       */

      self.columnArray = [
        {headerText: "Name", field: "name"},
        {headerText: "City", field: "city"},
        {headerText: "Phone", field: "phone"},
        {headerText: "E-mail", field: "email"},
        {headerText: "Net income", field: "net_income", template: 'netIncomeCellTemplate', className: 'table--align-right', headerClassName: 'table--align-right'},
        {headerText: "Customer sites", field: "sites", template: 'siteCellTemplate'},
        {headerText: "Customer services", field: "_id", template: 'serviceCellTemplate'}     
      ];

      self.usdShortNumberConverter =
          new converterNumber.IntlNumberConverter({
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol'
          });

      self.activityDataProvider = ko.observable();  
      $.getJSON('api/mock/customer/customer_data.json').then(function(data) {          
          self.activityDataProvider(new ArrayDataProvider(data, { keyAttributes: '_id' }));
        }
      );


      /**
       * Customer Services
       */
      var router = oj.Router.rootInstance;
      self.showServices = function(event, data){
        router.store({customerId: data.row._id, customerName: data.row.name})
        router.go('services');
      }

      /**
       * Customer Sites
       */
      self.customerSites = ko.observableArray([]);      
      self.dialogDataProvider = new ArrayDataProvider(self.customerSites);
     
      self.closeCustomerSiteDialog = function (event) {
        self.modalDialog.close();
      };

      self.openCustomerSiteDialog = function (event, current) {         
        self.setCustomerSitesToShow(current);        
        self.modalDialog.setProperties({'dialogTitle': 'Customer sites: ' + current.row.name});
        self.modalDialog.open();       
      };

      self.setCustomerSitesToShow = function(current) {
        self.customerSites.removeAll();
        current.data.forEach(element => {
          self.customerSites.push(element)
        }); 
      }      
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return CustomerViewModel;
  }
);
