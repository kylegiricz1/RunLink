const mongoose = require("mongoose")

const workoutSchema = new mongoose.Schema({
    distance:{
        type:Number
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
    }
})

module.exports = mongoose.model('Workout', workoutSchema);
