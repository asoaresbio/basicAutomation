import dados from '../fixtures/dados.json'
import massaConta from '../fixtures/massaConta.json'

class MinhaConta{

    validaPedidos(){
        //valida request orders
        cy.request('/api/myaccount/orders?page=1').then((response) => {
            expect(response.status).to.eq(200)
            expect(response).to.have.property('headers')
        })

        //valida request protocols
        cy.request('/api/myaccount/protocols').then((response) => {
            expect(response.status).to.eq(200)
            expect(response).to.have.property('headers')
        })

        cy.contains('Detalhes do pedido').click()
        cy.wait(2000)
        cy.contains('Resumo do pedido').should('be.visible')
        cy.contains('Endereço de entrega').should('be.visible')
        cy.contains('Forma de pagamento').should('be.visible')
    }

    validaCadastro(){
        //entra em cadastro
        cy.contains('Cadastro').click()
        
        //valida request customer
        cy.request('/api/myaccount/customer').then((response) => {
            expect(response.status).to.eq(200)
            expect(response).to.have.property('headers')
        })

        cy.contains('Alterar senha').should('be.visible')

        //valida campos obrigatórios
        cy.get(massaConta.campoNomeCompleto).click()
        cy.focused().clear()
        cy.get(massaConta.botaoSalvaAlteracoes).click()
        cy.contains('Este campo é obrigatório.').should('be.visible')
        cy.get(massaConta.campoNomeCompleto).type(massaConta.nomeAlteracao)

        cy.get(massaConta.campoCep).click()
        cy.focused().clear()
        cy.get(massaConta.botaoSalvaAlteracoes).click()
        cy.contains('Este campo é obrigatório.').should('be.visible')
        cy.wait(3000)

        //edita nome completo e celular
        cy.get(massaConta.campoNomeCompleto).click()
        cy.focused().clear()
        cy.get(massaConta.campoNomeCompleto).type(massaConta.nomeAlteracao)

        cy.get(massaConta.campoCelular).click()
        cy.focused().clear()
        cy.get(massaConta.campoCelular).type(dados.celularAlteracao)

        //edita cep e número
        cy.get(massaConta.campoCep).click()
        cy.focused().clear()
        cy.get(massaConta.campoCep).type(dados.cep)
        cy.get(massaConta.validaCep).click()

        var campoNumero = 'input[id="Número * "]';
        cy.get(campoNumero).click()
        cy.focused().clear()
        cy.get(campoNumero).type(massaConta.numeroAlteracao)

        //salva alteracoes
        cy.get(massaConta.botaoSalvaAlteracoes).click()
        cy.wait(1000)
        cy.get(massaConta.botaoSalvaAlteracoes).click()
        cy.wait(3000)
        cy.contains('Alterações salvas com sucesso!').should('be.visible')

        
        //volta para os dados anteriores
        //edita nome completo e celular
        cy.get(massaConta.campoNomeCompleto).click()
        cy.focused().clear()
        cy.get(massaConta.campoNomeCompleto).type(massaConta.nome)

        cy.get(massaConta.campoCelular).click()
        cy.focused().clear()
        cy.get(massaConta.campoCelular).type(dados.celular)

        //edita cep e número
        cy.get(massaConta.campoCep).click()
        cy.focused().clear()
        cy.get(massaConta.campoCep).type(dados.cep)
        cy.get(massaConta.validaCep).click()

        // var campoNumero = 'input[id="Número * "]';
        cy.get(campoNumero).click()
        cy.focused().clear()
        cy.get(campoNumero).type(massaConta.numero)

        //salva alteracoes
        cy.get(massaConta.botaoSalvaAlteracoes).click()
        cy.wait(3000)
        //precisou duplicar pq estamos com um bug aqui
        cy.get(massaConta.botaoSalvaAlteracoes).click()
        cy.wait(3000)
        cy.contains('Alterações salvas com sucesso!').should('be.visible')
    }

    validaEnderecos(){
        //entra em enderecos
        cy.contains('Endereços').click()
        // cy.wait(10000)

        //valida request address
        cy.request('/api/myaccount/address?id=14237210').then((response) => {
            expect(response.status).to.eq(200)
            expect(response).to.have.property('headers')
        })

        //cadastro
        cy.get('.cav--c-lesPJm > .cav--c-iOefvc').click()
        cy.get('input[id="CEP *"]').type(dados.cepAlteracao)
        cy.get('input[id="Número *"').click()
        cy.wait(3000)
        cy.get('input[id="Número *"').type(massaConta.numeroAlteracao)
        cy.get('div.cav--c-jPOnVL > .cav--c-gqwkJN').click(700, 20)
        cy.contains('Este campo é obrigatório').should('be.visible')
        cy.get('input[id="Celular *"').click()
        cy.get('input[id="Celular *"').type(dados.celularAlteracao)
        cy.get('div.cav--c-jPOnVL > .cav--c-gqwkJN').click(700, 20)
        cy.contains('Este campo é obrigatório').should('be.visible')
        cy.get('input[id="Apelido do endereço (Ex.: Casa, Escritório) *"').click()
        cy.get('input[id="Apelido do endereço (Ex.: Casa, Escritório) *"').type(massaConta.apelidoEndereco)
        cy.get('div.cav--c-jPOnVL > .cav--c-gqwkJN').click(700, 20)
        cy.contains('Endereço cadastrado com sucesso!').should('be.visible')

        //edição
        cy.get(':nth-child(3) > .cav--c-jSaomM > :nth-child(2) > .cav--c-gqwkJN-bZmKkd-justifyContent-end > .cav--c-gRgNGr-iisUFNU-css > span').click()
        cy.wait(3000)
        cy.get('input[id="Apelido do endereço (Ex.: Casa, Escritório) *"').dblclick()
        cy.wait(3000)
        cy.focused().clear()
        cy.get('input[id="Apelido do endereço (Ex.: Casa, Escritório) *"').type(massaConta.apelidoEnderecoEdicao)
        cy.wait(3000)
        cy.get('div.cav--c-jPOnVL > .cav--c-gqwkJN').dblclick(700, 20)
        cy.contains('Alterações salvas com sucesso').should('be.visible')
        cy.wait(3000)
        //erro ao editar endereço em STG

        //excluir
        cy.get(':nth-child(3) > .cav--c-jSaomM').click(170, 200)
        cy.get('div.cav--c-jPOnVL > .cav--c-gqwkJN').click(700, 20)
        cy.contains('Endereço excluído com sucesso!').should('be.visible')
        cy.wait(2000)
    }

