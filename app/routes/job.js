/*
 * GET jobs listing.
 */

var mongoose = require ("mongoose");

var jobSchema = new mongoose.Schema({
	  position: { type: String, trim: true },
		description: { type: String, trim: false },
		employer: { type: String, trim: true },
		email: { type: String, trim: true },
		posting_date: { type: Date }
});

var Job = mongoose.model('Jobs', jobSchema);

/*
 *  Testing db operations
 */

// Remove all jobs from db 
Job.remove({}, function(err) {
	if (err) {
		console.log ('Problem removing data');
	}
});

// Create a couple jobs
var job1 = new Job ({
	  position: 'Front end web developer',
		employer: 'Awesome startup',
		email: 'teamlead@freebeer.com'
});

var job2 = new Job ({
	  position: 'JS guru',
		employer: 'Boutique dev shop',
		email: 'teamlead@hipsters.com'
});

var job3 = new Job ({
  	position: 'Web Designer Extraordinaire',
		employer: 'Cutting edge design firm',
		email: 'teamlead@madmen.com'
});

job1.save(function (err) {if (err) console.log ('Error saving job1');});
job2.save(function (err) {if (err) console.log ('Error saving job2');});
job3.save(function (err) {if (err) console.log ('Error saving job3');});

exports.list = function(req, res){
	Job.find(function(err, result) {
		res.render('jobs/job_list',{locals: {title:'result',jobs:result}});
	});
};

exports.detail = function(req, res){
	Job.find(function(err, result) {
		res.render('jobs/job_detail',{locals: {title:'result',jobs:result}});
	});
};

exports.new_job = function(req, res) {
	res.render('jobs/new_job_form', { locals: { title: 'New Job' } });
};

exports.create = function(req, res, next){
	var newJob = req.body;
	
	var job = new Job({
		position: newJob.position,
		description: newJob.description,
		employer: newJob.employer,
		email: newJob.email
	});
	
	job.save(function (err, job){
		if (err) {
			console.log('error');
		}
		else console.log('saved!');
	});
	res.send('Job creation success');
};