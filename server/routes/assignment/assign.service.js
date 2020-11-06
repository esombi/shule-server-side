const config = require('dbConfig.json');
const db = require('_connection/dbConnection');

module.exports = {
    create,
    update,
    delete: _delete

};

async function create(params) {

    //save
    await db.assignment.create(params);
}

async function update(id, params) {
    const user = await getUser(id);

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

//helper function
async function getUser(id) {
    const user = await db.assignment.findByPk(id, {
        include: [
            {
                model : db.students,
                attributes: ['firstName', 'lastName' ]
            }
            ]        
    });
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}
