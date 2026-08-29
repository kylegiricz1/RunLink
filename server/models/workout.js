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
    validate: {
      validator: (coordinates) => coordinates.length === 2 && coordinates.every(Number.isFinite),
      message: 'Location coordinates must be a longitude and latitude pair',
    },
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
      type: String,
      trim: true,
      maxlength: 500,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Workout', workoutSchema);
