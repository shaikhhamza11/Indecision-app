"use strict";

console.log(" Hello Hamza");

//JSX javascript xml also known as javascript extension
//template 1
var app = {
    title: "Indecision App",
    subtitle: "Put your life in the hands of computer",
    options: []
};
var onFormSubmit = function onFormSubmit(e) {
    e.preventDefault();
    var option = e.target.elements.option.value;
    if (option) {

        app.options.push(option);
        e.target.elements.option.value = "";
        renderFunction();
    }
};
var removeOptions = function removeOptions() {
    app.options = [];
    renderFunction();
};
var onMakeDecision = function onMakeDecision() {
    var randomNum = Math.floor(Math.random() * app.options.length);
    var option = app.options[randomNum];
    alert(option);
};

var renderFunction = function renderFunction() {
    var template = React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            app.title.toUpperCase()
        ),
        app.subtitle && React.createElement(
            "p",
            null,
            app.subtitle
        ),
        React.createElement(
            "p",
            null,
            app.options.length > 0 ? "Here are your options" : "No options"
        ),
        React.createElement(
            "ol",
            null,
            app.options.map(function (option) {
                return React.createElement(
                    "li",
                    { key: option },
                    option
                );
            })
        ),
        React.createElement(
            "button",
            { disabled: app.options.length === 0, onClick: onMakeDecision },
            "What should I do?"
        ),
        React.createElement(
            "button",
            { onClick: removeOptions },
            "Remove all options"
        ),
        React.createElement(
            "form",
            { onSubmit: onFormSubmit },
            React.createElement("input", { type: "text", name: "option", placeholder: "Enter something" }),
            React.createElement(
                "button",
                null,
                "Add options"
            )
        )
    );
    ReactDOM.render(template, appRoot);
};
var appRoot = document.querySelector('#app');
renderFunction();
