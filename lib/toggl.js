var TogglClient = require('toggl-api');
var TogglEntry = require('./toggl-entry')
var toggl;
var current_entry;

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
        console.error('No Api Key available in Settings');
        return;
      }
      atom.commands.add('atom-workspace', 'Toggl:Start', this.start)
      atom.commands.add('atom-workspace', 'Toggl:End', this.end)
    },

    start: function () {

      // init new togglEntry
      var entry = new TogglEntry();

      entry.getTextInput().addEventListener('keydown', function (e) {
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

          entry.getElement().remove();
        }

        // handle escape keypress
        else if (e.which === 27) {
          entry.getElement().remove()
        }
      });

      atom.workspace.addBottomPanel({item: entry.getElement()});
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
