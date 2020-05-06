## [0.3.1](https://github.com/dwp/pension-credit-citizen-apply/compare/0.3.0...0.3.1) (2020-05-06)



# [0.3.0](https://github.com/dwp/pension-credit-citizen-apply/compare/0.2.0...0.3.0) (2020-05-05)


### Bug Fixes

* add custom validation content for various address lookups ([4a5b6b8](https://github.com/dwp/pension-credit-citizen-apply/commit/4a5b6b8e2c2cce8ea7814a61dc52f4178ae1c179))
* avoid calling t() in error page as could be undefined ([d703b46](https://github.com/dwp/pension-credit-citizen-apply/commit/d703b466bfda0900c48b215d32ab754af2042190))
* change disregards page title inline with AFPC-90, does not match H1 ([1af2e9c](https://github.com/dwp/pension-credit-citizen-apply/commit/1af2e9c3e035ab763ddf24e679b9b70a5dffcefc))
* change length validation on manual address fields from 100 to 500 ([718dacb](https://github.com/dwp/pension-credit-citizen-apply/commit/718dacb907fda1c6be8e8c2f8e2b250b224a01ba))
* claim backend field 'partnerReunionScheme' misnamed ([a593e8b](https://github.com/dwp/pension-credit-citizen-apply/commit/a593e8bdf0f97e986037faf56014674c3ac4dbe2))
* correctly format nino (caps, no spaces) before sending to backend ([902223b](https://github.com/dwp/pension-credit-citizen-apply/commit/902223b63ef55fe66b3ec648cf027512bbfdf3ba))
* CYA change links going to wrong places ([cb13913](https://github.com/dwp/pension-credit-citizen-apply/commit/cb13913919b96d3631f52a3a6c3fb9fe0b09120a))
* don't let user miss moneyBackdated if changing claim dates from CYA ([27a5dd8](https://github.com/dwp/pension-credit-citizen-apply/commit/27a5dd8c3a47a0d948d90c468430c8f0a880fa42))
* don't show disregards answers if disregards page was not visited ([a4dc70c](https://github.com/dwp/pension-credit-citizen-apply/commit/a4dc70c5db19152a407086a8d481ada8b2987c93))
* leave money values as strings before submitted to backend ([d739fb7](https://github.com/dwp/pension-credit-citizen-apply/commit/d739fb7d221a55993c75379225244dbb23c0e9c0))
* link to select rather than postcode form CYA ([a302a55](https://github.com/dwp/pension-credit-citizen-apply/commit/a302a5597bb147124d397fbfe4e53d28d66c9fb9))
* missing 'first language' field on check your answers page ([181da14](https://github.com/dwp/pension-credit-citizen-apply/commit/181da14f6d4d44c0cd98380681cc566a6a9f8230))
* missing question marks on sponsor address manual entry pages ([00be565](https://github.com/dwp/pension-credit-citizen-apply/commit/00be565be9fa6f734842116ed6c50a44e135ab5c))
* mount cookie handler on proxy; redirects use mountUrl ([088c2eb](https://github.com/dwp/pension-credit-citizen-apply/commit/088c2eb2f2ad85a16a667c7c6aac3733833ff6ee))
* remove unnecessary replace which throws when user-agent is missing ([0947c50](https://github.com/dwp/pension-credit-citizen-apply/commit/0947c507381b2d3fd418e4d985ba326685dab185))
* select - two colons for postcode, should be bold, link above button ([2b82a91](https://github.com/dwp/pension-credit-citizen-apply/commit/2b82a91c95cec06bc1fbbe6cbcccb94d04820d74))
* submitting object form data on checkbox pages causes errors ([b338381](https://github.com/dwp/pension-credit-citizen-apply/commit/b33838143889b5b797b0098acb8363b9b3fdaff5))
* town should not be a required field on manual address entry ([500d97d](https://github.com/dwp/pension-credit-citizen-apply/commit/500d97d91a06112d3d13704b859d49f29b0bbb2c))
* use custom content for letters 'select address' manual entry link ([d3ae5af](https://github.com/dwp/pension-credit-citizen-apply/commit/d3ae5afa02223754fd2d859ac405bdc46bd74096))
* use mountUrl in check-your-answers change links ([b1dba8d](https://github.com/dwp/pension-credit-citizen-apply/commit/b1dba8dbb8f325980481a6b2d747a65773488395))
* wrong survey link on what happens next page ([4903793](https://github.com/dwp/pension-credit-citizen-apply/commit/49037936547cea87b5322d548e46943e963f33a2))


### Features

* add 'money you have page' ([ce8de3e](https://github.com/dwp/pension-credit-citizen-apply/commit/ce8de3e9fd750044319aff294ed93464a22518b5))
* add accessibility statement page and link in footer ([6bc4c84](https://github.com/dwp/pension-credit-citizen-apply/commit/6bc4c8404939b3263672487a1aff9b85fa815379))
* add alpha phase banner with link to feedback survey ([18eeed8](https://github.com/dwp/pension-credit-citizen-apply/commit/18eeed86f1fd7df74cc1e53fb33e3b56157416fa))
* add claim-help CYA section ([f874603](https://github.com/dwp/pension-credit-citizen-apply/commit/f8746030ed6ef59d246bb6248aa21272bd96848f))
* add cookie consent mechanism and cookie pages ([e1e1596](https://github.com/dwp/pension-credit-citizen-apply/commit/e1e1596eee3d17a030cb8027ec0cacbd120b6cad))
* add HRT sponsor address data to  claim service submission object ([fcf119a](https://github.com/dwp/pension-credit-citizen-apply/commit/fcf119a9297c512c75ac728a3ef991da64782562))
* add money journey data to submission and check your answers page ([a4f715b](https://github.com/dwp/pension-credit-citizen-apply/commit/a4f715b98fe8b13c339ab51c45ae8314f720486f))
* add page for disregarded money, wire together complete journey ([7593f0c](https://github.com/dwp/pension-credit-citizen-apply/commit/7593f0c29fa73c237a396d066963d67972abe3e7))
* add personal information charter link to footer ([23dbd8d](https://github.com/dwp/pension-credit-citizen-apply/commit/23dbd8de5ab8be9ca2a33a73372e5531cc6444d1))
* add second property page, tie together with HRT ([5294a3b](https://github.com/dwp/pension-credit-citizen-apply/commit/5294a3bd23357a2d97927e277f74dafeca582379))
* add what-happens-next content ([069fd33](https://github.com/dwp/pension-credit-citizen-apply/commit/069fd33fe0b48a3862f1faf290cb8bca618da1e8))
* set button debounce timeout to HTTP_TIMEOUT on check your answers ([c591215](https://github.com/dwp/pension-credit-citizen-apply/commit/c591215d3e2480a3cd2938a2122769d45653e1b9))


### Performance Improvements

* implement data key caching to improve request throughput ([4305e93](https://github.com/dwp/pension-credit-citizen-apply/commit/4305e9314ebc28a4fcae18607f1823f83b817423))
* update govuk-casa for perf improvments ([8b3295c](https://github.com/dwp/pension-credit-citizen-apply/commit/8b3295cc3f5ce55a3e74428e885702c6b8d755a1))



# [0.2.0](https://github.com/dwp/pension-credit-citizen-apply/compare/0.1.0...0.2.0) (2020-04-29)


### Bug Fixes

* show CYA post on POST error ([7def495](https://github.com/dwp/pension-credit-citizen-apply/commit/7def495c88f0fa68b1e80466c11574ce2737fb33))
* use correct manual address entry link text ([bca6ec8](https://github.com/dwp/pension-credit-citizen-apply/commit/bca6ec8948115e0ac8770c7feb4c812282acd718))


### Features

* add address look up for 'where you live' ([4df4785](https://github.com/dwp/pension-credit-citizen-apply/commit/4df4785ba812fda4b7dde60a9e59ee8c9809a2da))
* add address look up for correspondence address ([9ce86f7](https://github.com/dwp/pension-credit-citizen-apply/commit/9ce86f7a762f0858ca7351cc541211fd09a34e56))
* add asylum-seeker page ([dd90a8e](https://github.com/dwp/pension-credit-citizen-apply/commit/dd90a8e67a45dfba8cca04905833d4df878a855d))
* add benefits page ([4e7305c](https://github.com/dwp/pension-credit-citizen-apply/commit/4e7305ca9416e3cdc831caed68a8d5f5027c8a46))
* add claim-help page ([c60f05a](https://github.com/dwp/pension-credit-citizen-apply/commit/c60f05a509a30a9e4deb6104aabb6a3a230e08d9))
* add claimant details page ([5e19cc2](https://github.com/dwp/pension-credit-citizen-apply/commit/5e19cc2e4929847a01a61ed57de179505cfabe04))
* add contact formats page ([57cc945](https://github.com/dwp/pension-credit-citizen-apply/commit/57cc945f23fec27a5dc20738a0f8cbbd3ac59f67))
* add CYA rows for citizen and partner details ([dd481ea](https://github.com/dwp/pension-credit-citizen-apply/commit/dd481ea9358f0787fc6d3dd28744c23fb487f8aa))
* add home ownership page ([f75cfe0](https://github.com/dwp/pension-credit-citizen-apply/commit/f75cfe05aa493e85827b6964ea5af69f9869e923))
* add hrt partner pages ([e01b936](https://github.com/dwp/pension-credit-citizen-apply/commit/e01b93633bf210d90c8560032fdfdabdf0f9b0d3))
* add nationality-details page ([3a8f964](https://github.com/dwp/pension-credit-citizen-apply/commit/3a8f9641aea314deed7a87ff8218654f63a0806a))
* add other income page ([e894ec4](https://github.com/dwp/pension-credit-citizen-apply/commit/e894ec46193a974acada7b616bd49a10e809ff43))
* add page for council tax and rent responsibility ([af62868](https://github.com/dwp/pension-credit-citizen-apply/commit/af628689386a55e0f33fcdff07d626956a8067cd))
* add page for sharing rent or mortgage payments ([db08a3d](https://github.com/dwp/pension-credit-citizen-apply/commit/db08a3de2e7cb00355d1ebc5fa01a343ffd60830))
* add partner details page ([a3eb663](https://github.com/dwp/pension-credit-citizen-apply/commit/a3eb6633be0248d45b998280409c020dd63ff6e0))
* add partner nationality page ([d2879f4](https://github.com/dwp/pension-credit-citizen-apply/commit/d2879f493f2270345f13f7598f2986b69005fe55))
* add private pensions page ([cb07967](https://github.com/dwp/pension-credit-citizen-apply/commit/cb079672c3031352bfd9524f1fdb8e4d495f9d8c))
* add returned-to-uk pages ([e7e11be](https://github.com/dwp/pension-credit-citizen-apply/commit/e7e11beb603a8cd1562617697e053115beeeb314))
* add service charges page ([f9a5ced](https://github.com/dwp/pension-credit-citizen-apply/commit/f9a5ced262cf2e5b59fcb9eb0734c901b982c043))
* add sponsor address pages ([6d356e0](https://github.com/dwp/pension-credit-citizen-apply/commit/6d356e076b7a7ba0589ec3bb360de23e65a31c0c))
* add sponsorship-details page ([3d9e15a](https://github.com/dwp/pension-credit-citizen-apply/commit/3d9e15a7f582b57528d0a9d1a8e0b9fa43cad350))
* add support for mortgage interest page ([0f9047a](https://github.com/dwp/pension-credit-citizen-apply/commit/0f9047ac44948cefc08239ffc2df2ecc5457e1e6))
* add uk-sponsorship page ([b8ea443](https://github.com/dwp/pension-credit-citizen-apply/commit/b8ea4433be8f5b484f55c0aedbde157b46c09af8))
* add who lives with you (excluding partner) page ([c8f5755](https://github.com/dwp/pension-credit-citizen-apply/commit/c8f57550551720a9d8f9c3740edd60d6c8ca55b8))
* added care home page ([200bf8b](https://github.com/dwp/pension-credit-citizen-apply/commit/200bf8b62f35ce69999b2dbcc8d56f4ab30414b6))
* added earnings page ([8430c7b](https://github.com/dwp/pension-credit-citizen-apply/commit/8430c7b59b75bdbe4ed16790d1067df67bfd993b))
* update check your answers and claim build for income journey ([f86372b](https://github.com/dwp/pension-credit-citizen-apply/commit/f86372b8bf22324c04459583d00ae223c10ed7c6))
* update check your answers to include 'where you live' questions ([0b0b113](https://github.com/dwp/pension-credit-citizen-apply/commit/0b0b113f7f851103781f199d818c51024c7d2078))



# [0.1.0](https://github.com/dwp/pension-credit-citizen-apply/compare/bb04d2df3ced64f480d31c4aa1c6223051f80b98...0.1.0) (2020-04-25)


### Bug Fixes

* journey-rails config on check-your-answers ([c0b90de](https://github.com/dwp/pension-credit-citizen-apply/commit/c0b90de1a52f8565f58ac101d694afcf09da2cc8))
* only check against the advanced claim date for eligibility test ([1d32c2a](https://github.com/dwp/pension-credit-citizen-apply/commit/1d32c2a2df91af117eaa43a2e3ca23ee437d43b4))
* SPA eligibility routers should always return false if DOB invalid ([f5b5dfd](https://github.com/dwp/pension-credit-citizen-apply/commit/f5b5dfd07de2a83f54ddb23f26563c191d33839c))


### Features

* add 'claimed state pension' page and state pension kick out page ([807bdcd](https://github.com/dwp/pension-credit-citizen-apply/commit/807bdcd13a0641748bc6407ab08a956928ce8910))
* add 'live in England, Scotland, Wales' and knock out page ([da087b5](https://github.com/dwp/pension-credit-citizen-apply/commit/da087b5b0d8bfeba94a1ee11531c0122b26e5074))
* add 'live with partner' pages and knockouts ([61c2dbf](https://github.com/dwp/pension-credit-citizen-apply/commit/61c2dbf89a20c01ca6db2e10388ec0652595061e))
* add 'your nationality' page ([d879a47](https://github.com/dwp/pension-credit-citizen-apply/commit/d879a4743743123c4833f101d54e7f7b6c201086))
* add build script for static Akamai error page ([faba5e1](https://github.com/dwp/pension-credit-citizen-apply/commit/faba5e1f17f6cd03d053058bb0fcf092bc144510))
* add children asking if claimant has children and knock out page ([85ff371](https://github.com/dwp/pension-credit-citizen-apply/commit/85ff3712789eee66dfbb3dfae471f2f8eb774288))
* add date of birth page and 'too young to claim' kick out page ([98a234a](https://github.com/dwp/pension-credit-citizen-apply/commit/98a234ae4f65afcb87b66e20ddf9edb0865a3a12))
* add date of claim page ([5ac994e](https://github.com/dwp/pension-credit-citizen-apply/commit/5ac994e2c4abb71732c0fb6802bb42116980ed10))
* add endpoint for prometheus metrics generation ([67a71aa](https://github.com/dwp/pension-credit-citizen-apply/commit/67a71aa227cad78c22e407b02e999e397d7e875d))
* add first draft of check you answers content ([ae44f12](https://github.com/dwp/pension-credit-citizen-apply/commit/ae44f1219f1bcd9062907392d01a3a7dd26c5410))
* add initial connectivity to claim service backend ([d045ff5](https://github.com/dwp/pension-credit-citizen-apply/commit/d045ff5487d0c5898098b45699c237fa113b4610))
* add session encryption ([f301f66](https://github.com/dwp/pension-credit-citizen-apply/commit/f301f66a6051eb560659923e878c0d7fba6fe761))
* add utility to generate graph visualisation ([f2af470](https://github.com/dwp/pension-credit-citizen-apply/commit/f2af470ffbd8da0a89b3ce1ec75dced937060d67))
* set up initial project with start page ([bb04d2d](https://github.com/dwp/pension-credit-citizen-apply/commit/bb04d2df3ced64f480d31c4aa1c6223051f80b98))
* update content on start page inline with new design ([00ba7f9](https://github.com/dwp/pension-credit-citizen-apply/commit/00ba7f9de84422e82fd3ff65aed0e4aba416639a))



