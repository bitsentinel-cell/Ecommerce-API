'use strict';

const createTokenUser = async (user) =>{
    return {name: user.name, userId: user._id, role: user.role};
}

export default createTokenUser;
