module.exports =
  class TogglEntry
    constructor: ->
      # create root element
      @rootElement = document.createElement('div');
      @rootElement.setAttribute('id', 'togglEntry');

      # create grid elements
      row = document.createElement('div');
      row.classList.add('row');
      col3 = document.createElement('div');
      col3.classList.add('col-lg-3');
      col3_2 = document.createElement('div');
      col3_2.classList.add('col-lg-3');
      col3_3 = document.createElement('div');
      col3_3.classList.add('col-lg-3');
      col3_4 = document.createElement('div');
      col3_4.classList.add('col-lg-3');

      # create title
      title = document.createElement('h3');
      title.textContent = 'What are you working on?';

      # create text input for entry description
      @textInput = document.createElement('input');
      @textInput.setAttribute('id', 'togglInput');
      @textInput.setAttribute('autofocus', 'true');
      @textInput.classList.add('form-control');

      # create tags title
      tagsTitle = document.createElement('h3');
      tagsTitle.textContent = 'Add tags, sepparated by commas.'

      # create text input for tags
      @tagsInput = document.createElement('input');
      @tagsInput.classList.add('form-control');
      @tagsInput.setAttribute('id', 'tagsInput');

      # create billable title
      billableTitle = document.createElement('h3');
      billableTitle.textContent = 'Billable?'

      # create checkbox for billable
      @billableInput = document.createElement('input');
      @billableInput.setAttribute('type', 'checkbox');
      @billableInput.setAttribute('id', 'billableInput');

      # create project selector title
      projectTitle = document.createElement('h3');
      projectTitle.textContent = 'What project are you working on?'

      # create selector for projects
      @projectSelect = document.createElement('select');
      @projectSelect.classList.add('form-control');
      @projectSelect.setAttribute('id', 'projectSelect');

      # append elements to root element
      col3.appendChild(title);
      col3.appendChild(@textInput);
      col3_2.appendChild(tagsTitle);
      col3_2.appendChild(@tagsInput);
      col3_3.appendChild(projectTitle);
      col3_3.appendChild(@projectSelect);
      col3_4.appendChild(billableTitle);
      col3_4.appendChild(@billableInput);
      row.appendChild(col3);
      row.appendChild(col3_2);
      row.appendChild(col3_3);
      row.appendChild(col3_4);
      @rootElement.appendChild(row);


    destroy: ->
      @rootElement.remove()

    getElement: ->
      @rootElement

    getTextInputs: ->
      [@textInput, @tagsInput, @projectSelect, @billableInput]
