function Check(name = 'check', classInput = 'input', classChecked = _.mode + 'selected') {
  document.createElement(name, {
    prototype: HTMLElement.prototype
  });
  var checks = document.querySelectorAll('.' + name);

  function init(el) {
    var input     = el.querySelector('.' + name + _.elem + classInput),
        type      = input.attributes.type.value;
        isChecked = input.checked;

    if ( type == 'checkbox' ) {
      if ( isChecked ) {
        el.classList.add(classChecked);
      } else {
        el.classList.remove(classChecked);
      }
      input.checked = !isChecked;
    } else if (type == 'radio') {
      if ( isChecked ) {
        el.classList.add(classChecked);
        input.checked = !isChecked;
      }
    }
  }
  function removeRadiData(el, attrName){
    var siblings = document.querySelectorAll('.' + name + _.elem + classInput + '[name=' + attrName + ']');
    if (siblings.length > 0 ) {
      siblings.forEach(function(sibling){
        sibling.parentElement.classList.remove(classChecked);
        sibling.checked = false;
      });
    }
  }
  function onClick(el) {
    var input     = el.querySelector('.' + name + _.elem + classInput),
        type      = input.attributes.type.value,
        isChecked = input.checked;

    if ( type == 'checkbox' ) {
      if ( isChecked ) {
        el.classList.add(classChecked);
      } else {
        el.classList.remove(classChecked);
      }
      input.checked = !isChecked;
    } else if (type == 'radio') {
      if ( !isChecked ) {
        var attrName = input.attributes.name.value;
        removeRadiData(el, attrName);
        el.classList.add(classChecked);
        input.checked = true;
      }
    }
    
  }
  checks.forEach(function(check){
    init(check);
    check.addEventListener('click', function(event){
      onClick(check);
    })
  })
}