# Access & Ownership Templates

:moneybag: This project is a supported by a bug bounty, see [BUG-BOUNTY.md](BUG-BOUNTY.md).

If you are using these contracts, click at top to WATCH this repository for updates and security fixes, and click SPONSOR above to ensure updates and fixes keep coming.

## Introduction

This folder features useful contract templates for managing access and ownership.

## Reusable contract modules

### Admin-managed Access Control 
Allows children to implement role-based access control mechanisms. This is a lightweight version that doesn't allow enumerating role members except through off-chain means by accessing the contract event logs.

### Two Officer Access Control
Role-based access control inspired by CryptoKitties, where two roles exist:
- executiveOfficer - Can only transfer officer roles
- financialOfficer - Can only withdraw from the contract

### Ownership Control
Allows an account to have access to certain contract features. By default this owner will be the same account that deploys this contract. And an owner can transfer to a new owner.