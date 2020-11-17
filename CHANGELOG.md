## [8.0.1](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/8.0.0...8.0.1) (2020-11-17)



# [8.0.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/7.1.0...8.0.0) (2020-11-13)


### Bug Fixes

* sanitise money string with commas prior to calculation ([50dbfc6](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/50dbfc62b47c2625a9d99040f2c37b3a9c7fe42c))


### Features

* [bc] capture details of a claimant's employer; name, address, etc ([cb36b31](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/cb36b3106c329278c53f65a1aaa099dcc4a68d2a))
* [bc] split earnings page into employment and self-employment pages ([ec4716b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/ec4716bc217f90e57bcac740545011093eac1e8c))


### BREAKING CHANGES

* Adds an conditional field where if haveEmployment is
yes a required field is presented. If a user answered yes in an existing
journey they'd be kicked back to answer this new question.

Resolves AFPC-424, AFPC-472
* Removes one page and adds two new pages into journey,
they must be completed so could potentially break live journeys.

Resolves AFPC-880



# [7.1.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/7.0.0...7.1.0) (2020-11-10)


### Features

* add content informing users of callbacks they may receive ([f4d8c4a](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f4d8c4a9b8e9e9a079a97e0243aa801a1f39a991))



# [7.0.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/6.0.0...7.0.0) (2020-11-06)


### Features

* [bc] add page to capture that the claimant is on Universal Credit ([f901dfc](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f901dfcc51de01bb0626746722af6e83cc4f6944))


### BREAKING CHANGES

* all users must complete this page to progress, so would
break existing journeys, sending the user back to this page.

Resolves AFPC-796



# [6.0.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/5.3.0...6.0.0) (2020-10-30)


### Features

* [bc] offer calculated claim date to user rather than take any date ([4641f55](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/4641f5554e1a6dcba93215d50169cfab019fca54))
* persist initial application date from start of journey to the end ([5dca292](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/5dca292ef657efbe1ed2345afdcedba0b7490b28))
* simplify self employment date logic to ease test effort (for now) ([b0643d7](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/b0643d735385dfacf761bac6a1df8a5234ad414d))
* update self-employed earnings section inline with date of claim ([d2c1704](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/d2c17040c47196cfb9e4b5001099e96d8e43170e))


### BREAKING CHANGES

* New pages added, one page removed. Journey's changed
in such a way that would required user to go back and answer unanswered
questions.

Claimants don't understand the guidance on the Date of Claim page and
are entering invalid dates of claim, or potentially missing out on
backdating entitlement. To resolve this we are calculating a date of
claim in service based on their date of birth and any periods abroad and
are offering it to them as a Yes/No option. They can still supply their
own date of claim if they wish.

Resolves AFPC-180, AFPC-787



# [5.3.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/5.2.3...5.3.0) (2020-10-23)


### Features

* add assisted digital telephone numbers for the rest of UK ([8f4c32e](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/8f4c32ed972ed45ad0c9bc1b1899f57735d3cfdf))
* improve support for Internet Explorer 8 by including HTML5 Shiv ([810c8b7](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/810c8b795ae92cd66a0fffd31c579f96de37ff2a))



## [5.2.3](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/5.2.2...5.2.3) (2020-10-19)


### Bug Fixes

* send an empty SVG response for header crown to work around IE issue ([5d0eee1](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/5d0eee19a0e2e778f583e7e6caaaaff2b3a6905a))


### Reverts

* Revert "refactor: alter samesite config" ([11a01c8](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/11a01c85fec61743b4ff8a5a40e922da52bde542))



## [5.2.2](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/5.2.1...5.2.2) (2020-10-16)


### Bug Fixes

* hard coded service header should use assetPath for crown image tag ([1c9630c](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/1c9630c6b1cd70484f272528e4228458312d2d06))



## [5.2.1](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/5.2.0...5.2.1) (2020-10-16)


### Bug Fixes

