// This file defines global helper functions for specs
//
// js specs are intended to be run with the mozilla js standalone lib:
// http://www.ossp.org/pkg/lib/js/
//
// Output is intended to be used in a html wrapper, as in TextMate.

// The tester function.
//
it = function(should, callback) {
  var result = callback();
  var text = this.context_description + ' ' + should + '.<br/>';
  if (result) {
    print('<div style="background-color:green;">OK: ' + text + '</div>');
  } else {
    print('<div style="background-color:red;">Fail: ' + text + '</div>');
  };
};

// For defining a context.
//
context = function(description, setup, specs, breakdown) {
  var old_description = this.context_description;
  var pre_description = old_description ? old_description + ' ' : '';

  // framework setup
  this.context_description = pre_description + description; // sets the description on the global object
  
  if (setup)     { setup(); };
  specs();
  if (breakdown) { breakdown(); };

  // framework breakdown
  this.context_description = old_description;
};

// Alias describe to context.
//
describe = context;

// Pending.
//
pending = function(description) {
  print('<div style="background-color:yellow;">Pending: ' + this.context_description + ' ' + description + '</div>');
};

// Use as follows:
//
// describe('translations',
//  null,
//  function specs() {
//    var l;
//    context('de',
//      function setup() { l = 'de'; },
//      function specs() {
//        it_should_translate(l, 'gaga', 'Translation missing: gaga');
//        it_should_translate(l, 'common.name', 'Name');
//      }
//    );
//    context('fr',
//      function setup() { l = 'fr'; },
//      function specs() {
//        it_should_translate(l, 'gaga', 'Translation missing: gaga');
//        it_should_translate(l, 'common.name', 'nom');
//      }
//    );
//
it_should_translate = function(language, key, expected) {
  it('should translate the key with ' + key + ' into ' + expected + ' (' + language + ')', function() {
    var translated = t(key, language);
    var result = (translated == expected);
    if (!result) {
      print('Expected ' + expected + ', got ' + translated);
    };
    return result;
  });
};