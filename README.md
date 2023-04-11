<h1 style="text-align: center; border-bottom: none;">📦🚀 semver-release-action</h1>
<h3 style="text-align: center">Github Action to release projects using <a href="https://github.com/semantic-release/semantic-release">Semantic Release</a>.</h3>
<p style="text-align: center">
    <a href="https://github.com/huggingface/semver-release-action/releases">
        <img alt="Latest release" src="https://img.shields.io/github/v/release/huggingface/semver-release-action?label=Release">
    </a>
    <a href="https://opensource.org/licenses/Apache-2.0">
        <img alt="License" src="https://img.shields.io/badge/License-Apache_2.0-yellow.svg">
    </a>
</p>

# Usage

This github action automates the whole package release workflow including: determining the next version number, generating the release notes, and publishing the package.

```yaml
name: Release project
on:
  workflow_dispatch:

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Release
        uses: huggingface/semver-release-action@latest
```

## Inputs parameters

### branches
The branches on which releases should happen. By default semantic-release will release:
See : https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#branches

```yaml
- name: Helm Publish Action
  uses: huggingface/helm-publish-action@latest
  with:
    branches: ["main"]
```

### dryRun
The objective of the dry-run mode is to get a preview of the pending release. Dry-run mode skips the following steps: prepare, publish, addChannel, success and fail. 
In addition to this it prints the next version and release notes to the console.

```yaml
- name: Helm Publish Action
  uses: huggingface/helm-publish-action@latest
  with:
    dryRun: true
```

### commitAnalyzerPluginOpts
JSON Options to pass to commit analyzer plugins. See : https://github.com/semantic-release/commit-analyzer#options

```yaml
- name: Helm Publish Action
  uses: huggingface/helm-publish-action@latest
  with:
    commitAnalyzerPluginOpts: {...}
```

## Outputs

### tag
Tag as tag-prefix + version, example: v1.2.3

### version
New version or current version if not released, example: 1.2.3

### changelog
Changelog of the new version

### released
True if new version was released