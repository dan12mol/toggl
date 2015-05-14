var TogglClient = require('toggl-api');
var CurrentEntry = require('./current-entry');
var TogglEntry = require('./toggl-entry');
var toggl;

module.exports = {

    config: {
      togglApiKey: {
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
        atom.notifications.addError('No API Key available. Please set one in Package Settings Page');
        return;
      }
      atom.commands.add('atom-workspace', 'Toggl:Start', this.start)
      atom.commands.add('atom-workspace', 'Toggl:End', this.end)
      atom.commands.add('atom-workspace', 'Toggl:Current', this.current)
    },

    start: function () {
      // init new togglEntry
      var entry = new TogglEntry();

      var projectSelector = entry.getTextInputs()[2];

      toggl.getClients(function (err, clients) {
        if (err)
          atom.notifications.addError(err);
        else {
          clients.forEach(function (client) {
            toggl.getClientProjects(client.id, true, function (err, projects) {
              if (err)
                atom.notifications.addError(err);
              else {
                projects.forEach(function (project) {
                  var option = document.createElement('option');
                  option.value = project.id;
                  option.innerHTML = project.name;
                  projectSelector.appendChild(option);
                });
              }
            });
          });
        }
      });

      entry.getTextInputs().forEach(function (input) {
        input.addEventListener('keydown', function (e) {
          if (e.which === 13) {
            // start a new time entry
            toggl.startTimeEntry({
              description: document.getElementById('togglInput').value,
              tags: document.getElementById('tagsInput').value.split(',').map(function (e) { return e.trim(); }),
              billable: document.getElementById('billableInput').checked,
              pid: document.getElementById('projectSelect').options[document.getElementById('projectSelect').selectedIndex].value
            }, function (err, timeEntry) {

              // handle error
              if (err)
                atom.notifications.addError(err);
              else {
                atom.notifications.addSuccess('New Toggl Entry created with id #' + timeEntry.id);
              }
            });
            entry.destroy();
          }
          // handle escape keypress
          else if (e.which === 27) {
            entry.destroy();
          }
        });
      });

      atom.workspace.addBottomPanel({item: entry.getElement()});
    },

    end: function () {

      toggl.getCurrentTimeEntry(function (err, timeEntry) {
        if (err)
          atom.notifications.addError(err);
        else if (!timeEntry)
          atom.notifications.addError('No current Toggl Entry');
        else {
          // stop the current time entry
          toggl.stopTimeEntry(timeEntry.id, function (err) {

            // handle err
            if (err)
              atom.notifications.addError(err);
            else {
              timeEntry.tags = timeEntry.tags ? timeEntry.tags.push('finished') : ['finished'];
              toggl.updateTimeEntry(timeEntry.id, {tags: timeEntry.tags}, function(err) {
                if (err)
                  atom.notifications.addError(err);
                else {
                  atom.notifications.addSuccess('Finished Toggl Entry with id #' + timeEntry.id);
                  toggl.destroy()
                }
              });
            }
          });
        }
      })
    },

    current: function () {
      toggl.getCurrentTimeEntry(function (err, timeEntry) {
        if (err)
          atom.notifications.addError(err);
        else if (!timeEntry)
          atom.notifications.addInfo('No current Toggl Entry.');
        else {
          var current_entry = new CurrentEntry();
          var labels = current_entry.getLabels();
          labels.title.textContent = timeEntry.description;
          labels.tags.textContent = timeEntry.tags.join(', ');
          atom.workspace.addModalPanel({item: current_entry.getElement()});
        }
      });
    }
  }
