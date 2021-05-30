TEMPLATE STATUS // DISCUSSION DRAFT, NOT FULLY USABLE

TODO: ADD SOLHINT AS A BEST PRACTICE

TODO: ADD GITHUB ACTIONS

# Solidity Template

An opinionated starting point for any Solidity project



## Do this for the first 0.1.0 release

- [ ] Create explanation in README about what the main use cases are
  - [ ] Include all new words you are introducing in bold, or italics, or a glossary. This helps you to track consistent word usage across your documentation and contracts... after you may have refactored or changed names of things.
- [ ] Do screen recording of deployment and basic annotated prove out showing that it works
- [ ] Update everything to use this latest version of Solidity
  - [ ] Check recent Solidity releases // anything that affects us?
- [ ] Spell check everything

## Best practices

- Documentation
  - create documentation in beautiful markdown (you should do this by hand for now?)
    - Here is good API documentation https://developer.apple.com/documentation/swift/closedrange
    - see https://uniswap-docs-git-reference-only-uniswap.vercel.app/reference/libraries/BitMath
- Code style
  - Use Solidity code style https://docs.soliditylang.org/en/latest/style-guide.html?highlight=style%20guide
  - Contracts are fully annotated using NatSpec for all public interfaces (everything in the ABI) https://docs.soliditylang.org/en/latest/style-guide.html?highlight=natspec#natspec
- Solidity practices
  - "you should use the latest released version of Solidity" https://docs.soliditylang.org/en/latest/
  - check warnings in Remix and Truffle
- Auditing best practices
  - audit best practices // https://ethereum.stackexchange.com/questions/8551/security-review-checklist-for-a-smart-contract/8593#8593
  - https://forum.soliditylang.org/t/key-points-while-conducting-a-security-audit-of-nft-smart-contract/217
  - https://stackoverflow.com/questions/67529185/how-would-you-describe-a-little-endian-or-big-endian-ascii-string <<<<<<
