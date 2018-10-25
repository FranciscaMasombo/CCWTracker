let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let expect = chai.expect;
let mongoose = require('mongoose');
var mongodbUri ='mongodb://admin:welcome1@ds135653.mlab.com:35653/wwtdb';
mongoose.connect(mongodbUri);
let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

let datastore = mongodbUri;
chai.use(chaiHttp);

chai.use(require('chai-things'));
let _ = require('lodash' );
describe('Subs', function (){
    describe('Subs',  () => {
        beforeEach(function(){
            while(datastore.length > 0) {
                datastore.pop();
            }
            datastore.push(
                {date: 12/17/12, name: "john ", age: 20, gender: "male", startWeight: 245, currentWeight: 89, location: "cork"}
            );
            datastore.push(
                { name: "john ", age: 20, gender: "male", startWeight: 245, currentWeight: 89, location: "cork",date: 12/17/12}
            );
        });
    });

describe('Submission', function () {
    describe('GET /subs', () =>{
    it('should return all the submission', function (done) {
chai.request(server)
    .get('/subs')
    .end((err,res)=> {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(2);
        let result = _.map(res.body, (subs) => {
            return { name: subs.name, age: subs.age, gender: subs.gender, startWeight: subs.startWeight, currentWeight: subs.currentWeight, location: subs.location,date: subs.date}
        });
        expect(result).to.include( {name: "john ", age: 20, gender: "male", startWeight: 245, currentWeight: 89, location: "cork",date: 12/17/12} );
        expect(result).to.include( { name: "john ", age: 20, gender: "male", startWeight: 245, currentWeight: 89, location: "cork",date: 12/17/12  } );
        done();
    });
    });
    });
});
});






// create a user a new user
var testUser = new User({
    username: "jmar777",
    password: "Password"
});

// save user to database
testUser.save(function(err) {
    if (err) throw err;

// fetch user and test password verification
    User.findOne({ username: 'jmar777' }, function(err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword('Password123', function(err, isMatch) {
            if (err) throw err;
            console.log('Password123:', isMatch); // -> Password123: true
        });

        // test a failing password
        user.comparePassword('123Password', function(err, isMatch) {
            if (err) throw err;
            console.log('123Password:', isMatch); // -> 123Password: false
        });
    });
