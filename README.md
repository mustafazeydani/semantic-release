# Semantic Release

## About

This is a convenience wrapper around [semantic-release](https://github.com/semantic-release/semantic-release) designed to be used with GitHub Actions. It uses [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/) to generate release notes and a changelog. When a release is necessary, it is automatically published to npm, pushing the newly created tag, revised package.json and updated changelog to GitHub.

## Installation

```sh
npm install --save-dev @mustafazeydani/semantic-release @commitlint/cli @commitlint/config-conventional husky
# Or
yarn add --dev @mustafazeydani/semantic-release @commitlint/cli @commitlint/config-conventional husky
# Or
pnpm add --save-dev @mustafazeydani/semantic-release @commitlint/cli @commitlint/config-conventional husky
```

> Note: Commitlint and Husky are optional peer dependencies, and could be replaced with any other toolchain that ensures that conventional commits are followed.

## Configuration

First, setup Husky (if applicable):

```sh
pnpm husky init
```

Then, add the following git hook:

**`.husky/commit-msg`**

```
pnpm commitlint --edit $1
```

Now, add the following configuration:

**`package.json`**

```json
{
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  },
  "release": {
    "extends": ["@mustafazeydani/semantic-release"]
  }
}
```

Next, generate an access token for [npm](https://www.npmjs.com/) with read and write permissions for the package in question and set the `NPM_TOKEN` secret for the repository.

Then, add the following workflow:

**`.github/workflows/release.yaml`**

```yaml
name: Release
on:
  push:
    branches: ['main']
  workflow_dispatch:
permissions:
  contents: read
jobs:
  release:
    permissions:
      contents: write
      issues: write
      pull-requests: write
      id-token: write
    uses: mustafazeydani/semantic-release/.github/workflows/release.yaml@main
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
    with:
      build-command: pnpm build # optional
```
