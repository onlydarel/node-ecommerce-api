const { UnauthorizedError } = require('../errors/index')
const checkPermissions = (user, id) => {
    if(user.role === 'admin') return;
    if(user.userId === id.toString()) return;
    throw new UnauthorizedError('You cannot access this route')
}
module.exports = {
    checkPermissions
}