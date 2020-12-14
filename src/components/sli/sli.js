function Sli(
  element = '.sli',
  s = { // settings
    name: 'sli',
    show: 2,
    scroll: 1,
    arrows: true,
    current: 1,
    attr: 'data-sli',
    swipe: true,
    loop: true,
    autoplay: false,
    class: {
      wrap: 'wrap',
      list: 'list',
      item: 'item',
      prev: 'prev',
      next: 'next',
      arrows: 'arrows',
      arrow: 'arrow',
      arrowPrev: _.mode + 'prev',
      arrowNext: _.mode + 'next',
      current: _.mode + 'current',
      active: _.mode + 'active',
    }
  }){
  document.createElement(s.name);
  var sliList = document.querySelector(element),
      items   = sliList.querySelectorAll(element + _.elem + s.class.item),
      currentSlide,
      length,
      wrap,
      list,
      widthWrap,
      widthList,
      transform;

  s.scroll = s.scroll > s.show ? s.show : s.scroll; 

  function calcWrap(){
    return list.parentNode.offsetWidth;
  }
  function calcList(){
    return calcItem() * length;
  }
  function calcItem(){
    return 100 / s.show;
  }
  function direction(where, operator){
    var scrolling;

    if (currentSlide) {
      // transform = Number(list.style.transform.replace(/[^\d.-]/g, ''));
      s.current = eval(s.current + ' ' + operator + ' ' + s.scroll);
      // console.log(s.current);
      // console.log(s.show);

      if (s.current <= 0){
        s.current = 1;
      }
      if (s.current + s.scroll > length){
        console.log(1);
        s.current = length + 1 - s.show;
      }


      // if (s.current + s.scroll > length){
      //   // return false;
      // } else {
      //   s.current = eval(s.current + ' ' + operator + ' ' + s.scroll);
      // }
            
      items.forEach(function(item, i){
        var index = i + 1;
        // && index < s.current + s.show
        if (index >= s.current && index < s.current + s.show) {
          item.classList.add(s.class.active);
        } else {
          item.classList.remove(s.class.active);
        }
        if (index == s.current) {
          item.classList.add(s.class.current);
        } else {
          item.classList.remove(s.class.current);
        }
      });

      list.style.transform = 'translateX(-' + (100 / length * (s.current - 1)).toFixed(4) + '%)';
    }
  }
  function prev(){
    direction('prev', '-');
  }
  function next(){
    direction('next', '+');
  }
  function init(sli){

    length = items.length;

    wrap  = document.createElement('div');
    list  = document.createElement('div');

    wrap.className = s.name + _.elem + s.class.wrap;
    list.className = s.name + _.elem + s.class.list;
    
    sliList.append(wrap);
    wrap.append(list);

    list.style.width = calcList() + '%';
    list.style.transform = 'translateX(0%)';

  
    if (items) {
      items.forEach(function(item, i) {
        item.classList.add(s.name + _.elem + s.class.item)
        var index = i + 1;
        if (s.show >= index) {
          item.classList.add(s.class.active);
        }
        if (s.current == index) {
          item.classList.add(s.class.current);
          currentSlide = item;
        }
        list.append(item);
        item.style.width = calcItem() + '%';
      });
    } else {
      return false;
    }
    if (s.arrows) {
      arrows = document.createElement('div'),
      arrows.className = s.name + _.elem + s.class.arrows;
      sliList.append(arrows);

      arrowPrev = document.createElement('div');
      arrowPrev.className = s.name + _.elem + s.class.arrow + ' ' + s.class.arrowPrev + ' ' + s.name + '-' + s.class.prev;
      arrowPrev.setAttribute(s.attr, element);
      arrowPrev.addEventListener('click', () => prev());
      arrows.append(arrowPrev);

      arrowNext = document.createElement('div');
      arrowNext.className = s.name + _.elem + s.class.arrow + ' ' + s.class.arrowNext + ' ' + s.name + '-' + s.class.next;
      arrowNext.setAttribute(s.attr, element);
      arrowNext.addEventListener('click', () => next());
      arrows.append(arrowNext);
    }
    // console.log(wrapWidth());
    // console.log(listWidth());
  }
  // function prevSlide(){
  //   var nextSlide = s.currentSlide.nextSibling ? s.currentSlide.nextSibling : next.parent.firstChild;
  // }
  // function nextSlide(){
  //   var nextSlide = s.currentSlide.nextSibling ? s.currentSlide.nextSibling : next.parent.firstChild;
  // }

  if (sliList) {
    init(sliList);
  }
}
new Sli('.slider');