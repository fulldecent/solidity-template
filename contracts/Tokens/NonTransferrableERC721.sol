// SPDX-License-Identifier: MIT
pragma solidity ^0.8.38;

/// @notice This implementation of ERC-721 that does not allow tokens to be transferred. Also known as badges, soulbound
///         tokens, KYC tokens, access list tokens, proof of X tokens.
/// @dev    See https://eips.ethereum.org/EIPS/eip-721
abstract contract NonTransferrableERC721 {
    /// @notice Ownership was assigned
    /// @param from Always zero because this is a non-transferrable token.
    /// @param to   The address of the new owner of the NFT
    /// @param id   The NFT's ID
    event Transfer(address indexed from, address indexed to, uint256 indexed id);

    /// @notice The token name
    /// @return the token name
    string public name;

    /// @notice The token symbol
    /// @return the token symbol
    string public symbol;

    /// @notice The URI of a token
    /// @param id the NFT's ID
    /// @return the token URI
    function tokenURI(uint256 id) public view virtual returns (string memory);

    /// @notice Owner of each token
    mapping(uint256 => address) internal _ownerOf;

    /// @notice Token count of each account
    mapping(address => uint256) internal _balanceOf;

    /// @notice Find the owner of an NFT
    /// @dev    NFTs assigned to zero address are considered invalid, and queries about them do throw.
    /// @param  id    The identifier for an NFT
    /// @return owner The address of the owner of the NFT
    function ownerOf(uint256 id) public view virtual returns (address owner) {
        owner = _ownerOf[id];
        require(owner != address(0), "NOT_MINTED");
    }

    /// @notice Count all NFTs assigned to an owner
    /// @dev    NFTs assigned to the zero address are considered invalid, and this function throws for queries about the
    ///         zero address.
    /// @param  owner An address for whom to query the balance
    /// @return The number of NFTs owned by `owner`, possibly zero
    function balanceOf(address owner) public view virtual returns (uint256) {
        require(owner != address(0), "ZERO_ADDRESS");
        return _balanceOf[owner];
    }

    /// @notice Query if a contract implements an interface
    /// @param  interfaceId The interface identifier, as specified in ERC-165
    /// @dev    Interface identification is specified in ERC-165. This function uses less than 30,000 gas.
    /// @return `true` if the contract implements `interfaceID` and `interfaceID` is not 0xffffffff, `false` otherwise
    function supportsInterface(bytes4 interfaceId) public view virtual returns (bool) {
        return
            interfaceId == 0x01ffc9a7 || // ERC165 interface ID for ERC165
            interfaceId == 0x80ac58cd || // ERC165 interface ID for ERC721
            interfaceId == 0x5b5e139f; // ERC165 interface ID for ERC721Metadata
    }

    /// @param name_   The new name of the token
    /// @param symbol_ The new symbol of the token
    constructor(string memory name_, string memory symbol_) {
        name = name_;
        symbol = symbol_;
    }

    /// @notice Mint a new token
    /// @param  to The address of the new owner of the NFT
    /// @param  id The NFT's ID
    function _mint(address to, uint256 id) internal virtual {
        require(to != address(0), "INVALID_RECIPIENT");
        require(_ownerOf[id] == address(0), "ALREADY_MINTED");
        // Counter overflow is incredibly unrealistic.
        unchecked {
            _balanceOf[to]++;
        }
        _ownerOf[id] = to;
        emit Transfer(address(0), to, id);
    }
}