const mongoose = require('mongoose')
const assert = require('assert')
const sub = require('../models/submissions')
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
describe('Submissions', function () {
  beforeEach(function () {
    sub.remove({}, function (err) {
      if (err)
        done(err)
      else {
        var subs = new sub({
          _id: '5be0ac62fb6fc061430eb239',
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

        })
      }
    })
  })
  it('Is there anything in the database', function (done) {
    sub.find().then(function (res) {
      assert(res)
      done()
    })
  })

  describe('Get/listOneSubmission/:id', function () {
    it('should', function (done) {
      chai.request(server)
        .get('/listOneSubmission/5be0ac62fb6fc061430eb239')
        .end(function (err, res) {
          //  console.log(res.body)
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('array')
         // done()
          // expect(res.body.length).to.equal(1)
           var result = _.map(res.body, function (submission) {
             return {
               _id: submission._id, name: submission.name, age: submission.age, gender: submission.gender,
               startWeight: submission.startWeight, goalWeight: submission.goalWeight,
               currentWeight: submission.currentWeight, height: submission.height,
               location: submission.location, date: submission.date
             }
           })
           expect(result).to.include(
             { _id: '5be0ac62fb6fc061430eb239',
               name: 'Fran',
               age: 21,
               gender: 'male',
               startWeight: 245,
               goalWeight: 78,
               currentWeight: 90,
               height: 78,
               location: 'dublin',
               date: '2018-09-12T00:00:00.000Z' }

           )
           done()
        })
    })
    it('should return an error message and a 404 error', function (done) {
      chai.request(server)
        .get('/listSubmissions/00000000080000')
        .end(function (err, res) {
          expect(res).to.have.status(404)
          done()
        })
    })
  })

  describe('POST /add-submission', function () {
    it('should add to database', function (done) {
      var sub = {
        'name': 'ray',
        'age': 21,
        'gender': 'male',
        'startWeight': 245,
        'goalWeight': 78,
        'currentWeight': 90,
        'height': 78,
        'location': 'dublin',
        'date': '2018-09-12'
      }
      chai.request(server)
        .post('/add-submission')
        .send(sub)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message').equal('You submission has been add to the list well done')
          done()
        })
    })
    it('should return an error message and a 400 error', function (done) {
      var sub = {
        'name': 'kim',
        'age': 21,
        'gender': 'male',
        'goalWeight': 78,
        'currentWeight': 90,
        'height': 78,
        'location': 'dublin',
        'date': '2018-09-12'
      }
      chai.request(server)
        .post('/add-submission')
        .send(sub)
        .end(function (err, res) {
          expect(res).to.have.status(404)
          expect(res.body).to.have.property('message').equal('Please make sure that you have entered all fields')
          done()
        })
    })

  })

  describe('Get/listSubmissions', function () {
    it('Find all the submissions made end point', function (done) {
      chai.request(server)
        .get('/listSubmissions/5be0ac62fb6fc061430eb239')
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('array')
             expect(res.body.length).to.equal(1)
          console.log(res.body)
          var result = _.map(res.body, function (submission) {

            return {
              _id: submission._id,
              name: submission.name,
              age: submission.age,
              gender: submission.gender,
              startWeight: submission.startWeight,
              goalWeight: submission.goalWeight,
              currentWeight: submission.currentWeight,
              height: submission.height,
              location: submission.location,
              date: submission.date
            }
          })
          expect(result).to.include({
              _id: '5be0ac62fb6fc061430eb239',
              name: 'Fran',
              age: 21,
              gender: 'male',
              startWeight: 245,
              goalWeight: 78,
              currentWeight: 90,
              height: 78,
              location: 'dublin',
              date: '2018-09-12T00:00:00.000Z'
            }
          )
        })
      done()
    })
  })

})
