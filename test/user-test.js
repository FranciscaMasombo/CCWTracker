const mongoose = require('mongoose')
const assert = require('assert')
const user = require('../models/User')
mongoose.Promise = global.Promise
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../bin/www')
let expect = chai.expect

// var mongodbUri = 'mongodb://admin:welcome1@ds135653.mlab.com:35653/wwtdb'

var mongodbUri = 'mongodb://test:test123@ds253203.mlab.com:53203/ccwtracker-test'

mongoose.connect(mongodbUri)

chai.use(chaiHttp)
let _ = require('lodash')

//Connection to the db before test
before(function (done) {
  mongoose.connection.once('open', function () {
    console.log('Connection has been made to the Database')
    done()
  }).on('error', function (error) {
    console.log('Connection Error', error)
  })
})

describe('Users', function () {
  beforeEach(function (done) {
    user.remove({}, function (err) {
      if (err)
        done(err)
      else {
        var userr = new user({
          _id : '5be1a804fb6fc061430f52d6',
          username : 'JamesFranco',
          password : 'Welcome1',
          firstname : 'james',
          lastname : 'Franco'
        }).save(function (err) {
          if (err)
            console.log(err)
          else {
            done()
          }
        })
      }
    })
  })
  it('Is there anything in the database', function (done) {
    user.find().then(function (res) {
      assert(res)
      done()
    })
  })

  describe('all the users get/list-users', function () {
    it('should return all users', function (done) {
      chai.request(server)
        .get('/list-users')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('array')
          expect(res.body.length).to.equal(1)
          var result = _.map(res.body, function (user) {
            return {
              _id: user._id,
              username: user.username,
              password: user.password,
              firstname: user.password,
              lastname: user.lastname
            }
          })
          expect(result).to.include({
            _id: '5be1a804fb6fc061430f52d6',
            username: 'JamesFranco',
            password: 'Welcome1',
            firstname: 'james',
            lastname: 'Franco'
          })
        })
      done()
    })
  })

  describe('DELETE /deleteUser/:id', function () {
    it('should delete ', function (done) {
      chai.request(server)
        .delete('/deleteUser/5be1a804fb6fc061430f52d6')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

})