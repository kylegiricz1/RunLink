const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({

    location:{
        type: String
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
    }
})

module.exports = mongoose.model('Workout', workoutSchema);
