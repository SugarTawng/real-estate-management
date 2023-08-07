/**
 * Created by s3lab. on 1/13/2017.
 */
module.exports = function (app) {
    // require('./route/User')(app);
    // require('./route/Device')(app);
    // require('./route/Service')(app);
    // require('./route/project')(app);
    require('./route/account')(app);
    require('./route/project')(app);
    require('./route/zone')(app);
    require('./route/block')(app);
    require('./route/floor')(app);
    require('./route/highArea')(app);
    require('./route/landArea')(app);
    require('./route/message')(app);
    require('./route/whileBoard')(app);

};
