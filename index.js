module.exports = {
  Authenticator,
  Authorizer,
  Session
}

const crypto = require('crypto')

function Authenticator () {
  return {
    authenticate: function (req, cb) {
      console.info('authenticate : req =', req)
      crypto.randomBytes(32, function (error, buffer) {
        if (error) {
          console.error('authenticate : error =>', error)
          cb(error)
        } else {
          const token = buffer.toString('hex')
          console.info('authenticate : new token =', token)
          cb(null, {
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
    authorize: function (req, cb) {
      console.info('authorize : req =', req)
      cb(null, true)
    }
  }
}

function Session () {
  const sessions = {}

  return {
    set: function (key, session, cb) {
      console.info('set session : key=' + key + ' | session =', session)
      sessions[key] = session
      cb(null, null)
    },
    get: function (key, cb) {
      var session = sessions[key]
      console.info('get session : key=' + key + ' | session =', session)
      cb(null, session)
    }
  }
}
