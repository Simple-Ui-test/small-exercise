define(['viewModels/about'], function(AboutViewModel) {  
    let awm = new AboutViewModel();  
    describe('Module initilazed', function(){
        it("Module exists", function() {
            expect(AboutViewModel).toBeDefined();
        });
    })  
    describe('Module methods initilazed', function(){
        it("Module exists", function() {
            expect(awm.connected).toBeDefined();            
            expect(awm.disconnected).toBeDefined();            
            expect(awm.transitionCompleted).toBeDefined();            
        });
    })  
    describe('Document title initilazed', function(){
        it("Set title", function() {
            awm.setTitle('About');
            expect(document.title).toBe('About');                        
        });
    })     
});