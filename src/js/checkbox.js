function initCheckboxAndRadioInput(elementSelector, wrapperClass) {
    document.querySelectorAll(elementSelector).forEach(function (input) {
        if (input.parentNode.className !== 'bootstrap-checkbox' && input.parentNode.className !== 'bootstrap-radio') {
            var wrapper = document.createElement('span');
            wrapper.className = wrapperClass;
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
            wrapper.appendChild(document.createElement('span'));
        }
    });
}

initCheckboxAndRadioInput('input[type="checkbox"]', 'bootstrap-checkbox');
initCheckboxAndRadioInput('input[type="radio"]', 'bootstrap-radio');
