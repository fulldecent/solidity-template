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

