const mongoose = require('mongoose');
const assert = require('assert');
const sub = require('../models/User');
mongoose.Promise = global.Promise;
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../bin/www')
let expect = chai.expect
var mongodbUri ='mongodb://admin:welcome1@ds135653.mlab.com:35653/wwtdb';
mongoose.connect(mongodbUri);


chai.use(chaiHttp)
let _ = require('lodash')
//Connection to the db before test
before(function (done) {
  mongoose.connection.once('open', function () {
    console.log('Connection has been made to the Database');
    done();
  }).on('error', function (error) {
    console.log('Connection Error',error );
  })
});


describe('Submissions', function () {

// find Submissions from the database
  describe('Find Submissions made', function () {
    it('Find all the submissions made', function (done) {
      sub.find().then(function (res) {
        assert(res);
        done();
      })
    })
  })
  // listSubmissions works
  describe('GET /Submissions', () => {
    it('should return all Submissions made ', function (done) {
      chai.request(server)
        .get('/listSubmissions')
        .end((err, res) => {
          expect(res).to.have.status(200)
          done()
        })
    })
  })


})
