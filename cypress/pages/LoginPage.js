import dados from '../fixtures/dados.json'


class LoginPage {

    loginValid() {
        //acessa a minha conta
        cy.visit('/verificar?url=/minha-conta/pedidos')
        
        //email
        cy.get('#E-mail').click()
        cy.get('#E-mail').type(dados.email)
        cy.get('.cav--c-lesPJm-inYitO-css > .cav--c-iOefvc').click()
        //senha
        cy.get('#Senha').click()
        cy.get('#Senha').type(dados.password)
        cy.get('form > .cav--c-iOefvc').click()
        cy.wait(25000)

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })

        //cookies
        cy.get('.cav--c-jMjsKv > .cav--c-iOefvc').click()
        cy.wait(2000)
    }

}

export default new LoginPage;