import bs from 'browser-sync';

bs.create();

module.exports = (options) => () => {
  bs.init({
    server: options.src,
  }),
  bs.watch(options.src).on('change', bs.reload);
};