* configure SameSite flag for broader compatibiity ([3daa463](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/3daa463feb03369fb016660ca3f1e136b3ebc2a4))
* **ci:** correct github actions config ([e1fe2c8](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/e1fe2c8305fadb09b420f9354d8e5114cf53b25a))



# [5.2.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/5.1.1...5.2.0) (2020-10-09)


### Features

* add phone numbers for Northern Ireland assisted digital support ([f0e0d24](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f0e0d24cf6f99e4dcdc8800c8d98d78749fe5bfb))
* update money page to include new content and money specific input ([92b0354](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/92b0354349930b26bd3a7266e4ca6d02847af7c7))



## [5.1.1](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/5.1.0...5.1.1) (2020-09-29)



# [5.1.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/5.0.2...5.1.0) (2020-09-25)


### Features

* don't show disregards for users who have 2nd property but no money ([8eb5dcb](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/8eb5dcba72609ea786d1544cb5f8726018578f9b))



## [5.0.2](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/5.0.1...5.0.2) (2020-09-22)



## [5.0.1](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/5.0.0...5.0.1) (2020-09-21)


### Bug Fixes

* passing proxy url to timeoutDialog meta tag, use CASA mountUrl ([b3c4f83](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/b3c4f83978d52ce3880fd01c9ea7dba9d80e2310))



# [5.0.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/4.1.1...5.0.0) (2020-09-18)


### Code Refactoring

* [bc] add configurable cryto context and suite ([f91d88e](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f91d88eb6ecaeee54a28134b90674921ae057558))


### Features

* add modal to warn users of session expiry & opportunity to extend ([f1bf898](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f1bf898c85dbf6cd552e08d84411481c045a8ea4))
* build all frontend assets from source/sass, compile optimised file ([6f9f8a2](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/6f9f8a2e0bb27a7f0739a7c53a2cf2db69def7c1))
* include custom CASA JS and CSS in built bundles ([091e20d](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/091e20df25dabc91d63683a37bc19c97863f3b9a))


### BREAKING CHANGES

* Introducing a configurable context per environment may
render existing sessions unreadable, so they will need to timeout/purge.

Resolves AFPC-574



## [4.1.1](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/4.1.0...4.1.1) (2020-09-11)



# [4.1.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/4.0.2...4.1.0) (2020-09-11)


### Features

* remove any GA cookies if policy is rejected after it was accepted ([2e4cff0](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/2e4cff0d0c62aee345f1a5b80a8d2614f0e5eca3))



## [4.0.2](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/4.0.1...4.0.2) (2020-09-09)



## [4.0.1](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/4.0.0...4.0.1) (2020-09-04)


### Bug Fixes

* call encodeURI on change link hrefs to escape invalid characters ([a3b5622](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/a3b562208691c65f00bf0e1ccce54359a2f4a885))
* unclosed span in who-made-claim change link content ([2d1e01e](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/2d1e01ead85693e271a8d58fddd07fd8e467a926))



# [4.0.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/3.1.0...4.0.0) (2020-09-01)


### Bug Fixes

* cache-bust service CSS file using query string of version number ([3cc86be](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/3cc86be849d360b517a82c8d84cb713cb94f3187))


### Features

* [bc] add page asking if the user has any income or capital bonds ([b779793](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/b779793139315739d2721625fb6e28a1b68e7275))
* [bc] split asylum seeker application questions onto separate pages ([9198877](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/9198877325c8c7fd101bb9c138de5a3c680b66e2))
* log values that fail validation on the money-you-have page ([88dbd5a](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/88dbd5ae5b2f01400fad568396a9155a3e3a399e))


### BREAKING CHANGES

* Added a new page in the journey, if the user had
progressed passed this point and then the service was updated, they'd be
kicked back again to answer it.

Resolves AFPC-647
* Questions moved from aslyum-seeker pages to
aslyum-application pages would cause the user to answer the same
questions again on a new URL if deployed against active sessions.

Resolves AFPC-603



# [3.1.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/3.0.0...3.1.0) (2020-08-26)


### Bug Fixes

