# AngularJS Bootstrap Material Design

AngularJS directives for creating bootstrap material design components based on [Bootstrap material design](http://fezvrasta.github.io/bootstrap-material-design/) css.

###### This is a work in progress.

##Getting Started

This project is an AngularJS version of the aswesome [Bootstrap material design](http://fezvrasta.github.io/bootstrap-material-design/). It removes the dependency on jQuery as well as Bootstrap's JavaScript and makes it easy to work with dynamic AngularJS components

###Dependencies:
- [AngularJS](http://angularjs.org)
- [Angular-messages](http://angularjs.org)
- [UI Bootstrap](https://angular-ui.github.io/bootstrap/) (Optional: required for supporting bootstrap's JavaScript components)
- [Bootstrap CSS](http://getbootstrap.com") (tested with version 3.3.6)
- [Bootstrap Material Design CSS components](http://fezvrasta.github.io/bootstrap-material-design/) (bootstrap-material-design.css and ripples.css)

###How to install:

run `bower install abm` to install via bower or grab the latest source from [Github](https://raw.githubusercontent.com/tilwinjoy/angular-bootstrap-material/master/dist/angular-bootstrap-material.js) and include it in your project after the dependencies. 

Include `angularBootstrapMaterial` module in your application:

```js
 angular.module('app', ['angularBootstrapMaterial']);
```

###CSS Related Stuff:
This project doesn't do any CSS magic, all that comes from [Bootstrap material design](http://fezvrasta.github.io/bootstrap-material-design).  
For demos and documentation of typography, tables, icons etc refer the Bootstrap material design [documentation](http://fezvrasta.github.io/bootstrap-material-design)

###Demos

Visit http://tilwinjoy.github.io/angular-bootstrap-material/ for demos

### Support and Contributions

If you like this project, don't forget to star this repository.  
[Feature requests](https://github.com/tilwinjoy/angular-bootstrap-material/blob/master/CONTRIBUTING.md#feature-requests), [bug reports](https://github.com/tilwinjoy/angular-bootstrap-material/blob/master/CONTRIBUTING.md#bug-reports) and [helping hands](https://github.com/tilwinjoy/angular-bootstrap-material/blob/master/CONTRIBUTING.md#pull-requests) are very welcome. Please see the [CONTRIBUTING.md](https://github.com/tilwinjoy/angular-bootstrap-material/blob/master/CONTRIBUTING.md) file.

If you have any suggestions for improvement, please use the [general discussion](https://github.com/tilwinjoy/angular-bootstrap-material/issues/3) thread.

### Development

The build process uses [Gulp](http://gulpjs.com/) and frontend dependencies are managed via [Bower](http://bower.io/). Ensure you have nodejs installed.

After cloning the repo, run `npm install && bower install` to ensure you have all dev dependencies.

Once you make the changes, run `gulp` and load the `index.html` in demos folder in browser for testing.
