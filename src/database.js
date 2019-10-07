const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/posada_bonita1', {
    //useNewUrlParer: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.error(err));
