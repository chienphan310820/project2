const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    // we're connected!
    // console.log('connect success');
});

module.exports =mongoose;