## Contribution Guide

> You should be aware of below stacks(do not need to be professional) to contribute to our repository.

1. [React Native](https://reactnative.dev/)
2. [VSCODE](https://code.visualstudio.com)
   - We are using `vscode` as our ide. Please install `eslint` plugin.

### What you need to consider

> What's been published to `npm` is only the `shared` components in `src/components/shared`. This is what you should be considering for production. Please try writing `test code` for `shared` components when you've created new one. We encourage you to write `stories` in `storybook` directory so other users can use it in one hand.

### Installation

1. Fork our project to yours.
   - Recommended to have `forked` master branch to be updated to upstream.
   - Configure [Syncing a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/).
     - `git remote add upstream https://github.com/dooboolab/dooboo-ui`
     - Check it with `git remote -v`
   - Fetch the branches from upstream repository by `git fetch upstream`
   - When you want to give `PR`, make new branch `git checkout -b [feature_name]`
     - Before pushing `PR`, do `git fetch upstream` from master branch then try the rebase by `git rebase master`
     - Check your status by `git log --decorate --oneline --all --graph`
2. Git clone your forked repository.
   ```
   git clone https://github.com/<your-id>/dooboo-ui.git
   ```
3. Install your packages
   ```
   yarn
   ```
   - Note that we recommend using yarn because all of our team members do.
   - Also node that `yarn.lock` and `package-lock.json` sometimes make collision. Try to delete one of them.
4. Run pod install if you clone list of independent components in `@dooboo-ui/*`

   - `cd ios && pod install`
     > Note that @dooboo-ui/native(or dooboo-ui) don't need this step.

5. Run your project

   1. **Run metro bundler**
      ```
      yarn start
      ```
   2. **run storybook web server**
      ```
      yarn storybook
      ```
   3. **run ios or android**
      ```
      yarn ios
      // or
      yarn android
      ```
      > Note that when you are running `android` you should open your emulator before running above command since the script won't automatically open emulator unlike `ios`

   > ‼️ if you have error `We ran "xcodebuild" command but it exited with error code 65` while running project for the first time, you might have to follow this [guide](https://github.com/facebook/react-native/issues/24450#issuecomment-516760157) of installing `cocoapads`

6. Configure linting in [vscode](https://code.visualstudio.com) correctly.

   - Example vscode [setting.json](https://gist.github.com/hyochan/815e9040593180c4725d7694d863e5a1)

7. While implementing [Shared] component you should run `yarn watch` in order to build typescript file dynamically while developing. This is currently the best solution to sync with your typescript code using `package.json`. If you find something more efficient, please give a pull request.

### Commit message

Commit messages should include a title, summary, and test plan.

Write the title in the imperative mood and prefix it with a tag that describes the affected code, like [android] or [video], and makes it easier to read through the commit log.

In the summary, explain the motivation behind the commit ("why") and the approach it takes ("how"). Note things that aren't communicated by the code or require more context to infer.

Use the test plan to communicate how to verify the code actually works and to help others in the future create their test plans for the same area of the codebase. Read the Expo guide on Git and Code Reviews for more guidance on PRs and test plans.

This post called [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) has a lot of good guidance, too.

### Issue

- Please search and register if you already have the issue you want to create. If you have a similar issue, you can add additional comments.
- Please write a problem or suggestion in the issue. Never include more than one item in an issue.
- Please be as detailed and concise as possible. \* If necessary, please take a screenshot and upload an image.

### Pull request(PR)

PR is available to `master` branch.

Each PR should correspond to one idea and implement it coherently. This idea may be a feature that spans several parts of the codebase. For example, changing an API may include changes to the Android, iOS, and web implementations, the JavaScript SDK, and the docs for the API.

Generally, each PR should contain one commit that is amended as you address code review feedback. Each commit should be meaningful and make sense on its own. Similarly, it should be easy to revert each commit. This keeps the commit history easier to read when people are working on this code or searching for a commit that could have broken something.

### Coding Guidelines

Please follow the Coding conventions as much as possible when contributing your code. This is mostly covered by `eslint` plugin in `vscode`. Add `eslint` plugin and add below in `setting.json` in `vscode` to fix `coding style` in live editing.

```
"eslint.enable": true,
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact"
],
```

> `yarn lint` command will cover your code style either.

General styles

- The indent tab is two spaces.
- The class declaration and the `{}` in curly brackets such as function, if, foreach, for, and while should be in the following format. Also if you installed eslint in vscode or in your code editor, it will help you with linting. \* `{` should be placed in same line and `}` should be placed in next line.

```
for (let i = 0; i < 10; i++) {
  ...
}
array.forEach((e) => {
  ...
});
```

- Space before `(` and after `)`.

*** Important ***
- testID should be written in `kebab-case`
  `testID = "my-test-id"`
- Class name should be a `PascalCase`
- Enum type should be a `PascalCase`
- Constants should be written in `UPPER_SNAKE_CASE`
   * Note that this is for `number`, `string` and constant `array`.
   * Unformed data type like object or class variable should be written in `camelCase`.
- Variables and functions should be written in `camelCase`
- Assets name should be written in `lower_snake_case`
  `const imgUrl = 'assets/icons/icon_add.png'`


- **If you find code that does not fit in the coding convention, do not ever try to fix code that is not related to your purpose.**

- [how to use prettier extension for the eslint code rules](https://medium.com/dooboolab/using-eslint-prettier-and-sort-imports-vscode-extensions-for-formatting-open-source-project-16edf317129d)
- while you are using prettier extension, you may encounter **ternary operator** indentation problems

  ![error](https://i.imgur.com/RhGrbLo.png)

  you can use

  ```
  // prettier-ignore
  ```

  like below

  ![fixes](https://i.imgur.com/x3bL5kf.png)