* move cookie banner to after skip link to suppress AXE warning ([8415b34](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/8415b34beaf57a603ce8b55f9fd00be639b00f03))


### Features

* add print buttons ([f83ab5a](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f83ab5accbe6a0bd4221b2f29964866e8d4ddd2b))
* add print media stylesheet ([e957407](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/e957407c12154d138d1199066649be0be6549641))



# [3.0.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/2.0.2...3.0.0) (2020-08-17)


### Features

* [bc] add new contact details section with delegated authorities ([d1491af](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/d1491af8ea145a199876259630c69968dcc8b5b2))
* [bc] capture having partner, and living with partner separately ([cffc247](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/cffc247e1e6d1c5f594c1e49c1ad48622a3adfe7))
* deeply trim white space from all field date objects ([f22a663](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f22a6635b0404fda1d88cd399248eb52f8b28a7c))


### BREAKING CHANGES

* Adds new pages capturing new data, removes old pages,
moves some around. Contact formats no longer optional, would force user
back to section if they'd skipped checking a box. Correspondence
address URLs have changed.
* The liveWithPartner field now has a slightly different
context, and we have added a new required field, havePartner.

Resolves AFPC-494 AFPC-584



## [2.0.2](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/2.0.1...2.0.2) (2020-08-10)



## [2.0.1](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/2.0.0...2.0.1) (2020-08-04)



# [2.0.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/1.1.0...2.0.0) (2020-07-17)


### Features

* [bc] don't ask about pension age housing benefit if not eligible ([fa63f94](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/fa63f94d3c5e1b735f5c4426b91cc1dc19e1220f))


### BREAKING CHANGES

* Could alter journey based on date of birth



# [1.1.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/1.0.0...1.1.0) (2020-07-07)


### Bug Fixes

* set sameSite and secure flags on seen_cookie_message cookie ([d7af6a6](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/d7af6a6e91ef170d7b1cd45fada3d4071b1e259e))


### Features

* add content about shared accounts to money-you-have page ([2801bfd](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/2801bfd32b2408888e76a67ded8699a8edabc887))
* move nationality questions to directly before HRT questions ([11410cd](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/11410cd852e645dcf5fef16aa5761f742ad35250))



# [1.0.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/0.5.0...1.0.0) (2020-06-29)


### Code Refactoring

* [bc] extract partner name to separate page ([a241464](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/a24146488288b5e39cba55d40ad8e3af4dbb052a))
* [bc] extract partner NI question to separate page ([24db80b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/24db80b1c849436d7b78e45da2a9ef973b7c03a9))
* [bc] extract partner sight-impaired to separate page ([a01c34c](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/a01c34c7fa04105484a6228cf70a1932b1128136))


### BREAKING CHANGES

* Waypoint url has changed, and thus the key against
which data to stored.
* Whilst the data captured has not changed, it is now
captured on a separate page which will trigger an unexpected traversal
failure for existing sessions.
* Whilst the data captured has not changed, it is now
captured on a separate page which will trigger an unexpected traversal
failure for existing sessions.



# [0.5.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/0.4.3...0.5.0) (2020-06-18)


### Features

* [bc] add page about 21 year leases if renters pay ground rent ([9333473](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/9333473ad345a999afee904c598e72d977188804))
* [bc] split 'are you registered blind' radios onto their own page ([4f73a3a](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/4f73a3a13b5491770c89d2d8c3b8f60123ca99a3))
* [bc] split 'help with letters or phone' radios onto their own page ([40b5625](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/40b56250ca858b6f10cb8f999747dff052658d1f))
* [bc] split contact telephone number field out onto its own page ([3883dd4](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/3883dd4509d557020817b5608c7c561fe6f7d02e))
* [bc] split full name and previous names out onto their own page ([a490bb7](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/a490bb75ed07523734f651a8eec5cf1f1d8f334a))
* [bc] split national insurance number field out onto its own page ([83f11c2](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/83f11c2f326fa1a802b197ef2046860f69623589))
* [bc] split preferred language fields out onto their own page ([9222798](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/92227984e9fd0973fe3f6be73c3424e82d625f2c))
* [bc] split service-charges into new pages, only route if relevant ([b159e60](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/b159e60bbad850a3042d39113e1e8e88dc6e9477))
* add shared ownership as option on home ownership page ([e1d398a](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/e1d398a417e9cf00045643001532ff6d78e18b4e))
* dynamically refer to relevant payment on share-rent-mortgage page ([cfff242](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/cfff2427d25c0375b7f07c46c63b18d3cd8fafa0))
* remove service charges and ground rent amount fields ([3770bd6](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/3770bd60996e42752115b2035f1ff5ef4792d39f))


