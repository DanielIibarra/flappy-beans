const {model,Schema} = require('mongoose');

const ScoreSchema = new Schema({
    scorebd :{
        type: Number,
        requeried: true
    }
});

module.exports = model('score',ScoreSchema);