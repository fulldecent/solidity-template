TODO: 

shake out dependencies in package.json

# Solidity Project Template

Assumptions:

- You prefer GitHub and GitHub Actions
- Your project may be used to manage things worth millions of pounds of gold

This project has an opinion and supporting documentation for every tooling, infrastructure or style decision you need to make. So start here, implement your project and know that you have done everything in the highest-quality way.




Run test sute

```sh
nvm install 12 # special instructions on M1 mac
nvm use 12
npm install
npm run lint
FORCE_COLOR=1 ENABLE_GAS_REPORT=true npm run test
```

after edits, run:

```sh
rm -rf cache artifacts
npm run prepare # 
npm run lint
FORCE_COLOR=1 ENABLE_GAS_REPORT=true npm run test
# SKIP THIS npm run test:inheritance
npm run coverage
```

# Rabbit Counting Token

## References

- Uses [best practices for developing Solidity projects](https://github.com/fulldecent/solidity-template)
- 