### BREAKING CHANGES

* Whilst the data captured has not changed, it is now
captured on a separate page which will trigger an unexpected traversal
failure for existing sessions.
* Whilst the data captured has not changed, it is now
captured on a separate page which will trigger an unexpected traversal
failure for existing sessions.
* Whilst the data captured has not changed, it is now
captured on a separate page which will trigger an unexpected traversal
failure for existing sessions.
* Whilst the data captured has not changed, it is now
captured on a separate page which will trigger an unexpected traversal
failure for existing sessions.
* Whilst the data captured has not changed, it is now
captured on a separate page which will trigger an unexpected traversal
failure for existing sessions.
* Whilst the data captured has not changed, it is now
captured on a separate page which will trigger an unexpected traversal
failure for existing sessions.
* service-charges split into 3 pages, session data has
same keys but would belong to different page objects, would force users
to recomplete.
* requires users to complete a new page if they rent and
pay ground rent.



## [0.4.3](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/0.4.2...0.4.3) (2020-06-10)



## [0.4.2](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/0.4.1...0.4.2) (2020-06-03)


### Bug Fixes

* correct typo in partner-details ([477a1ec](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/477a1ecfcd1c6b3b3b9ca1e66a5457ef53aabe61))
* incorrect date formatting in what-happens-next ([2a77e64](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/2a77e64e95791369998bbf4b20c6c452db7c3de5))



## [0.4.1](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/0.4.0...0.4.1) (2020-05-27)



# [0.4.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/0.3.2...0.4.0) (2020-05-22)


### Bug Fixes

* heading on partner sponsor address manual entry was incorrect ([e9eea9b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/e9eea9b3864f8f6bd681542b7776963c5057a523))
* make sure claimant nationality info is sent to the backend ([1c0b43e](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/1c0b43ee6f2ad8d60815bf7e9a18c3d53bd8379c))
* send countryOfResidence in correct namespace ([9d05a94](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/9d05a94f0455218850b372480eaf97b468b6935a))
* use correct carers allowance link for NI context ([a9c70b3](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/a9c70b3cb21077c982ad67c639a4ec9c656a0012))


### Code Refactoring

* [bc] ask the customer which country they live in ([1a63c4b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/1a63c4b8c4e3b7198206f5e36ff9b7c90b42b01f))
* [bc] show different content for NI on council tax/rates pages ([179a91c](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/179a91c9c7f23aae54ad402c6877305da5290fae))


### Features

* add claim language to built claim ([5b7a9a1](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/5b7a9a15668d0f4d68d33f7cea0fc03364bc2173))
* add Welsh translations ([c4b7400](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/c4b7400156c2860fa880e3d98c789fad76d1cd61))
* loosen up money validation and update error messages to match ([76dd604](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/76dd604ba1a91107cd6e52f644d045cfdd9d3e51))
* make content across all address look up links  the same ([1ed2c1c](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/1ed2c1c62e0244d7d27853d9d80d716c9f1c2a6d))
* remove cancel link from forms while in edit mode ([195651b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/195651b77453785cb05d199b242d685030068c97))
* tool to generate before/after locale dictionary snapshots ([50d2698](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/50d2698d376db2879ea476c3d4cb00d7cc5b4f87))


### BREAKING CHANGES

* the url has changed from `rent-council-tax` to
`rent-council-tax-rates`, which will break an journeys that are
in-progress.

