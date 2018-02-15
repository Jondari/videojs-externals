# How to contribute

First of all, thanks for taking time out of your day to improve this project.

Here's how you can contribute:

  - Report bugs, make feature requests and suggestions
  - Fix bugs and implement features (duh :P)
  
# Code of conduct

Be nice.

# Making and submitting changes

Thanks for donating your hard work and code to the open-source movement and this project!

## Forking

[Fork](https://help.github.com/articles/working-with-forks/) the project

## Making commits

**Write tests**! With `grunt karma:watch` you'll be able to validate your changes quickly.

Please make atomic commits (each commit must do one thing).  
Always write a clear log message for your commits. Everything after [#3 in this article basically](https://dev.solita.fi/2013/07/04/whats-in-a-good-commit.html)

The first line should be a short description of the commit (and can stay so if it's a small change).

The second line should go more in depth about the change e.g why it was done.

**Example**
```
Refactored code to introducee `makeMyDay` method

The code was duplicated with differing parameters, 
so a single method now does that job.
```

Feel free to reference the issue you're working on in a final separated line in the form of `<user>/<repositor>#<issueid>`

## Pull requests

Submit a [pull-request](https://help.github.com/articles/creating-a-pull-request/) and describe all your changes
 as well as your motivation to do so.

Fair warning, each pull request should group together coherent commits. Don't mix concerns!
 
X disparate changes = X pull requests

**A word on CI and tests**

The tests seem to be unstable when running in TravisCI's docker environment, so don't worry too much about 
the big red dot that comes with each commit. Work is being done to solve that, but make sure that your `grunt test`
turns up green!

I'll most likely be checking your changes locally too.

