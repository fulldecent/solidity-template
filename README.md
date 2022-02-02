## Contributing

### Style guide

- Use the Solidity style guide for Solidity code https://docs.soliditylang.org/en/latest/
- Always use NatSpec with the `///` flavor (because Solidity documentation uses that one first, we can assume it is preferred). https://docs.soliditylang.org/en/latest/natspec-format.html
- Wrap Solidity to 120 columns
- Require/throw reasons should start with the name of the contract/library
- Standardize @notice @dev sentence case here
- Prefix private/internal functions & variables with underscore (_)
- also see area.word contracts