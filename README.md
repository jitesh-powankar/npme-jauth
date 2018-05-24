# npme-jauth

Very simple example of an npmE auth plugin. The purpose is to provide a shell which can be filled out with _real_ auth logic in your own custom implementation.

*WARNING* this should not be used in a production environment as it enforces nothing

## Implementation

There are three components which may be exported by an npmE auth plugin. These are the `Authenticate`, `Authorize`, and `Session` functions exported in `index.js`. The functions they contain must match those in `index.js`, otherwise they will not work.

### Authenticate 

`authenticate(request, callback)`
- `request` : the user's authentication request (credentials supplied)
- `callback` : Node style callback indicating the outcome of the authentication attempt, and supplying a token+profile

### Authorize

`authorize(request, callback)`
- `request` : the user's authorization request (resources requested)
- `callback` : Node style callback indicating the outcome of the authorization attempt

### Session

`set(key, session, callback)`
- `key` : the session key
- `session` : the session content (should replace any prior session content under the same key)
- `callback` : Node-stype callback which indicates whether the sessions was successfully updated

`get(key, callback)`
- `key` : the session key
- `callback` : Node style callback which supplies the session if it was found associated with the supplied key

## Installation

On a standard npmE instance, this plugin should be placed in `/usr/local/lib/npme/data`.

Make sure to run `npm install` in your plugin's directory if you have any dependencies; it will not be run for you.

## Configuration

For custom auth, each component (authentication, authorization, and session) can be delegated to a different plugin. For this reason there is a text field for the plugin location of each component.

The configuration path you set for each auth component is mounted into the auth container at a different path than the path in which it is installed on the npmE host. The pattern for a plugin with the path `/usr/local/lib/npme/data/jauth` on the npmE host is `/etc/npme/data/jauth` in the configuration settings.
