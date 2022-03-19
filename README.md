# Solidity Template — Your Smart Contract Starting Point

This project is sponsored by: XXXX XXXX XXXX, your name here. Contact [Will](https://twitter.com/fulldecent) for details.

If you are using these contracts, click at top to WATCH this repository for updates and security fixes, and click SPONSOR above to ensure updates and fixes keep coming.

## Introduction

This repository is a starting point for anybody developing their own smart contracts. It is opinionated. You should use this as your starting point for all your projects.

**Reusable utilities**

See the contracts/Utilities folder.

**Implementations**

See the contracts folder. In here are the contracts you would use to deploy your contract and other implementation-specific details.

## Deploy

1. Deploy the contracts in the contracts folder (not subfolders)

## Run test suite

If you are on an M1 Mac, note that Node.js is currently broken.

Setup

```sh
nvm install 12 # see special instructions above for M1 Mac
nvm use 12
npm install
```

Now run this each time you change contracts or test scripts:

```sh
npm run prepare
npm run lint # note, we do not use Prettier style for Solidity
FORCE_COLOR=1 ENABLE_GAS_REPORT=true npm run test
npm run test:inheritance
npm run coverage
```

## Contributing

:moneybag: See our bug bounty at [BUG-BOUNTY.md](BUG-BOUNTY.md) (NOT YET ACTIVE).

This repository is supported by William Entriken. We are accepting contributions of new features to the repository but have not defined yet which new feaures are welcome (!).

Please send pull requests to improve documentation and test cases. Please send issues for anything that might be improved.

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

### Style guide

- Use the Solidity style guide for Solidity code https://docs.soliditylang.org/en/latest/
- Always use NatSpec with the `///` flavor (because Solidity documentation uses that one first, we can assume it is preferred). https://docs.soliditylang.org/en/latest/natspec-format.html
- Wrap Solidity to 120 columns
- Require/throw reasons should start with the name of the contract/library
- Standardize @notice @dev sentence case here
- Prefix private/internal functions & variables with underscore (_)
- also see area.word contracts
