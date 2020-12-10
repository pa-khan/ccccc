function Drop(name = 'drop', classSelect = 'select', classWrap = 'wrap', classList = 'list', classItem = 'item', classTitle = 'title', classSelected = _.mode + 'selected', classOpen = _.mode + 'open', classChanged = _.mode + 'changed') {
  document.createElement(name);
  var drops = document.querySelectorAll('.' + name);
  function toggleBlock(el, event) {
    if ( event.target.closest('.' + name)) {
      el.classList.toggle(classOpen);
      return; 
    }
    el.classList.remove(classOpen);
  }
  function onClickItem(el) {
    if ( !el.classList.contains(classSelected) ) {
      var list  = el.parentElement;
          index = Number(el.getAttribute('data-option-index'));
      list.querySelectorAll('.' + name + _.elem + classItem).forEach(function(item){
        item.classList.remove(classSelected);
      })
      el.classList.add(classSelected);
      var block = list.closest('.' + name);
      block.querySelector('.' + name + _.elem + classTitle).innerText = el.innerText;
      block.querySelectorAll('option').forEach(function(option, i){
        if (i != index) {
          option.removeAttribute('selected');
        } else {
          option.setAttribute('selected', 'selected');
        }
      });
      block.classList.add(classChanged);
    }
  }
  function init(drop){
    var select = drop.querySelector('.' + name + _.elem + classSelect),
        list   = drop.querySelector('.' + name + _.elem + classList),
        title  = drop.querySelector('.' + name + _.elem + classTitle),
        text;
    select.querySelectorAll('option').forEach(function(option, i){
      var item = document.createElement('div');
      item.className = name + _.elem + classItem;
      item.innerText = option.innerText; 
      if ( option.attributes.selected ) {
        item.classList.add(classSelected);
      }
      item.setAttribute('data-option-index', i)
      list.append(item);
      item.addEventListener('click', function(){
        onClickItem(item);
      })
    })
    var optionSelected = select.querySelector('option[selected]');
    if ( optionSelected ) {
      text = optionSelected.innerText;
    } else {
      var firstOption = list.firstChild;
      text = firstOption.innerText;
      firstOption.classList.add(classSelected);
    }
    title.innerText = title.innerText ? title.innerText : text;
  }
  drops.forEach(function(drop){
    init(drop);
    document.addEventListener('click', function(event){
      toggleBlock(drop, event);
    })
  });
  
}