var http = require('http')
var TogglClient = require('toggl-api');
var toggl;
var current_entry;

module.exports = {
    configDefaults: {
      'togglApiKey': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },

    activate: function () {

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
      atom.workspaceView.command('Toggl:Start', this.start)
      atom.workspaceView.command('Toggl:End', this.end)
    },

    start: function () {

      // start a new time entry
      toggl.startTimeEntry({
        description: 'Hello World'
      }, function (err, timeEntry) {

        // handle error
        if (err)
          console.error(err);
        else {
          current_entry = timeEntry.id;
        }
      });
    },

    end: function () {
      console.log(atom.config.get('togglApiKey'));
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
