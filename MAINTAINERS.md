# Maintainers

## Reviewing contributions

As a general guide, here are a few questions to ask when reviewing any contributions:

* Is the intent of the change clear? Ask for clarity if needed, whether that's documentation or a change to code.
* Does the change cater for the widest number of scenarios, or is it for a specific user-case? If the latter, explore with the contributor whether there is scope for generalising the solution.
* Is the solution optimal; using appropriate data structures and controls? If you have alternative suggestions, work with the contributor to explore the potential advantages of those alternatives approaches.
* Are tests included, and do they cover happy and unhappy paths appropriately?
* If new dependencies are introduced, review those dependencies to get a sense of the community support behind it. Try to avoid including older, infrequently maintained modules, unless they are stable.
* Where content has been changed, has it been provided in all supported languages (English and Welsh)?
* Are commits squashed appropriately, where changes to the same scope are grouped into one commit?
* Are any breaking changes introduced; if so does the commit log include a `BREAKING CHANGE` comment in the footer?
* Is documentation included where appropriate?

## Handling contributions from a Github PR

1. Review the contribution in Github, asking the questions above and ensuring the contribution meets guidelines documented in [`CONTRIBUTING.md`](CONTRIBUTING.md); don't be shy about asking for changes (in the PR discussion) to meet these guidelines

2. Once the PR discussions are resolved (if any), on your local clone ensure you have latest source from the canonical internal repository:

```bash
git fetch origin
git checkout master
```

3. Checkout the Github PR with:

```bash
# Create a new local branch based on the contributor's name and branch, e.g.
# if "sue" wants to merge her "feature/thing" branch ...
git checkout -b sue-feature/thing master

# Pull the contributor's changes into that branch
git pull git://github.com/sue/sues-forked-repo.git feature/thing
```

4. Rebase the MR onto `master` to ensure it plays nicely with the latest integrated codebase. If there are conflicts at this stage, ask the contributor to bring their branch up to date with `master`:

```bash
git rebase master
```

5. Push this branch up to the canonical internal repository, and create a new internal PR. At this point we review the code in the same manner as any other internal project.

```bash
git push -u origin sue-feature/thing
```

6. Review the code locally using the guidelines above, ensuring it builds, passes linting and tests. Use the `npm run pipeline` and `npm run test:integration` scripts to cover these checks (check for changes to those scripts beforehand)

7. If successful, merge into master, ensure CI build passes before finally pushing back up to Github.
