Personal notes & cheatsheet on JS.

node.js
---
* tests [mocha](https://www.npmjs.org/package/mocha) (never tried [jasmine](https://www.npmjs.org/package/jasmine-node))
* promises Q.js or bluebird.js
* prefer lodash.js over underscore.js
* good web (micro) frameworks express.js, koa.js
* nodemon
* good editor brackets.io (with markdown plugin)
* good MVVM/MVC frameworks knockout.js and of course Angular.js

Angular.js
---
* test with Karma runner and/or [Protractor](https://github.com/angular/protractor)
* grunt for minify and such
  - npm install -g grunt-cli
* bower for pulling deps: 
  - npm install bower # or -g?
  - touch bower.json
  - bower install
  - what's best for pulling deps from browser? TODO
* what about [Bootstrap](http://getbootstrap.com/)? Mostly for CSS? TODO
* {{controller.something['bla']}} is not 100% equivalent to ng-model="controller.something['bla']": the latter does
  two-way binding
* ajax examples:
      $scope.saveStatus = "saving...";
      $http.put('/admin/configBuilder', $scope.config_builder).success(function () {
        $scope.saveStatus = "save complete";
      })
      .error(function (err) {
        $scope.saveStatus = "save failed:" + err
      });
   This alrdy takes care of $$hashKey removal, very convenient. How can this easiest be done promise-based? TODO
* good looking autocomplete: http://ngmodules.org/modules/ngAutocomplete, but note this is GoogleMaps-specific. Others
  are at http://ngmodules.org/tags/autocomplete. This web site doesn't get much use (yet?).
  P.S. http://angular-ui.github.io/bootstrap/ has autocomplete aka Typeahead, that's probably the best one atm.
* on parent scopes see [here](http://stackoverflow.com/questions/21453697/angularjs-access-parent-scope-from-child-controller)
  "your child controller will inherit all scope variables. So theoritically you don't have to call $parent"
* note Python-like list/generator comprehension in Angular views, e.g.
      typeahead="state for state in getStates($viewValue) | filter:$viewValue | limitTo:8"/>
  Neat!