/**
 * @jsx React.DOM
 */
"use strict";

var JSONTree = require('./JSONTree');
var React = require('react/addons');
var dragDrop = require('drag-drop')

// export for http://fb.me/react-devtools
window.React = React;

var defaultJsonContent = {
    "aString": "This is a string value",
    "aBoolTrue": true,
    "anotherBoolFalse": false,
    "anArray": ["first Element", "second Element", "third Element"],
    "aNullObject": null,
    "anObject": {
        "innerValueStr": "Wowwww!",
        "price": 19.99,
        "content": {
            "table": ["this", "that", "Oh!", "Awesome!"],
            "available": false,
            "anotherObject": {
                "yat": "Yay!"
            }
        }
    },
    "aNumber": 5,
    "aFloat": 2.454
};

var jsonEditor = React.renderComponent(
  <JSONTree data={defaultJsonContent} />,
  document.getElementById('jsonTree')
)

dragDrop('body', function (files, pos) {
    console.log('Here are the dropped files', files);
    if(files.length > 1) {
        alert('Oops 1 file only!');
        return;
    }

    var file = files[0];
    var reader = new FileReader();

    reader.readAsText(file);
    reader.onload = function(e) {
        var content = e.target.result;
        try {
            var jsonObject = JSON.parse(content);
            jsonEditor.setProps({ data: jsonObject });
        } catch(e) {
            alert('Invalid json file')
            return;
        }
    };

    reader.onerror = function() {
        alert('Unable to read: ' + file.fileName);
    };
});