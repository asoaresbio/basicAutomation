import LoginPage from '../pages/LoginPage'
import MinhaConta from '../pages/MinhaContaPage'

describe('Regressivo minha conta', () => {

    it('regressivo minha conta', () => {

        //login
        LoginPage.loginValid()
        
        //pedidos
        MinhaConta.validaPedidos()

        //cadastro
        MinhaConta.validaCadastro()

        //enderecos
        MinhaConta.validaEnderecos()

        //carteira
        MinhaConta.validaCarteira()

        //favoritos
        MinhaConta.validaFavoritos()

        //privacidade
        MinhaConta.validaPrivacidade()

    })

})