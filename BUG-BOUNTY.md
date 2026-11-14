# Solidity Template Bug Bounty :bug: = :moneybag:

This bug bounty is a draft and is not active yet.

*This documents the Solidity Template bug bounty program and how you can get rewarded for finding problems with this project.*

:star: No programming experience is required.

## Sponsors

Sponsor this bug bounty if you support Solidity Template. This means you will commit to paying researchers that demonstrate a problem. [Contact us](https://x.com/intent/tweet?text=%40fulldecent%20) if interested. Thank you.

This bug bounty is sponsored by:

* William Entriken
* (Con)

The total cumulative bounty value is limited to USD ???.

## Scope of this bounty program

We appreciate all suggestions for code, operations and style improvement, and will take them into consideration.

All source code that is deployable (i.e. all Solidity files not in the Mocks folder), for the latest released version, are **in scope**. Everything else is there to help you but is **out of scope** for the bounty program.

Social engineering, XKCD#538 attacks, bringing down Ethereum Mainnet/Infura, and other problems outside of the deployable contracts are **out of scope**.

Using a version of Solidity older than the latest version ([they don't support it](https://github.com/argotorg/solidity/security#supported-versions)) or other dependencies which their vendors no longer support is **out of scope**.

## Sensitivity

For all **in scope** items, the following items count:

* Any unexpected, dangerous functionality
* Stealing tokens
* Privilege escalation
* Denial of service (by other than the owner of the contract and explicitly permitted entities)

Additionally, for all **in scope** items excluding copied vendor code, the following items count:

* Typos
* Violations of the Solidity style guide, as [amended by our README](./README.md#style-guide)
* Inconsistent usage of whitespace

We are inspired by the Chinese idiom 一字千金.

## Rules and rewards

* Problems that have already been published here or are already disclosed to sponsors here are not eligible for rewards (a corollary: the sponsors are ineligible for rewards).
* GitHub Issues is the only way to report problems and request rewards.
* The lead sponsor has complete and final judgment on the acceptability of reports.
* This program is governed under the laws of the United States, if there is a party that we are unable to pay due to trade embargoes or other restrictions, then we won't pay. But we are happy to cooperate by making alternate arrangements.

Following is a [risk rating model](https://community.owasp.org/OWASP_Risk_Rating_Methodology) that judges the severity of a problem based on its likelihood and impact.

|               | Low likelihood  | Medium likelihood | High likelihood  |
| ------------- | --------------- | ----------------- | ---------------- |
| High impact   | Medium severity | High severity     | Highest severity |
| Medium impact | Low severity    | Medium severity   | High severity    |
| Low impact    | *Notable*       | Low severity      | Medium severity  |

Rewards:

* **Highest severity** — USD ???
* **High severity** — USD ???
* **Medium severity** — USD ???
* Low severity and notable — no cash payout
* Every accepted problem report will also receive
  * ??? Public acknowledgement from the Community Service Hour team and personally from Will on X

Examples of impact:

* *High impact* — steal an asset/value from someone else, impersonate the ledger owner, marketplace order distributes assets incorrectly
* *Medium impact* — cause a function to fail or performs a wrong operation
* *Low impact* — an obvious mistake in the documentation that affects the development process and validity of the applied code
* *Notable* — typos, missing comments

Examples of likelihood:

* *High likelihood* — affects all users of the ledger performing a certain function
* *Medium likelihood* — affects a number of end users in a scenario that actually happens naturally in production deployments
* *Low likelihood* — hurts two end users only if they are cooperating together to hurt themselves
* *Notable* — affects developers and grammarians but not end users

How to win:

* Be descriptive and detailed when reporting your problem
* Fix it — recommend a way to solve the problem

Rules for bounty sponsor:

* We will respond quickly to your questions
* We will adjudicate all prizes quickly

## More questions

* Will things change during the bounty program?
  * Yes, we will update the code and redeploy the contract. So, click [:star: STAR and :eye: WATCH](https://github.com/fulldecent/solidity-template) above on this repo for updates.
* Taxes?
  * If you earn so much money that applicable law requires you to complete a tax form, then we will ask you to do so.

## Thank you

Thank you for your interest in Solidity Template, for reading to the end of this file and for reading our code. Even if you don't find any problems, I'd love to hear your thoughts.

William Entriken / [@fulldecent](https://x.com/intent/tweet?text=%40fulldecent%20)
