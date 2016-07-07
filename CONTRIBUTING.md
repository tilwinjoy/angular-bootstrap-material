# Contributing



## Using the issue tracker

The [issue tracker](https://github.com/FezVrasta/bootstrap-material-design/issues) is the preferred channel for [bug reports](#bug-reports), [features requests](#feature-requests) and [submitting pull requests](#pull-requests), but please respect the following restrictions:

* Please **do not** use the issue tracker for personal support requests. [Stack Overflow `angular-bootstrap-material`](https://stackoverflow.com/questions/tagged/angular-material-design) tag is the best place to get help (This tag does not exist as of now. If you have a new question related to this project and you're unable to create it, let me know about your question via [this thread](https://github.com/tilwinjoy/angular-bootstrap-material/issues/3)).
  
* Please **do not** post comments consisting solely of "+1" or ":thumbsup:". Use [GitHub's "reactions" feature](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments)  instead.

* Please **do not** open issues or pull requests regarding the code in dependencies. Open them in their respective repositories.
  
* Please **do not** open issues without clearly stating the problem and desired result. [See the bug reports section](#bug-reports) for more information on creating effective issues.

* Please **close your own issue** once it is resolved.


## Bug reports

This project does not handle any CSS related stuff. If you find such an issue, chances are it's a problem with the CSS dependencies ( [Bootstrap](http://getbootstrap.com") and [Bootstrap Material Design](http://fezvrasta.github.io/bootstrap-material-design/)).

If you face an issue with bootstrap's JavaScript components, it could be an issue with the dependency [UI Bootstrap](https://angular-ui.github.io/bootstrap/). Please make sure that is not the case before opening an issue with this project.


Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; create a [reduced test case](https://css-tricks.com/reduced-test-cases/) using an online playground such as JSFiddle or codepen. Here's [JSFiddle template](https://jsfiddle.net/8f0vhken/)  for quick start.


A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? Do other browsers show the bug differently? What would you expect to be the outcome? All these details will help people to fix any potential bugs.


## Feature requests

This project is the AngularJS version of [Bootstrap Material Design](http://fezvrasta.github.io/bootstrap-material-design/) and does not have it's own CSS component. So if you need an entirely new feature that likely requires it's own CSS, you probably should be requesting it there as per guidelines.



## Pull requests
Good pull requests—patches, improvements, new features—are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

**Please ask first** before embarking on any significant pull request (e.g. implementing features, refactoring code, porting to a different language), otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

Please adhere to the [coding guidelines](#code-guidelines) used throughout the project (indentation, accurate comments, etc.) and any other requirements.

**In general, do not edit `dist` files directly!** Those files are automatically generated. 

Adhering to the following process is the best way to get your work included in the project:

1. [Fork](https://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/angular-bootstrap-material.git
   # Navigate to the newly cloned directory
   cd angular-bootstrap-material
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/tilwinjoy/angular-bootstrap-material.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks with messages written in english. Please adhere to these [git commit message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) or your code is unlikely be merged into the main project.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description against the `master` branch.  Referenc any open issue in the description so it is automatically linked.

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to license your work under the terms of the [MIT License](LICENSE) (if it includes code changes) and under the terms of the [Creative Commons Attribution 3.0 Unported License](docs/LICENSE) (if it includes documentation changes).


## Code guidelines

### HTML
[Adhere to the Code Guide.](http://codeguide.co/#html)

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use CDNs and HTTPS for third-party JS when possible. We don't use protocol-relative URLs in this case because they break when viewing the page locally via `file://`.
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples to promote accessibility.

### Coding styles
Before committing ensure your changes follow our coding standards by running `gulp`.  This will run the various code style check tools and provide feedback.
