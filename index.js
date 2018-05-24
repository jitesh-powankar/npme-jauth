module.exports = {
  Authenticator,
  Authorizer,
  Session
}

const crypto = require('crypto')

function Authenticator () {
  return {
    authenticate: function (request, callback) {
      console.info('authenticate : request =', request)
      crypto.randomBytes(32, function (error, buffer) {
        if (error) {
          console.error('authenticate : error =>', error)
          callback(error)
        } else {
          const token = buffer.toString('hex')
          console.info('authenticate : new token =', token)
          callback(null, {
            token,
            user: {
              email: 'buzuli@ed-craft.com',
              name: 'buzuli'
            }
          })
        }
      })
    }
  }
}

function Authorizer () {
  return {
    authorize: function (request, callback) {
      console.info('authorize : request =', request)
      callback(null, true)
    }
  }
}

function Session () {
  const sessions = {}

  return {
    set: function (key, session, callback) {
      console.info('set session : key=' + key + ' | session =', session)
      sessions[key] = session
      callback(null, null)
    },
    get: function (key, callback) {
      var session = sessions[key]
      console.info('get session : key=' + key + ' | session =', session)
      callback(null, session)
    }
  }
}
