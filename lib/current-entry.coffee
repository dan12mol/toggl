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

      tagsContainer = document.createElement('h1')
      tagsLabel = document.createElement('span')
      tagsLabel.textContent = 'Tags: '
      @tags = document.createElement('span')
      tagsContainer.appendChild(tagsLabel)
      tagsContainer.appendChild(@tags)

      @rootElement.appendChild(titleContainer)
      @rootElement.appendChild(tagsContainer)

    destroy: ->
      @rootElement.remove()

    getElement: ->
      @rootElement

    getLabels: ->
      {
        title: @title
        tags: @tags
      }
