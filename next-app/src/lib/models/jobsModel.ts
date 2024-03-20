const mongoose = require('mongoose');


const jobsSchema = new mongoose.Schema({
  url: { 
    type: String, 
    required: true 
  },
  isComplete: { 
    type: Boolean, 
    default: false 
  },
  status: { 
    type: String, 
    default: 'active' 
  },
  jobType: { 
    type: mongoose.Schema.Types.Mixed 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


const Jobs = mongoose.model('Jobs', jobsSchema);

module.exports = Jobs;
