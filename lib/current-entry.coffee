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

      # projectContainer = document.createElement('h1')
      # projectLabel = document.createElement('span')
      # projectLabel.textContent = 'Project: '
      # @project = document.createElement('span')
      # projectContainer.appendChild(projectLabel)
      # projectContainer.appendChild(@project)

      timeContainer = document.createElement('h1')
      timeLabel = document.createElement('span')
      timeLabel.textContent = 'Time Elapsed: '
      @hours = document.createElement('span')
      @minutes = document.createElement('span')
      @seconds = document.createElement('span')
      timeContainer.appendChild(timeLabel)
      timeContainer.appendChild(@hours)
      timeContainer.appendChild(@minutes)
      timeContainer.appendChild(@seconds)

      @rootElement.appendChild(titleContainer)
      @rootElement.appendChild(tagsContainer)
      # @rootElement.appendChild(projectContainer)
      @rootElement.appendChild(timeContainer)

    destroy: ->
      @rootElement.remove()

    getElement: ->
      @rootElement

    getLabels: ->
      {
        title: @title
        tags: @tags
        hours: @hours
        minutes: @minutes
        seconds: @seconds
        # project: @project
      }
