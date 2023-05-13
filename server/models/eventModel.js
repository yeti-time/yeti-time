const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  dates: { type: [String], required: true },
  times: { type: [Number], required: true },
  people: {
    
  }
});

