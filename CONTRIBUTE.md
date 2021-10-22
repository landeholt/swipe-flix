# How to contribute

I recommend every developer to use `VSCode`. And especially installing `GitLens` and `Conventional Commits` in order for the repo to maintain a seamless structure.

## Installing extensions:

[Gitlens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

[Conventional Commits]([vscode:extension/vivaxy.vscode-conventional-commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits))

Please create branches for new features / bugs / poc with the following name template

`feature/[NAME-OF-FEATURE]`

`bug/[NAME-OF-BUG]`

`poc/[NAME-OF-PROOF-OF-CONCEPT]`

The repo has a linked kanban project, so please create issues for the features you are working on as well as keep track on the issue number, such that you can close tickets much easier.

This can be automated with git commit messages in this fashion:

```sh
git commit -am "Created wireframe for profiling resolves #1, #2, #8"
```