Resolves AFPC-282
* the url live-england-scotland-wales has been replaced
with country-you-live-in, and move to the start of the journey. Any
in-progress journeys will fail to traverse correctly, so must be
completed before deployment.

Resolves AFPC-280



## [0.3.2](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/0.3.1...0.3.2) (2020-05-12)


### Bug Fixes

* referrer policy header should be same-origin, not strict-origin ([13f20d4](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/13f20d488499d07df1934472011ef78977baa178))
* sending empty formErrors object to cookie page adds Error: to title ([0f8d79b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/0f8d79bbc509b067bea42605220cb97331806c26))



## [0.3.1](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/0.3.0...0.3.1) (2020-05-06)



# [0.3.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/0.2.0...0.3.0) (2020-05-05)


### Bug Fixes

* add custom validation content for various address lookups ([4a5b6b8](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/4a5b6b8e2c2cce8ea7814a61dc52f4178ae1c179))
* avoid calling t() in error page as could be undefined ([d703b46](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/d703b466bfda0900c48b215d32ab754af2042190))
* change disregards page title inline with AFPC-90, does not match H1 ([1af2e9c](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/1af2e9c3e035ab763ddf24e679b9b70a5dffcefc))
* change length validation on manual address fields from 100 to 500 ([718dacb](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/718dacb907fda1c6be8e8c2f8e2b250b224a01ba))
* claim backend field 'partnerReunionScheme' misnamed ([a593e8b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/a593e8bdf0f97e986037faf56014674c3ac4dbe2))
* correctly format nino (caps, no spaces) before sending to backend ([902223b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/902223b63ef55fe66b3ec648cf027512bbfdf3ba))
* CYA change links going to wrong places ([cb13913](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/cb13913919b96d3631f52a3a6c3fb9fe0b09120a))
* don't let user miss moneyBackdated if changing claim dates from CYA ([27a5dd8](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/27a5dd8c3a47a0d948d90c468430c8f0a880fa42))
* don't show disregards answers if disregards page was not visited ([a4dc70c](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/a4dc70c5db19152a407086a8d481ada8b2987c93))
* leave money values as strings before submitted to backend ([d739fb7](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/d739fb7d221a55993c75379225244dbb23c0e9c0))
* link to select rather than postcode form CYA ([a302a55](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/a302a5597bb147124d397fbfe4e53d28d66c9fb9))
* missing 'first language' field on check your answers page ([181da14](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/181da14f6d4d44c0cd98380681cc566a6a9f8230))
* missing question marks on sponsor address manual entry pages ([00be565](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/00be565be9fa6f734842116ed6c50a44e135ab5c))
* mount cookie handler on proxy; redirects use mountUrl ([088c2eb](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/088c2eb2f2ad85a16a667c7c6aac3733833ff6ee))
* remove unnecessary replace which throws when user-agent is missing ([0947c50](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/0947c507381b2d3fd418e4d985ba326685dab185))
* select - two colons for postcode, should be bold, link above button ([2b82a91](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/2b82a91c95cec06bc1fbbe6cbcccb94d04820d74))
* submitting object form data on checkbox pages causes errors ([b338381](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/b33838143889b5b797b0098acb8363b9b3fdaff5))
* town should not be a required field on manual address entry ([500d97d](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/500d97d91a06112d3d13704b859d49f29b0bbb2c))
* use custom content for letters 'select address' manual entry link ([d3ae5af](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/d3ae5afa02223754fd2d859ac405bdc46bd74096))
* use mountUrl in check-your-answers change links ([b1dba8d](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/b1dba8dbb8f325980481a6b2d747a65773488395))
* wrong survey link on what happens next page ([4903793](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/49037936547cea87b5322d548e46943e963f33a2))


### Features

