/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your services ViewModel code goes here
 */
define(['accUtils',
  'knockout',  
  'ojs/ojarraydataprovider', 
  'ojs/ojknockout', 
  'ojs/ojgantt',
  'ojs/ojrouter'],
 function(accUtils, ko, ArrayDataProvider) {

    function ServicesViewModel() {
      var self = this;

      self.router;
      self.params;
      self.customerId = ko.observable('');
      self.customerName = ko.observable('');

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
        accUtils.announce('Services page loaded.');
        self.setTitle("Services");
        // Implement further logic if needed
      };

      self.setTitle = function(str){
        document.title = str
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
        self.router = oj.Router.rootInstance;
        self.params = self.router.retrieve();
        if(!self.params) {
          self.params = {
            customerId: "NA",
            customerName: "NA"
          }
        }               
        self.setCustomer(self.params.customerId, self.params.customerName);
        self.router.store();
      };

      self.setCustomer = function (customerId, customerName){
        self.customerId(customerId);
        self.customerName(customerName); 
      } 

      /**
       * Service list Gantt
       */

      self.projectStartDate = new Date("Jan 1, 2020").toISOString();
      self.projectEndDate = new Date("Aug 31, 2020").toISOString();
      self.viewportStart = new Date("Jan 1, 2020").toISOString();
      self.viewportEnd = new Date("Jul 10, 2020").toISOString();      

      self.activityDataProvider = ko.observable();  
      $.getJSON('api/mock/services/service_data.json').then(function(data) {          
          self.activityDataProvider(new ArrayDataProvider(data, { keyAttributes: 'id' }));
        }
      );
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return ServicesViewModel;
  }
);
