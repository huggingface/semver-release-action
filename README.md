# HELM PUBLISH ACTION

[![Version](https://img.shields.io/github/v/release/huggingface/semver-release-action?label=Release)](https://github.com/huggingface/semver-release-action/releases)
[![License](https://img.shields.io/badge/License-Apache_2.0-yellow.svg)](https://opensource.org/licenses/Apache-2.0)

Github Action to simplify Helm Chart publish into a registry.

# Usage

See [action.yml](action.yml)

```yaml
- name: Helm Publish Action
  uses: huggingface/helm-publish-action@latest
  with:
    workingDirectory: charts
    repository: https://registry.your-domain.com
    username: ${{ secrets.REGISTRY_USERNAME }}
    password: ${{ secrets.REGISTRY_PASSWORD }}
    beforeHook: cd subcharts/my-sub-chart && helm dependencies update
```

### Use Tailscale VPN

If your registry is only accessible on a private network, and you use Tailscale, you can pass your tailscale Key to the action.

```yaml
- name: Helm Publish Action
  uses: huggingface/helm-publish-action@latest
  with:
    tailscaleKey: ${{ secrets.TAILSCALE_AUTHKEY }}
```

### Before hook

If you need to execute a command before to publish, pass it via `beforeHook` argument.
This hook is usefully if you have subchart inside your Chart and you want update it before to publish your parent chart.

```yaml
- name: Helm Publish Action
  uses: huggingface/helm-publish-action@latest
  with:
    beforeHook: cd subcharts/my-sub-chart && helm dependencies update
```