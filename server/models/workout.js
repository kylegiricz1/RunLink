const mongoose = require("mongoose");


const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const workoutSchema = new mongoose.Schema({
    location:{
      type: pointSchema,
      required: true,
    },
    date:{
      type:Date,
      required:true
    },
    distance:{
        type:Number,
        required: true
    },
    pace:{
        minutes: {
            type: Number,
            required: true,
            min: 0
          },
          seconds: {
            type: Number,
            required: true,
            min: 0,
            max: 59
          }
    },
    description:{
      type: String
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Workout', workoutSchema);
