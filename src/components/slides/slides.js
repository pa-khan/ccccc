function Slides(
  settings = {
    name: 'slides',
    class: {
      list: 'list',
      current: _.mode + 'current'
    }
  }){
  document.createElement(settings.name);
  var slides = document.querySelector('.' + settings.name);
  function init(slides){
    var list = document.createElement('div');
    list.className = settings.name + _.elem + settings.class.list;
    slides.innerHTML = list;
  }
  
  init(slides);
}
new Slides();