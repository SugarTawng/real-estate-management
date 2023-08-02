/**
 * Created by s3lab. on 1/17/2017.
 */
const DELETED = {
    NO: 'false',
    YES: 'true'
};

const ACTIVATED = {
    NO: 'false',
    YES: 'true'
};

const SYSTEM = {
    NO: 0,
    YES: 1
};

const USER_TYPE = ['anonymous', 'normal_user', 'admin', 'super_admin']

const T = ['normal_user']


module.exports = {
    DELETED,
    ACTIVATED,
    USER_TYPE,
    SYSTEM,
    T,
    THUMBNAIL_NAME_SUFFIX:'_thumb',
    CONTENT_TYPE_ENUM: ['*', 'bestProduct','video','advertiseText'],
    MAX_ASSET_SIZE_ALLOW: 1073741824,
    MAX_THUMB_SIZE_ALLOW: 1048576,
    DEFAULT_PAGING_SIZE: 25
};
