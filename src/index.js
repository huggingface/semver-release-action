import core from '@actions/core';
import semanticRelease from 'semantic-release';

async function main () {
    const dryRun = core.getBooleanInput('dryRun');
    const branches = core.getInput('branches') ? JSON.parse(core.getInput('branches')) : ['main'];
    const commitAnalyzerPluginOpts = core.getInput('commitAnalyzerPluginOpts');

    try {
        const result = await semanticRelease(
            {
                dryRun,
                branches,
                plugins: [
                    '@semantic-release/commit-analyzer', commitAnalyzerPluginOpts || {},
                    '@semantic-release/release-notes-generator',
                    '@semantic-release/github', [
                        '@semantic-release/exec',
                        {
                            // eslint-disable-next-line no-template-curly-in-string
                            prepareCmd: 'set-version ${nextRelease.version}',
                            publishCmd: 'publish-package'
                        }
                    ]
                ]
            },
            {
                // Run semantic-release from `/path/to/git/repo/root` without having to change local process `cwd` with `process.chdir()`
                // cwd: '/Volumes/Data/workspace/huggingface/private-hub-package'
                // Pass the variable `MY_ENV_VAR` to semantic-release without having to modify the local `process.env`
                // env: { ...process.env, MY_ENV_VAR: "MY_ENV_VAR_VALUE" },
            }
        );

        if (result) {
            const { nextRelease } = result;

            core.setOutput('released', dryRun !== true);
            core.setOutput('tag', nextRelease.gitTag);
            core.setOutput('version', nextRelease.version);
            core.setOutput('changelog', nextRelease.notes);
        } else {
            core.setOutput('released', false);
            core.info('No release published.');
        }
    } catch (err) {
        core.error(`The automated release failed with ${err}`);
        core.setFailed(`The automated release failed with ${err}`);
    }
}

main();
