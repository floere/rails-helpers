// Run specs with
// js -f spec/spec_helper.js -f ./public/javascripts/<your to be tested file>.js spec/public/javascripts/<your to be tested file>.js
//
// For maximum fun, add a command to TextMate to be run on Command-R.
//
// Spec example:
// context('specs work?',
//   function setup() {
//     objectToTest = new SomeCoolObject('param1', 100);
//   },  
//   function specs() {
//     it('should do this', function() {
//       return objectToTest.doThis() == 'someAnswerWeExpect';
//     });
//   }
// );

// Do the specs basically work?
//
context('specs work?',
  function setup() {
    someValue = 'some value';
  },  
  function specs() {
    it('should have a set value', function() {
      return someValue == 'some value';
    });
  }
);

// Can we nest the context's descriptions?
//
context('nested contexts',
  false, // no setup
  function specs() {
    context('inner context',
      false, // no setup
      function specs() {
        it('should be described correctly', function() {
          return this.context_description == 'nested contexts inner context';
        });
      }
    );
    context('other inner context',
      false, // no setup
      function specs() {
        it('should be described correctly', function() {
          return this.context_description == 'nested contexts other inner context';
        });
      }
    );
  }
);

// Can we nest the context's setups?
//
context('nested contexts',
  function setup() {
    someValue = 'some value';
  },
  function specs() {
    context('inner context',
      function setup() {
        someOtherValue = 'other value';
      },
      function specs() {
        it('should have a set someValue', function() {
          return someValue == 'some value' && someOtherValue == 'other value';
        });
      }
    );
    context('other inner context',
      function setup() {
        someOtherValue = 'yet another value';
      },
      function specs() {
        it('should have a set someValue', function() {
          return someValue == 'some value' && someOtherValue == 'yet another value';
        });
      }
    );
  }
);