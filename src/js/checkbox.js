function wrapInput(elementSelector, wrapperClass) {
    document.querySelectorAll(elementSelector).forEach(function (input) {
        var wrapper = document.createElement('span');
        wrapper.className = wrapperClass;
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        wrapper.appendChild(document.createElement('span'));
    });
}

wrapInput('input[type="checkbox"]', 'bootstrap-checkbox');
wrapInput('input[type="radio"]', 'bootstrap-radio');