* add 'money you have page' ([ce8de3e](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/ce8de3e9fd750044319aff294ed93464a22518b5))
* add accessibility statement page and link in footer ([6bc4c84](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/6bc4c8404939b3263672487a1aff9b85fa815379))
* add alpha phase banner with link to feedback survey ([18eeed8](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/18eeed86f1fd7df74cc1e53fb33e3b56157416fa))
* add claim-help CYA section ([f874603](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f8746030ed6ef59d246bb6248aa21272bd96848f))
* add cookie consent mechanism and cookie pages ([e1e1596](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/e1e1596eee3d17a030cb8027ec0cacbd120b6cad))
* add HRT sponsor address data to  claim service submission object ([fcf119a](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/fcf119a9297c512c75ac728a3ef991da64782562))
* add money journey data to submission and check your answers page ([a4f715b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/a4f715b98fe8b13c339ab51c45ae8314f720486f))
* add page for disregarded money, wire together complete journey ([7593f0c](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/7593f0c29fa73c237a396d066963d67972abe3e7))
* add personal information charter link to footer ([23dbd8d](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/23dbd8de5ab8be9ca2a33a73372e5531cc6444d1))
* add second property page, tie together with HRT ([5294a3b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/5294a3bd23357a2d97927e277f74dafeca582379))
* add what-happens-next content ([069fd33](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/069fd33fe0b48a3862f1faf290cb8bca618da1e8))
* set button debounce timeout to HTTP_TIMEOUT on check your answers ([c591215](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/c591215d3e2480a3cd2938a2122769d45653e1b9))


### Performance Improvements

* implement data key caching to improve request throughput ([4305e93](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/4305e9314ebc28a4fcae18607f1823f83b817423))
* update govuk-casa for perf improvments ([8b3295c](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/8b3295cc3f5ce55a3e74428e885702c6b8d755a1))



# [0.2.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/0.1.0...0.2.0) (2020-04-29)


### Bug Fixes

* show CYA post on POST error ([7def495](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/7def495c88f0fa68b1e80466c11574ce2737fb33))
* use correct manual address entry link text ([bca6ec8](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/bca6ec8948115e0ac8770c7feb4c812282acd718))


### Features

* add address look up for 'where you live' ([4df4785](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/4df4785ba812fda4b7dde60a9e59ee8c9809a2da))
* add address look up for correspondence address ([9ce86f7](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/9ce86f7a762f0858ca7351cc541211fd09a34e56))
* add asylum-seeker page ([dd90a8e](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/dd90a8e67a45dfba8cca04905833d4df878a855d))
* add benefits page ([4e7305c](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/4e7305ca9416e3cdc831caed68a8d5f5027c8a46))
* add claim-help page ([c60f05a](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/c60f05a509a30a9e4deb6104aabb6a3a230e08d9))
* add claimant details page ([5e19cc2](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/5e19cc2e4929847a01a61ed57de179505cfabe04))
* add contact formats page ([57cc945](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/57cc945f23fec27a5dc20738a0f8cbbd3ac59f67))
* add CYA rows for citizen and partner details ([dd481ea](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/dd481ea9358f0787fc6d3dd28744c23fb487f8aa))
* add home ownership page ([f75cfe0](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f75cfe05aa493e85827b6964ea5af69f9869e923))
* add hrt partner pages ([e01b936](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/e01b93633bf210d90c8560032fdfdabdf0f9b0d3))
* add nationality-details page ([3a8f964](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/3a8f9641aea314deed7a87ff8218654f63a0806a))
* add other income page ([e894ec4](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/e894ec46193a974acada7b616bd49a10e809ff43))
* add page for council tax and rent responsibility ([af62868](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/af628689386a55e0f33fcdff07d626956a8067cd))
* add page for sharing rent or mortgage payments ([db08a3d](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/db08a3de2e7cb00355d1ebc5fa01a343ffd60830))
* add partner details page ([a3eb663](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/a3eb6633be0248d45b998280409c020dd63ff6e0))
* add partner nationality page ([d2879f4](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/d2879f493f2270345f13f7598f2986b69005fe55))
* add private pensions page ([cb07967](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/cb079672c3031352bfd9524f1fdb8e4d495f9d8c))
* add returned-to-uk pages ([e7e11be](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/e7e11beb603a8cd1562617697e053115beeeb314))
* add service charges page ([f9a5ced](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f9a5ced262cf2e5b59fcb9eb0734c901b982c043))
* add sponsor address pages ([6d356e0](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/6d356e076b7a7ba0589ec3bb360de23e65a31c0c))
* add sponsorship-details page ([3d9e15a](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/3d9e15a7f582b57528d0a9d1a8e0b9fa43cad350))
* add support for mortgage interest page ([0f9047a](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/0f9047ac44948cefc08239ffc2df2ecc5457e1e6))
* add uk-sponsorship page ([b8ea443](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/b8ea4433be8f5b484f55c0aedbde157b46c09af8))
* add who lives with you (excluding partner) page ([c8f5755](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/c8f57550551720a9d8f9c3740edd60d6c8ca55b8))
* added care home page ([200bf8b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/200bf8b62f35ce69999b2dbcc8d56f4ab30414b6))
* added earnings page ([8430c7b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/8430c7b59b75bdbe4ed16790d1067df67bfd993b))
* update check your answers and claim build for income journey ([f86372b](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f86372b8bf22324c04459583d00ae223c10ed7c6))
* update check your answers to include 'where you live' questions ([0b0b113](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/0b0b113f7f851103781f199d818c51024c7d2078))



