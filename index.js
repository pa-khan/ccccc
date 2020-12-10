const PATH = {
  _: function(addPath){
    return addPath;
  },
  SRC: () => PATH._('src/'),
  DIST: () => PATH._('dist/'),
  COMP: () => PATH._(PATH.DIST() + 'components/'),
  TEMP: () => PATH._(PATH.DIST() + 'template/'),
  STYLES: () => PATH._(PATH.TEMP() + 'styles/'),
  CSS: () => PATH._(PATH.STYLES() + 'css/'),
  SASS: () => PATH._(PATH.STYLES() + 'sass/'),
  SCRIPTS: () => PATH._(PATH.TEMP() + 'scripts/'),
  JS: () => PATH._(PATH.SCRIPTS() + 'js/'),
  PUG: () => PATH._(PATH.TEMP() + 'pug/'),
};