define(['viewModels/customers'], function(CustomerViewModel) {  
    let cwm = new CustomerViewModel();  
    describe('Module initilazed', function(){
        it("Module exists", function() {
            expect(CustomerViewModel).toBeDefined();
        });
    })  
    describe('Module methods initilazed', function(){
        it("Module exists", function() {
            expect(cwm.connected).toBeDefined();            
            expect(cwm.disconnected).toBeDefined();            
            expect(cwm.transitionCompleted).toBeDefined();            
            expect(cwm.showServices).toBeDefined();            
            expect(cwm.setDialog).toBeDefined();            
            expect(cwm.closeCustomerSiteDialog).toBeDefined();            
            expect(cwm.openCustomerSiteDialog).toBeDefined();            
        });
    })  
    describe('Document title initilazed', function(){
        it("Set title", function() {
            cwm.setTitle('Customers');
            expect(document.title).toBe('Customers');                        
        });
    })   
    describe('Set customer sites', function(){
        it("Set works properly ", function() {      
            let current = {
                data: [
                    {zip: '1234', city: 'city', house_number: 10, street: 'street'}
                ]
            }
            expect(cwm.setCustomerSitesToShow).toBeDefined();            
            expect(cwm.customerSites()).toEqual([]);    
            
            cwm.setCustomerSitesToShow(current);         
            expect(cwm.customerSites()).toEqual([{zip: '1234', city: 'city', house_number: 10, street: 'street'}]);    
        });
    })   
});