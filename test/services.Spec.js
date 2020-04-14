define(['viewModels/services'], function(ServicesViewModel) {  
    let swm = new ServicesViewModel();  
    describe('Module initilazed', function(){
        it("Module exists", function() {
            expect(ServicesViewModel).toBeDefined();
        });
    })  
    describe('Module methods initilazed', function(){
        it("Module exists", function() {
            expect(swm.connected).toBeDefined();            
            expect(swm.disconnected).toBeDefined();            
            expect(swm.transitionCompleted).toBeDefined();            
        });
    })  
    describe('Document title initilazed', function(){
        it("Set title", function() {
            swm.setTitle('Services');
            expect(document.title).toBe('Services');                        
        });
    })  
    describe('Module transitionCompleted', function(){
        beforeEach(function() {
            spyOn(swm, 'setCustomer');
        });

        it("TransitionCompleted ", function() {            
            expect(swm.router).toBeUndefined();                        
            expect(swm.params).toBeUndefined();
            swm.transitionCompleted();
            expect(swm.router).toBeDefined();
            expect(swm.params).toBeDefined();
            expect(swm.setCustomer).toHaveBeenCalled();            
        });
    }) 

    describe('Module setCustomer', function(){ 
        it("sets the customer properties", function() { 
            expect(swm.customerId()).toBeFalsy();             
            expect(swm.customerName()).toBeFalsy();
            swm.setCustomer('id','name');
            expect(swm.customerId()).toBe('id');              
            expect(swm.customerName()).toBe('name');              
        });
    }) 
});