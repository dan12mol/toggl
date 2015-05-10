module.exports =
  class TogglEntry
    constructor: ->
      # create root element
      @rootElement = document.createElement('div');
      @rootElement.setAttribute('id', 'togglEntry');

      # create title
      title = document.createElement('h3');
      title.textContent = 'What are you working on?';

      # create text input for entry description
      @textInput = document.createElement('input');
      @textInput.setAttribute('id', 'togglInput');
      @textInput.setAttribute('type', 'text');
      @textInput.setAttribute('autofocus', 'true');
      @textInput.classList.add('form-control');

      # append elements to root element
      @rootElement.appendChild(title);
      @rootElement.appendChild(@textInput);

    destroy: ->
      @rootElement.remove()

    getElement: ->
      @rootElement

    getTextInput: ->
      @textInput
