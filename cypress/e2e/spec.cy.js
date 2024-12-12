describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Editar tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa para editar{enter}');
  
    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('label') 
      .dblclick();
  
    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('input.edit') 
      .clear()
      .type('Tarefa editada{enter}');
  
    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('label')
      .should('have.text', 'Tarefa editada');
  });

  it('Sair da filtragem de ativas e completas para exibir todas', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');
  
    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('[data-cy=toggle-todo-checkbox]')
      .click();
  
    cy.get('[data-cy=filter-active-link]')
      .click();
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa 2');
  
    cy.get('[data-cy=filter-completed-link]')
      .click();
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa 1');
  
    cy.get('[data-cy=filter-all-link]')
      .click();
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
  

  it('Limpa todas as tarefas concluídas', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]').as('inputTarefa'); // Alias para melhor legibilidade
    cy.get('@inputTarefa').type('Tarefa 1{enter}');
    cy.get('@inputTarefa').type('Tarefa 2{enter}');
    cy.get('@inputTarefa').type('Tarefa 3{enter}');
  
    cy.get('[data-cy=todos-list] > li').as('listaTarefas');
  
    cy.get('@listaTarefas').first().find('[data-cy=toggle-todo-checkbox]').click();
    cy.get('@listaTarefas').eq(1).find('[data-cy=toggle-todo-checkbox]').click();
  
    cy.get('button.clear-completed').should('be.visible');
  
    cy.get('@listaTarefas').should('have.length', 3);
  
    cy.get('button.clear-completed').click();
  
    cy.get('button.clear-completed').should('not.be.visible');
  
    cy.get('@listaTarefas')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa 3');
  });
  
});