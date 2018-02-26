module.exports = {
  Authenticator,
	Authorizer,
	Session
}

const crypto = require('crypto')
const sessions = {}

function Authenticator () {
  return {
    authenticate: function (cred, cb) {
      console.info('authenticate : cred=' + cred)
      crypto.randomBytes(32, function (error, buffer) {
        if (error) {
          console.error('authenticate : error =>', error)
          cb(error)
        } else {
          const token = buffer.toString('hex')
          console.info('authenticate : token=' + token)
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
    authorize: function (rq, cb) {
      console.info('authorize : rq=' + rq)
      cb(null, {
        scope: read
      })
    }
  }
}

function Session () {
  return {
    set: function (key, session, cb) {
      console.info('set session : key=' + key + ' | session=' + session)
      sessions[key] = session
      cb(null, null)
    },
    get: function (key, cb) {
      console.info('get session : key=' + key)
      cb(null, sessions[key])
    }
  }
}
