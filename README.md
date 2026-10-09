# Solidity Template

> [!TIP]
> This template is a starting point you can use for every Solidity project. We offer:
>
> - Hardhat 3 builds and TypeScript tests (`node:test` + viem) in continuous integration
> - Solhint on the contracts
> - Reusable access-control, data-structure and token contracts you can copy or delete
>
> What is in-scope for this template?
>
> We the people who manage Solidity projects, in order to advocate for a safer installation path and current defaults for Ethereum development, maintain this starting point for all projects.
>
> This solidity-template must remain broad—addressing the needs of many kinds of projects. Every project deserves a README, and a clear rule on basic formatting questions, this is why we include continuous integration linting.
>
> We do not specify that GitHub and GitHub Actions are the only way to host projects, others may consider our GitHub-specific notes as a starting point guide for implementing outside of GitHub.
>
> And now below is the template, shown for a specific hypothetical project, enjoy!

[![Lint](https://github.com/fulldecent/solidity-template/actions/workflows/lint.yml/badge.svg)](https://github.com/fulldecent/solidity-template/actions/workflows/lint.yml) [![Build and test](https://github.com/fulldecent/solidity-template/actions/workflows/build-test.yml/badge.svg)](https://github.com/fulldecent/solidity-template/actions/workflows/build-test.yml)

**PROJECT STATUS: Technology preview, bug bounty not active.**

Reusable Solidity building blocks: three-officer access control, a lazy array, a commit queue, and a non-transferable ERC-721.

> [!NOTE]
> Replace the project name, description, demonstration and badge URLs with your own. Show what your project does before asking people to read further.

## Installation

You will need Git and Node.js 22.13 or later (the current Hardhat 3 requirement).

> [!WARNING]
> Install Node.js with your operating system package manager. That is safer than installer pages that tell you to pipe `curl` into a shell ([ref](#references)).

```sh
node --version
npm --version
```

Open a terminal (PowerShell on Windows) and use the instructions for your operating system.

### Linux

On Ubuntu 22.04+ or Debian 12+:

```sh
sudo apt update
sudo apt install git nodejs npm
```

On Fedora:

```sh
sudo dnf install git nodejs npm
```

Confirm `node --version` is 22.13 or later. If your distribution ships an older Node, use its documented Node 22 packages (for example NodeSource packages you install with `apt`, not a `curl | sh` bootstrap).

### macOS

Install Apple's Command Line Tools if they are not already installed:

```sh
xcode-select --install
```

With Homebrew installed:

```sh
brew install git node
```

### Windows

```sh
winget install --exact --id Git.Git
winget install --exact --id OpenJS.NodeJS.LTS
```

Open a new PowerShell window so Node is on `PATH`.

### Build and test

```sh
git clone https://github.com/fulldecent/solidity-template.git
cd solidity-template
npm ci
npm test
```

> [!NOTE]
> Explain what your users need to install, including the tools your project is built on. Replace the repository URL with your own.

## Usage

1. Click **Use this template** on GitHub to make your own repository, or clone as above.
2. Put application contracts in `contracts/` and TypeScript tests in `test/`.
3. Delete contracts you do not need.
4. Keep `npm test` green.
5. Deploy and make a GitHub release showing your deployed address.

Compile:

```sh
npx hardhat build
```

Run TypeScript tests:

```sh
npm test
```

Coverage:

```sh
npm run coverage
```

## Development

Thank you for taking an interest in improving Solidity Template.

Follow the installation instructions above. Work from the project directory.

### Testing

GitHub Actions runs [checks](.github/workflows) on pushes to `main` and pull requests. Run the same commands locally before sending proposed changes:

```sh
npm test
npm run lint
npx hardhat build
npx tsc --noEmit
```

Tests live in `test/` and use the Node.js test runner with viem. They talk to a simulated chain through Hardhat 3.

### Releases

Use `fix:`, `feat:` or `BREAKING CHANGE:` in your commit messages. This triggers our bot to make a release draft pull request. Merging that pull request triggers a new tag and GitHub Release.

The [release workflow](.github/workflows/release.yml) uses Release Please's `simple` release type. Set the version in [package.json](package.json) to the proposed release version before merging the release pull request.

[Build and test](.github/workflows/build-test.yml) installs dependencies, lints and tests the contracts, copies them to `dist/`, then attests and uploads that directory. The release includes the contracts and `release.sigstore.jsonl`, containing build provenance and version attestations.

> [!NOTE]
> In your GitHub repository settings, under Actions, General, Workflow permissions, select read and write permissions and check "Allow GitHub Actions to create and approve pull requests". Under General, Releases, enable release immutability. Attestations are available for public repositories; private repositories require GitHub Enterprise Cloud.
>
> Run these commands from a clone of the new repository. `gh` fills in `{owner}/{repo}` from that clone.
>
> List tags:
>
> ```sh
> gh api repos/{owner}/{repo}/tags --jq '.[].name'
> ```
>
> Set the starting tag on the current `main` commit. `v0.0.0` is the version Release Please counts forward from. Use another `vMAJOR.MINOR.PATCH` tag when this repository should start later.
>
> ```sh
> gh api --method POST repos/{owner}/{repo}/git/refs \
>   -f ref="refs/tags/v0.0.0" \
>   -f sha="$(gh api repos/{owner}/{repo}/commits/main --jq .sha)"
> ```
>
> `gh release list` and `gh release create` publish the releases this workflow creates after that tag.

### Idioms

- The zero address (`0x00...00`) is no more special than the one address (`0x00...01`). If your application treats them differently, document it.
- Log things that people might reasonably want to look up or index.

### Style guide

Local conventions in this project include:

- `.sol` `.ts` 120 hard limit line length
- `.md` File names and headings are sentence case. Except the name of this project is title case.

We recognize the following as best practice for all Solidity development:

- Fully annotate public ABI with [NatSpec](https://docs.soliditylang.org/en/latest/natspec-format.html), using the `///` flavor.
- Align whitespace for tags, then params:

  ```solidity
  /// @notice Hi
  /// @dev    This does things.
  /// @param  name the self-chosen name for this entity
  /// @param  age  time since their birth, in seconds
  ```

- For `@param` (and state variable `@dev`), use sentence case without capitalization for the first letter.
- For `@notice` with an `event`, use past-simple tense without a period like "Tokens were transferred".
- For `@notice` with a `function`, use sentence case in present-simple tense without a period like "Finish a sale".
- When comparing things, prefer to compare what we have versus the requirement, like `msg.sender == owner`.
- For error conditions, prefer using `revert()` with an `error`. If using `require()`, always include a revert-string and that string must start with the name of the contract/library.
- A data structure (a `library` with an embedded `struct`) must name the `struct` as `self`.
- For abstract contracts, design for safety by enforcing rules if possible. See in ThreeChiefOfficers how the state variables are kept private.
- Use an underscore (`_`) suffix for function parameters that would collide with a named state variable.

Where not more specifically addressed above, we defer all style decisions to (in order):

1. The [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html) where it makes sense
   1. Prefix private/internal functions and variables with underscore (`_`)
2. Conventions in [Seaport](https://github.com/ProjectOpenSea/seaport)
3. Conventions in [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)

### Maintenance

The project administrator completes these maintenance tasks each month. If they are 3+ months late, please remind them or send your own issue/pull request.

1. Identify external Actions in [.github/workflows](.github/workflows) and look for available new versions. Review and update them if it is safe. GitHub-supported Actions (under the `actions/` organization) may require only cursory review.
2. Check new Hardhat and Solidity releases and whether our Node engine or compiler version should change. Keep the installation instructions and `package.json` consistent with that decision.

## Project scope

We are people who write Solidity contracts. This repository is a starting point: toolchain, tests, and a few reusable libraries.

We specifically will not add a frontend, an indexer, or a production token deployment as part of the template itself.

> [!NOTE]
> Introduce your community, explain what is in scope and say what is out of scope.

## References

1. We use title case only for proper nouns, including the name of our project.
2. We recommend to use your package manager to install Node.js because installer sites for Node, nvm, Foundry (`getfoundry.sh`) and similar tools often prefer the unsafe `curl|sh` method. Foundry's own installation page uses `curl -L https://getfoundry.sh/install | bash`; do not run that. See also [rust-lang/rust#163468](https://github.com/rust-lang/rust/issues/163468) and the notes in [fulldecent/rust-template](https://github.com/fulldecent/rust-template).
3. This project is built based on [best practices documented in solidity-template](https://github.com/fulldecent/solidity-template/).
4. This project is built based on [best practices documented in project-template](https://github.com/fulldecent/project-template), release v1.3.0.
5. Tooling follows [Hardhat 3](https://hardhat.org/docs/getting-started) with the [viem toolbox](https://hardhat.org/docs/plugins/hardhat-toolbox-viem).
6. This project is released under the [Apache License 2.0](LICENSE.md).

> [!NOTE]
> Carefully consider which license to apply to your project. Cite external sources that materially informed your decisions, including the release of this Solidity template you used.
