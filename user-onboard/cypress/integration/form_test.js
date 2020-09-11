

describe("Form Test", () => {
  let name = 'Mohamed';
  let email = 'mohamed.essmaali@gmail.com';
  
    it("Testing our form",() => {
      cy.visit("/")
    
    // it("Testing Name", () => {
      cy.get('[data-cy=name]').type(name).should('have.value',name);
    // })
    // it('testing Email',()=>{
      cy.get('[data-cy=email]').type(email).should('have.value',email);
    // })
    // it('testing Password',()=>{
      cy.get('[data-cy=password]').type('123456').should('have.value','123456');
    // })
    // it('testing Terms',()=>{

      // cy.get('[data-cy=terms]').check().should('be.checked');
      cy.get('[data-cy=terms]').click().should('have.checked',true)
    // })
    // it('testing Role selection',()=>{
      cy.get('[data-cy=role]').select('designer').should('have.value','designer');
  
    // it('testing submit button',()=>{
      cy.get('[data-cy=submit]').should('not.be.disabled');
      
    })
    it('error messages are displayed properly',()=>{
      cy.get('[data-cy=email]').clear();
      cy.get('[data-cy=email-error]').contains('')
    
    })
    
  })