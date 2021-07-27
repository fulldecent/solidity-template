TODO: 

- shake out dependencies in package.json
- default on for ENABLE_GAS_REPORT and hardcode prices and gas

# Solidity Project Template

Assumptions:

- You prefer GitHub and GitHub Actions
- Your project may be used to manage things worth millions of pounds of gold

This project has an opinion and supporting documentation for every tooling, infrastructure or style decision you need to make. So start here, implement your project and know that you have done everything in the highest-quality way.

To use this project, delete this section and everything up to the triple line break. Now this is your project, touch each file to see what's up, and implement your product.

---
---
---

# Rabbit Counting Token

## Run test suite

Setup

```sh
nvm install 12 # special instructions on M1 mac
nvm use 12
npm install
```

Now run this each time you change contracts or test scripts:

```sh
npm run prepare
npm run lint
FORCE_COLOR=1 ENABLE_GAS_REPORT=true npm run test
npm run test:inheritance
npm run coverage
```

## References

- Uses [best practices for developing Solidity projects](https://github.com/fulldecent/solidity-template)
- Great implementation examples for setting up automated testing are maintained in the [OpenZeppelin Contracts project](https://github.com/OpenZeppelin/openzeppelin-contracts)
- Hardhat is preferred for building // TODO: https://ethereum.stackexchange.com/questions/103840/what-is-the-origin-of-the-hardhat-project
- A good review of setting up your editor to use tools here is provided [by Yarn](https://yarnpkg.com/getting-started/editor-sdks)
