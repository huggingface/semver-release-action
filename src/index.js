import core from '@actions/core';
import semanticRelease from 'semantic-release';
import process from 'node:process';

async function main() {
    const dryRun = core.getInput('dryRun') ? core.getBooleanInput('dryRun')  : false;
    const branches = core.getInput('branches') ? JSON.parse(core.getInput('branches')) : ['main'];
    const commitAnalyzerPluginOpts = core.getInput('commitAnalyzerPluginOpts') ? JSON.parse(core.getInput('commitAnalyzerPluginOpts')) : null;

    try {
        core.debug(`Start execution with following env var : ${process.env}`);

        const result = await semanticRelease(
            {
                dryRun,
                branches,
                plugins: [
                    '@semantic-release/commit-analyzer', commitAnalyzerPluginOpts || {},
                    '@semantic-release/release-notes-generator',
                    '@semantic-release/github',
                ]
            },
            {
                // Run semantic-release from `/path/to/git/repo/root` without having to change local process `cwd` with `process.chdir()`
                // cwd: '/Volumes/Data/workspace/huggingface/private-hub-package'
                cwd: '/github/workspace'
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
