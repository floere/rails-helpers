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