'use strict';

exports.defineTags = function(dictionary) {
  function stabilityAlias(name) {
    dictionary.defineTag(name, {
      onTagged: function(doclet) {
        doclet.stability = name;
      }
    });
  }
  stabilityAlias('volatile');
  stabilityAlias('uncommitted');
  stabilityAlias('committed');
};

exports.handlers = {
  processingComplete: function(e) {
    for (var i = 0; i < e.doclets.length; ++i) {
      var dl = e.doclets[i];
      if (dl.since && dl.stability) {
        dl.since += ' <i>(stability: ' + dl.stability + ')</i>';
      }
    }
  }
};
