module.exports =
  class CurrentEntry
    constructor: ->
      # create root element
      @rootElement = document.createElement('div');

      titleContainer = document.createElement('h1')
      titleLabel = document.createElement('span')
      titleLabel.textContent = 'Entry Title: '
      @title = document.createElement('span')
      titleContainer.appendChild(titleLabel)
      titleContainer.appendChild(@title)

      @rootElement.appendChild(titleContainer)

    destroy: ->
      @rootElement.remove()

    getElement: ->
      @rootElement

    getLabels: ->
      {
        title: @title
      }
