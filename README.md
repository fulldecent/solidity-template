# Solidity Template — Your Smart Contract Starting Point

:moneybag: This project is a supported by a bug bounty, see [BUG-BOUNTY.md](BUG-BOUNTY.md).

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

This repository is supported by William Entriken. We are accepting contributions of new features to the repository but have not defined yet which new feaures are welcome (!).

Please send pull requests to improve documentation and test cases. Please send issues for anything that might be improved.

## References

- Uses [best practices for developing Solidity projects](https://github.com/fulldecent/solidity-template)
- Great implementation examples for setting up automated testing are maintained in the [OpenZeppelin Contracts project](https://github.com/OpenZeppelin/openzeppelin-contracts)
  - Hardhat is preferred for building
- A good review of setting up your editor to use tools here is provided [by Yarn](https://yarnpkg.com/getting-started/editor-sdks)
- Set up VS Code
  - See [Hardhat + Mocha notes](https://hardhat.org/guides/vscode-tests.html)
- Style
  - Follow automated test cases and [Solidity style guide](https://docs.soliditylang.org/en/latest/style-guide.html), especially use [NatSpec](https://docs.soliditylang.org/en/latest/natspec-format.html?highlight=natspec) everywhere
- Use the contract name in every revert message
