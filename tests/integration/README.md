# Narrow Integration Testing

Here we want to test that our own service behaves as expected when interacting with external services and resources.

Generally, each test follows this pattern:

- Start external service dependencies
- Start our own service
- Make requests to our own service that we know will exercise those dependencies
- Assert that the results - e.g. either responses from our service, or states of the external services - are as expected

## Dockerise everything

All external service dependencies should be run within a Docker container. This makes it simple to start, stop, isolate the service.

Where you can't dockerise a service - for example, if you use the Twitter API - you will need to create your own test double for that service ... and Dockerise it.

## Integration vs unit testing

- Use unit testing, along with in-code (i.e. functions / classes) test doubles (stub / mock), to test all possible interacions with an external service (simulation)

- Use "service integration tests", along with real services (or custom mock services where we can't possibly run the real thing, or we want more control over it, perhaps to inspect it after an interaction) running in Docker containers, to test the basic connectivity and interaction paths between our app and those services, and make sure our app behaves as expected. Run our own app in Docker too and observe its externally visible outputs and behaviours to determine if it's working correctly (emulation)
