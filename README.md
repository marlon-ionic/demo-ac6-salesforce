# Auth Connect 6/Salesforce Issue Demo (iOS)

This project demonstrates an error thrown in iOS when using Salesforce as the Identity Provider. The error appears in the browser console as `Error: unknown error: The data couldn’t be read because it is missing.`

The underlying exception appears to be thrown from `AuthConnect.swift` when the `AuthResult` is being parsed. Salesforce does not return the `expires_in` field in the response to the `token` endpoint. Per the OAuth2 spec, this field is recommended, but not required. This only appears to be an issue on iOS, as the Android version of the app does not throw the error.

```sh
"[AUTH CONNECT ERROR] The data couldn’t be read because it is missing." Swift.DecodingError.keyNotFound(CodingKeys(stringValue: "expiresIn", intValue: nil), Swift.DecodingError.Context(codingPath: [], debugDescription: "No value associated with key CodingKeys(stringValue: \"expiresIn\", intValue: nil) (\"expiresIn\").", underlyingError: nil))
```

## Installation

To install the project dependencies, run:

```sh
pnpm install
```
