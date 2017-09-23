import del from 'del';

module.exports = (options) => () => del(options.dist);