# [0.1.0](https://github.com/dwp/pension-credit-apply-citizen-ui/compare/bb04d2df3ced64f480d31c4aa1c6223051f80b98...0.1.0) (2020-04-25)


### Bug Fixes

* journey-rails config on check-your-answers ([c0b90de](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/c0b90de1a52f8565f58ac101d694afcf09da2cc8))
* only check against the advanced claim date for eligibility test ([1d32c2a](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/1d32c2a2df91af117eaa43a2e3ca23ee437d43b4))
* SPA eligibility routers should always return false if DOB invalid ([f5b5dfd](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f5b5dfd07de2a83f54ddb23f26563c191d33839c))


### Features

* add 'claimed state pension' page and state pension kick out page ([807bdcd](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/807bdcd13a0641748bc6407ab08a956928ce8910))
* add 'live in England, Scotland, Wales' and knock out page ([da087b5](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/da087b5b0d8bfeba94a1ee11531c0122b26e5074))
* add 'live with partner' pages and knockouts ([61c2dbf](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/61c2dbf89a20c01ca6db2e10388ec0652595061e))
* add 'your nationality' page ([d879a47](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/d879a4743743123c4833f101d54e7f7b6c201086))
* add build script for static Akamai error page ([faba5e1](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/faba5e1f17f6cd03d053058bb0fcf092bc144510))
* add children asking if claimant has children and knock out page ([85ff371](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/85ff3712789eee66dfbb3dfae471f2f8eb774288))
* add date of birth page and 'too young to claim' kick out page ([98a234a](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/98a234ae4f65afcb87b66e20ddf9edb0865a3a12))
* add date of claim page ([5ac994e](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/5ac994e2c4abb71732c0fb6802bb42116980ed10))
* add endpoint for prometheus metrics generation ([67a71aa](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/67a71aa227cad78c22e407b02e999e397d7e875d))
* add first draft of check you answers content ([ae44f12](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/ae44f1219f1bcd9062907392d01a3a7dd26c5410))
* add initial connectivity to claim service backend ([d045ff5](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/d045ff5487d0c5898098b45699c237fa113b4610))
* add session encryption ([f301f66](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f301f66a6051eb560659923e878c0d7fba6fe761))
* add utility to generate graph visualisation ([f2af470](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/f2af470ffbd8da0a89b3ce1ec75dced937060d67))
* set up initial project with start page ([bb04d2d](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/bb04d2df3ced64f480d31c4aa1c6223051f80b98))
* update content on start page inline with new design ([00ba7f9](https://github.com/dwp/pension-credit-apply-citizen-ui/commit/00ba7f9de84422e82fd3ff65aed0e4aba416639a))



