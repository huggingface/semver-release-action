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

All available input parameters for the action:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `branches` | JSON array | Yes | `["main"]` | The branches on which releases should happen |
| `dryRun` | Boolean | No | `false` | Preview mode that skips publishing steps |
| `commitAnalyzerPluginOpts` | JSON object | No | `""` | Options to pass to commit analyzer plugins |

### branches
The branches on which releases should happen. By default semantic-release will release on `main` branch.
See : https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#branches

```yaml
- name: Release
  uses: huggingface/semver-release-action@latest
  with:
    branches: '["main", "next"]'
```

### dryRun
The objective of the dry-run mode is to get a preview of the pending release. Dry-run mode skips the following steps: prepare, publish, addChannel, success and fail. 
In addition to this it prints the next version and release notes to the console.

```yaml
- name: Release
  uses: huggingface/semver-release-action@latest
  with:
    dryRun: true
```

### commitAnalyzerPluginOpts
JSON Options to pass to commit analyzer plugins. See : https://github.com/semantic-release/commit-analyzer#options

```yaml
- name: Release
  uses: huggingface/semver-release-action@latest
  with:
    commitAnalyzerPluginOpts: '{"releaseRules": [{"type": "docs", "release": "patch"}]}'
```

## Semver Keywords and Version Bumps

This action uses [Conventional Commits](https://www.conventionalcommits.org/) to determine the next version number. The commit message format determines which part of the version (MAJOR.MINOR.PATCH) gets incremented:

### Version Bump Rules

| Commit Type | Version Bump | Example | Result |
|-------------|--------------|---------|--------|
| `feat:` | **MINOR** | `feat: add new authentication method` | `1.2.3` → `1.3.0` |
| `fix:` | **PATCH** | `fix: resolve memory leak in cache` | `1.2.3` → `1.2.4` |
| `BREAKING CHANGE:` or `!` | **MAJOR** | `feat!: remove deprecated API` or `feat(api)!: change response format` | `1.2.3` → `2.0.0` |
| `feat!:` or `fix!:` | **MAJOR** | `feat!: redesign user interface` | `1.2.3` → `2.0.0` |
| `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:` | **No release** | `docs: update README` | No version change |

### Examples

**Minor version bump (new feature):**
```
feat: add user profile page
```
Current version: `1.2.3` → New version: `1.3.0`

**Patch version bump (bug fix):**
```
fix: correct calculation error in tax computation
```
Current version: `1.2.3` → New version: `1.2.4`

**Major version bump (breaking change with `!`):**
```
feat!: migrate to new authentication system
```
Current version: `1.2.3` → New version: `2.0.0`

**Major version bump (breaking change in footer):**
```
feat: update API response format

BREAKING CHANGE: API now returns JSON instead of XML
```
Current version: `1.2.3` → New version: `2.0.0`

**No release (documentation only):**
```
docs: update installation instructions
```
Current version: `1.2.3` → No release (version unchanged)

### Customizing Commit Rules

You can customize which commit types trigger releases and what version bump they cause by using the `commitAnalyzerPluginOpts` parameter:

```yaml
- name: Release
  uses: huggingface/semver-release-action@latest
  with:
    commitAnalyzerPluginOpts: '{
      "releaseRules": [
        {"type": "docs", "release": "patch"},
        {"type": "refactor", "release": "minor"}
      ]
    }'
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