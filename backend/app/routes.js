/**
 * Created by s3lab. on 1/13/2017.
 */
module.exports = function (app) {
    require('./route/account')(app);
    require('./route/profile')(app);
    require('./route/profileProject')(app);
    require('./route/project')(app);
    require('./route/zone')(app);
    require('./route/block')(app);
    require('./route/floor')(app);
    require('./route/highArea')(app);
    require('./route/landArea')(app);
    require('./route/message')(app);
    require('./route/whileBoard')(app);

};
