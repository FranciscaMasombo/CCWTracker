let Sub = require('../models/submissions')
let express = require('express')
let router = express.Router()

//CREATE
router.addSubmissions = (req, res) => {
  if (!req.session.user) {
    // return res.status(401).send();
    res.json({message: 'You need to login first'})
  }
  else {
    res.setHeader('Content-Type', 'application/json')
    const sub = new Sub()
    sub.name = req.body.name// the requested value
    sub.age = req.body.age// the requested value
    sub.gender = req.body.gender// the requested value
    sub.startWeight = req.body.startWeight// the requested value
    sub.goalWeight = req.body.goalWeight// the requested value
    sub.currentWeight = req.body.currentWeight// the requested value
    sub.height = req.body.height// the requested value
    sub.location = req.body.location// the requested value
    sub.date = req.body.date// the requested value
    sub.save(function (err) {
      if (err)
      // return res.status(401).send();
        res.json({message: 'Please make sure that you have entered all fields', errmsg: err})
      else {
        // success message
        res.json({message: 'You submission has been add to the list well done', name: sub.name})

      }
    })
  }
}
//READ

//get a list of all the submissions
router.displayAll = (req, res) => {
  if (!req.session.user) {
    // return res.status(401).send();
    res.json({message: 'You need to login first'})
  }
  else {
    res.setHeader('Content-Type', 'application/json')
    Sub.find(function (err, subs) {
      if (err)
        res.send(err)
      res.send(JSON.stringify(subs, null, 3))
    })
  }
}

router.displayAllByDate = (req, res) => {
  if (!req.session.user) {
    // return res.status(401).send();
    res.json({message: 'You need to login first'})
  }
  else
  {
    var mysort = {date: -1}
  res.setHeader('Content-Type', 'application/json')
  Sub.find(function (err, subs) {
    if (err) res.send(err)
    res.send(JSON.stringify(subs, null, 3))
  }).sort(mysort)
}
}


//get a single submission
router.findSubmissionById = (req, res) => {
  if (!req.session.user) {
    // return res.status(401).send();
    res.json({message: 'You need to login first'})
  }
  else {
    res.setHeader('Content-Type', 'application/json')
    Sub.find({'_id': req.params.id}, function (err, sub) {
      if (err != null){
        res.json({message: 'Sorry but we cant find this submission'})
      }
      else{
        res.send(JSON.stringify(sub, null, 5))
      }
    })
  }
}

// search for a submission by location
router.findByLocation = (req, res) => {
  if (!req.session.user) {
    // return res.status(401).send();
    res.json({message: 'You need to login first'})
  }
  else {
    res.setHeader('Content-Type', 'application/json')
    Sub.find({location: req.params.location}, 'location name  age', function (err, subs) {
      if (err != null) {
       return res.status(401).send();
      }
      else
        res.send(JSON.stringify(subs, null, 3))
    })
  }
}

//UPDATE
//update a submission
router.updateSubmission = (req, res) => {
  if (!req.session.user) {
    // return res.status(401).send();
    res.json({message: 'You need to login first'})
  }
  else {
    Sub.findByIdAndUpdate(req.params.id, req.body).then(function (sub) {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(sub, null, 5))
    })

  }
}

//DELETE
// delete on submistion
router.deleteSubmission = (req, res) => {
  if (!req.session.user) {
    // return res.status(401).send();
    res.json({message: 'You need to login first'})
  }
  else {
    Sub.findByIdAndRemove(req.params.id, function (err) {
      if (err)
        res.json({message: 'The submission has not been deleted ', errmsg: err})
      else
        res.json({message: 'Successfully Deleted!'})
    })
  }
}

module.exports = router