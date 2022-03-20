# Access control

Inherit these contracts into your application to add privileged roles.

## Best practices

1. Have a highest-privilege account. We call this the chief executive officer ("CEO").
2. Only use the CEO account with a HARD WALLET.
3. Only allow the CEO to assign the privileged accounts.
   - Corollary: this means there will never be a `onlyCEO` modifier.
   - Corollary: this means the storage for the CEO address will be `private` in access control implementations.

## Flavors

By default you should choose the [`ThreeChiefOfficers`](ThreeChiefOfficers.sol) flavor. But if your application is holding Ether on behalf of others then instead use [`TwoChiefOfficers`](TwoChiefOfficers.sol).

| Role              | Function                             | [`ThreeChiefOfficers`](ThreeChiefOfficers.sol) | [`TwoChiefOfficers`](TwoChiefOfficers.sol) |
| ----------------- | ------------------------------------ | ---------------------------------------------- | ------------------------------------------ |
| Executive officer | Assigns officer roles                | :white_check_mark: Included                    | :white_check_mark: Included                |
| Operating officer | Can perform special contract actions | :white_check_mark: Included                    | :white_check_mark: Included                |
| Financial officer | Can withdraw Ether                   | :white_check_mark: Included                    | :x: Not included                           |