    validaCarteira(){
        //entra em carteira
        cy.contains('Meus saldos').click()
        cy.wait(2000)

        //valida request de saldos e cartoes
        cy.request('api/myaccount/wallet/statement').then((response) => {
            expect(response.status).to.eq(200)
        })
        cy.request('api/myaccount/wallet/cards').then((response) => {
            expect(response.status).to.eq(200)
        })

        //saldos
        cy.contains('CASHBACK').should('be.visible')
        cy.contains('SALDO').should('be.visible')
        cy.get(':nth-child(2) > .cav--c-gqwkJN-iifnwqf-css > .cav--c-iOefvc').invoke('removeAttr', 'target').click()
        cy.contains('O que é Cashback Madeira?').should('be.visible')
        cy.go('back')
        
        //cadastro cartao
        cy.contains('Cartões').click()
        cy.get('.cav--c-eNhzRw > .cav--c-iOefvc').click()
        cy.wait(1000)
        cy.get('input[id="Número do cartão *"]').type('5515396903733805')
        cy.get('input[id="CPF/CNPJ *"]').type('40562280006')
        cy.get('input[id="Nome do titular *"]').type('Teste Automacao')
        cy.get('input[id="Validade *"]').type('102024')
        cy.get('input[id="CVV *"]').type('212')
        cy.get('.cav--c-eNhzRw-haoIVm-lg-7 > .cav--c-iOefvc').click()
        cy.wait(1000)
        cy.contains('Seu cartão será validado em instantes.').should('be.visible')

        //excluir cartao
        cy.wait(1000)
        cy.get('.cav--c-lesPJm-idSdXsb-css > :nth-child(3) > .cav--c-NWoMl > .cav--c-juwjGQ').click()
        cy.get(':nth-child(3) > .cav--c-NWoMl > .cav--c-iruLYN > form > .cav--c-gqwkJN-idRcJQf-css > .cav--c-gqwkJN > .cav--c-iOefvc').click()
        cy.get('.cav--c-jPOnVL > .cav--c-gqwkJN').click('center')
        cy.wait(2000)
        cy.contains('Cartão excluído com sucesso.').should('be.visible')

        //valida campos obrigatórios
        cy.get('.cav--c-eNhzRw > .cav--c-iOefvc').click()
        cy.wait(1000)
        cy.get('.cav--c-eNhzRw-haoIVm-lg-7 > .cav--c-iOefvc').click()
        cy.contains('Este campo é obrigatório').should('be.visible')
        cy.get('input[id="Número do cartão *"]').type('5515396903733805')
        cy.get('.cav--c-eNhzRw-haoIVm-lg-7 > .cav--c-iOefvc').click()
        cy.contains('Este campo é obrigatório').should('be.visible')
        cy.get('input[id="CPF/CNPJ *"]').type('40562280006')
        cy.get('.cav--c-eNhzRw-haoIVm-lg-7 > .cav--c-iOefvc').click()
        cy.contains('Este campo é obrigatório').should('be.visible')
        cy.get('input[id="Nome do titular *"]').type('Teste Automacao')
        cy.get('.cav--c-eNhzRw-haoIVm-lg-7 > .cav--c-iOefvc').click()
        cy.contains('Este campo é obrigatório').should('be.visible')
        cy.get('input[id="Validade *"]').type('102024')
        cy.get('.cav--c-eNhzRw-haoIVm-lg-7 > .cav--c-iOefvc').click()
        cy.contains('Este campo é obrigatório').should('be.visible')
        cy.get('input[id="CVV *"]').type('212')
        cy.get('.cav--c-eNhzRw-haoIVm-lg-7 > .cav--c-iOefvc').click()
        cy.wait(2000)
        cy.contains('Seu cartão será validado em instantes.').should('be.visible')

        //excluir cartao
        cy.wait(2000)
        cy.get('.cav--c-lesPJm-idSdXsb-css > :nth-child(3) > .cav--c-NWoMl > .cav--c-juwjGQ').click()
        cy.get(':nth-child(3) > .cav--c-NWoMl > .cav--c-iruLYN > form > .cav--c-gqwkJN-idRcJQf-css > .cav--c-gqwkJN > .cav--c-iOefvc').click()
        cy.get('.cav--c-jPOnVL > .cav--c-gqwkJN').click('center')
        cy.wait(2000)
        cy.contains('Cartão excluído com sucesso.').should('be.visible')
    }

    validaFavoritos(){
        cy.contains('Favoritos').click()
        cy.wait(2000)
        cy.contains('Meus Favoritos').should('be.visible')
        cy.go('back')
        cy.wait(2000)
    }

    validaPrivacidade(){
        // cy.contains('Privacidade').click()
        cy.get('.cav--c-lesPJm-iciAXQH-css > .cav--c-lesPJm-idSdXsb-css').click(100, 550)
        cy.wait(2000)
        cy.contains('Excluir conta').should('be.visible')
    }

}

export default new MinhaConta;