/*
 * GET jobs listing.
 */

var mongoose = require ("mongoose");

var jobSchema = new mongoose.Schema({
  position: { type: String, trim: true },
  employer: { type: String, trim: true },
  email: { type: String, trim: true }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PowerUsers' collection in the MongoDB database
var Job = mongoose.model('Jobs', jobSchema);

// Clear out old data
Job.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});

// Creating one job
var job1 = new Job ({
  position: 'Front end web developer',
  employer: 'Cool boutique dev shop',
  email: 'teamlead@coolshop.com'
});

job1.save(function (err) {if (err) console.log ('Error on save!');});


exports.list = function(req, res){
  Job.find({}).exec(function(err, result) {
    if (!err) {
      res.end(JSON.stringify(result));
    }
    else {
      res.end('Error in first query. ' + err);
    }
  }
);};
