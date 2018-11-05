const mongoose = require('mongoose')
const assert = require('assert')
const sub = require('../models/User')
mongoose.Promise = global.Promise
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../bin/www')
let expect = chai.expect

var mongodbUri = 'mongodb://admin:welcome1@ds135653.mlab.com:35653/wwtdb'

// var mongodbUri = 'mongodb://test:test123@ds253203.mlab.com:53203/ccwtracker-test';

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

describe('Submissions', function () {

  beforeEach(function () {
    var subs = new sub({
      name: 'Fran',
      age: 21,
      gender: 'male',
      startWeight: 245,
      goalWeight: 78,
      currentWeight: 90,
      height: 78,
      location: 'dublin',
      date: '2018-09-12'
    })
    subs.save().then(function () {
      assert(subs.isNew === false)
      done()
    })
  })

it('Is there anything in the database', function (done) {
  sub.find().then(function (res) {
    assert(res)
    done()
  })
})
// find Submissions from the database
  describe('Get/listSubmissions', function () {
    it('Find all the submissions made end point', function (done) {
      chai.request(server)
        .get('/listSubmissions')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          var result = _.map(res.body, function (submission) {
          return{
            name:submission.name,
            age:submission.age,
            gender:submission.gender,
            startWeight:submission.startWeight,
            goalWeight:submission.goalWeight,
            currentWeight:submission.currentWeight,
            height:submission.height,
            location:submission.location,
            date:submission.date
          };
        })
      expect(result).to.deep.include({ name: 'Fran', age: 21, gender: 'male',
        startWeight: 245, goalWeight: 78, currentWeight: 90, height: 78,
        location: 'dublin', date: '2018-09-12' })
        });
      done();
    })
  })

})

