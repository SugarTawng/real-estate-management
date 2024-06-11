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

const CONTACTED = {
    NO: 'false',
    YES: 'true'
};

const POTENTIAL = {
    NO: 'false',
    YES: 'true'
};

const IS_FRONT = {
    NO: 'false',
    YES: 'true'
};

const WHITE_BOARD_MODE = {
    NO: 'false',
    YES: 'true'
}

const WHITE_BOARD_PRIORITY ={
    HIGH: 'high',
    NORMAL: 'normal',
    LOW: 'low'
}

const BLOCK_TYPE = {
    NORMAL: 'normal',
    LUXURY: 'luxury'
}

const SYSTEM = {
    NO: 0,
    YES: 1
};

const USER_TYPE = ['anonymous', 'sale', 'sale_manager', 'admin', 'super_admin']

const BUY_STATUS = {
    BLOCK: 'block',
    DEAL: 'deal',
    NOT_BLOCK: 'not block'
};

const PROFILE_ROLE_JOB = {
    SALE: 'sale',
    ANOTHER: 'another'
}

const PROFILE_POSITION_JOB = {
    STAFF: 'staff',
    LEADER: 'leader',
    MANAGER: 'manager'
}

module.exports = {
    DELETED,
    CONTACTED,
    POTENTIAL,
    ACTIVATED,
    USER_TYPE,
    SYSTEM,
    BLOCK_TYPE,
    BUY_STATUS,
    IS_FRONT,
    WHITE_BOARD_MODE,
    WHITE_BOARD_PRIORITY,
    PROFILE_ROLE_JOB,
    PROFILE_POSITION_JOB,
    THUMBNAIL_NAME_SUFFIX:'_thumb',
    CONTENT_TYPE_ENUM: ['*', 'bestProduct','video','advertiseText'],
    MAX_ASSET_SIZE_ALLOW: 1073741824,
    MAX_THUMB_SIZE_ALLOW: 1048576,
    DEFAULT_PAGING_SIZE: 10000
};