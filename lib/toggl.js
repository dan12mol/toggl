var http = require('http')
var TogglClient = require('toggl-api');
var toggl;
var current_entry;

module.exports = {

    config: {
      toggleApiKey: {
        type: 'string',
        default: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }
    },

    activate: function (state) {

      // set Toggl Api Key
      if (atom.config.settings.toggl.togglApiKey) {
        toggl = new TogglClient({
          apiToken: atom.config.settings.toggl.togglApiKey
        });
      }
      else {
        console.error('No Api Key available in Settings');
        return;
      }
      atom.workspaceView.command('Toggl:End', this.end)
      atom.workspaceView.command('Toggl:Start', this.start)
    },

    start: function () {

      var rootElement = document.createElement('div');
      rootElement.setAttribute('id', 'togglEntry');
      var title = document.createElement('h3');
      title.textContent = 'What are you working on?';
      var textInput = document.createElement('input');
      textInput.setAttribute('id', 'togglInput');
      textInput.setAttribute('type', 'text');
      textInput.setAttribute('autofocus', 'true');
      textInput.classList.add('form-control');
      textInput.addEventListener('keydown', function (e) {
        if (e.which === 13) {

          // start a new time entry
          toggl.startTimeEntry({
            description: this.value
          }, function (err, timeEntry) {

            // handle error
            if (err)
              console.error(err);
            else {
              current_entry = timeEntry.id;
            }
          });

          var panel = atom.workspace.getBottomPanels().filter(function (item) {
            return item.item.id === 'togglEntry';
          })[0]
          panel.item.remove();
        }

        // handle escape keypress
        else if (e.which === 27) {
          var panel = atom.workspace.getBottomPanels().filter(function (item) {
            return item.item.id === 'togglEntry';
          })[0]
          panel.item.remove();
        }
      });

      rootElement.appendChild(title);
      rootElement.appendChild(textInput);
      atom.workspace.addBottomPanel({item: rootElement});
    },

    end: function () {

      if (!current_entry) {
        console.error('No current entry');
      }
      else {

        // stop the current time entry
        toggl.stopTimeEntry(current_entry, function (err) {

          // handle err
          if (err)
            console.log(err);

            toggl.updateTimeEntry(current_entry, {tags: ['finished']}, function(err) {
              toggl.destroy()
            });
        });
      }
    },
  }
