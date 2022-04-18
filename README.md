**PROJECT STATUS: Technology preview, bug bounty not active.**

# Solidity Template — Your Smart Contract Starting Point

This project is sponsored by: XXXX XXXX XXXX, your name here. Contact [Will](https://twitter.com/fulldecent) for details.

If you are using these contracts, click at top to WATCH this repository for updates and security fixes, and click SPONSOR above to ensure updates and fixes keep coming.

## How to use this

1. Click USE THIS TEMPLATE above to make your own repository based on this template.

2. Install project and run all tests
   ```sh
   # Install Node 14+ (or nvm install 14 && nvm use 14)
   yarn install
   yarn test
   ```

3. Add your own application code inside the Contracts folder and tests inside the Tests folder.

4. Delete stuff you don't need.

5. Make sure tests still pass.

6. Deploy and make a GitHub release showing your deployed address.

## Introduction

This repository is a starting point for anybody developing their own Solidity smart contracts. It is opinionated. You should use this as your starting point for all your projects.

**Reusable utilities**

See the contracts/Utilities folder.

**Implementations**

See the contracts folder. In here are the contracts you would use to deploy your contract and other implementation-specific details.

## Run test suite

Run this each time you change contracts or test scripts:

```sh
yarn run prepare
yarn run lint # note, we do not use Prettier style for Solidity
FORCE_COLOR=1 ENABLE_GAS_REPORT=true yarn run test
yarn run test:inheritance
yarn run coverage
```

## Smooth sailing

1. Install VS Code
2. Install VS Code Remote - Containers extension
3. Install a container system
   1. Install podman (maybe `brew install podman`?)
   2. `podman machine init`
   3. `podman machine start`
   4. Set VS Code setting Remote > Containers > Docker Path to `podman`

4. Install VS Code extension [Mocha Test Explorer](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter)  ([recommended](https://hardhat.org/guides/vscode-tests.html) by Hardhat)



// todo: get mocha running inside container https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter

## Contributing

:moneybag: See our bug bounty at [BUG-BOUNTY.md](BUG-BOUNTY.md) (NOT YET ACTIVE).

This repository is supported by William Entriken. We are accepting contributions of new features to the repository but have not defined yet which new feaures are welcome (!).

Please send pull requests to improve documentation and test cases. Please send issues for anything that might be improved.

### Idioms

* The zero address (0x00...00) is no more special than the one address (0x00...01). If your application treats them differently, document it.
* Log things that people might reasonably want to look up or index.

## References

- Uses [best practices for developing Solidity projects](https://github.com/fulldecent/solidity-template)
- Great implementation examples for setting up automated testing are maintained in the [OpenZeppelin Contracts project](https://github.com/OpenZeppelin/openzeppelin-contracts)
  - Hardhat is preferred for building / see also [Foundry](https://github.com/gakonst/foundry) as a competitive offering
- A good review of setting up your editor to use tools here is provided [by Yarn](https://yarnpkg.com/getting-started/editor-sdks)
- Set up VS Code
  - See [Hardhat + Mocha notes](https://hardhat.org/guides/vscode-tests.html)
- Style
  - Follow automated test cases and [Solidity style guide](https://docs.soliditylang.org/en/latest/style-guide.html), especially use [NatSpec](https://docs.soliditylang.org/en/latest/natspec-format.html?highlight=natspec) everywhere
  - Use underbar prefix for and only for private variables/functions, see https://github.com/OpenZeppelin/openzeppelin-contracts/pull/2798
- Use the contract name in every revert message
- Use a container for all work

### Style guide

- Use the Solidity style guide for Solidity code https://docs.soliditylang.org/en/latest/
  - 120 hard limit line length
  - Function parameters start with an underscore (_)
  - NatSpec
    - Align whitespace for tags
    - Align whitespace for `@param`s
    - `@param` (and state variable `@dev`) are sentence case without capitalization for the first letter
    - Events
      - `@notice` sentence case in past-simple tense without a period like "Tokens were transferred"
    - Functions
      - `@notice` sentence case in present-simple tense without a period like "Finish a sale"
      - `@dev` sentence case with a period at end
    - State variables
      - `@notice` (same as `@return`)
  - Follow [Solidity Style Guide](https://docs.soliditylang.org/en/v0.8.12/style-guide.html?highlight=style) where it makes sense
  - When comparing things, prefer to compare what we have versus the requirement, like `msg.sender == owner` rather than the reverse order.
  - Every require must have a message and start with the name of the contract/library
  - A data structure (a `library` with an embedded `struct`) must name the `struct` as `self`.
- Always use NatSpec with the `///` flavor (because Solidity documentation uses that one first, we can assume it is preferred). https://docs.soliditylang.org/en/latest/natspec-format.html
- Wrap Solidity to 120 columns
- Prefix private/internal functions & variables with underscore (_)
- File names and headings are sentence case. Except the name of this project is title case.
- 
