/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

   
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Esse é um teste de um longo texto sendo escrito com delay 0 apenas para teste. Esse é um teste de um longo texto sendo escrito com delay 0 apenas para teste '
        cy.get('#firstName').type('Junior')
        cy.get('#lastName').type('Camara')
        cy.get('#email').type('jcamarawork@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })


   
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Junior')
        cy.get('#lastName').type('Camara')
        cy.get('#email').type('jcamarawork@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
    
        cy.get('.error').should('be.visible')
    })
   
    //Exercício 3 Validação de apenas numero no campo de telefone 
    it('campo de telefone continua vazio quando preenchido com valor não-numérico', function() {
        
        cy.get('#phone')
        .type('asdfçlkj')
        .should('have.value', '')
    })





         //    Exercício 4 
    it('exibe mensagem de erro quando o telefone se torna obrigório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Junior')
        cy.get('#lastName').type('Camara') 
        cy.get('#email').type('jcamarawork@gmail.com')  
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
        
})


    // Exercício 5
    it('preenche e limpa os campo nome, soberenome, email e telefone', function (){
        cy.get('#firstName')
        .type('Junior')
        .should('have.value', 'Junior')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Camara')
        .should('have.value', 'Camara')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('jcamarawork@gmail.com')
        .should('have.value', 'jcamarawork@gmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('47989112411')
        .should('have.value', '47989112411')
        .clear()
        .should('have.value', '')

        cy.get('#open-text-area')
        .type('teste')
        .should('have.value', 'teste')
        .clear()
        .should('have.value', '')

    }) 

        // Exercicío 6
        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        }) 

        // Exercicio 7
        it('envia o formulário com sucesso usando um comando customizado', function(){
            cy.fillMandatoryfieldsAndSubmit()

            cy.get('.success').should('be.visible')

        })


        // Exercicío 8
        it('alterar todos os locais onde identificamos o botão para posterior clique, onde em vez de identificarmos tal elemento com o cy.get(), iremos usar o cy.contains()', function(){
            cy.get('#firstName').type('Junior')
            cy.get('#lastName').type('Camara')
            cy.get('#email').type('jcamarawork@gmail.com')
            cy.get('#open-text-area').type('teste')
            cy.contains('button', 'Enviar').click() //'seletor' 'texto que contem o seletor' nesse caso button e enviar
    
            cy.get('.success').should('be.visible')

            
        })

         //   exercício select texto------------------------------------------------------------------------------------------------
        it('seleciona um produto (YouTube) por seu texto', function(){
            cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')

        })
    
      //  exercicio 1 select value
        it('seleciona um produto (YouTube) por seu texto', function(){
                cy.get('#product')
                .select('mentoria')
                .should('have.value', 'mentoria')
    
            })

    //exercicio 2 select indice
    it('seleciona um produto (Blog) por seu indice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    
    })



   //  exercicio check -------------------------------------------------------------------------------------------------------
    it('marca o tipo de atendimento "feedback', function (){
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function (){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

      //   exercicio marcar e desmarcar checkbox  -------------------------------------------------------------------------------------------------------
    it('marca ambos checkbox e desmarca o ultimo', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

        it('exibe a mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido antes do envio do formulario', function() {
            cy.get('#firstName').type('Junior')
            cy.get('#lastName').type('Camara')
            cy.get('#email').type('jcamarawork@gmail.com')            
            cy.get('#open-text-area').type('texto de exemplo')
            cy.get('input[type="checkbox"][value="phone"]')
              .check()
              .should('be.checked')
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
            
        })

        
        it('seleciona um arquivo da pasta fixtures', function(){
            cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('seleciona um arquivo usando drag-drop (teste de arrastar arquivo para o input)', function(){
            cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
         })

        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um aliaas', function(){
            cy.fixture('example.json').as('sampleFile')
            cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })    
        })

        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
            cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
        })

        
        it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
            cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .should('not.have.attr', 'target', '_blank')
            .click()

            cy.contains('Talking About Testing').should('be.visible')
        })


  })
  