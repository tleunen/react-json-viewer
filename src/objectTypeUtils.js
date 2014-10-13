"use strict";

var objectTypeUtils = {
    getType: function(obj) {
        var className = Object.prototype.toString.call(obj).slice(8, -1);
        return className;
    },
    isExpandableType: function(obj) {
        return objectTypeUtils.getType(obj) == objectTypeUtils.TYPES.OBJECT ||
               objectTypeUtils.getType(obj) == objectTypeUtils.TYPES.ARRAY;
    },
    TYPES: {
        OBJECT: 'Object',
        ARRAY: 'Array',
        STRING: 'String',
        BOOLEAN: 'Boolean',
        NULL: 'Null'
    }
};

module.exports = objectTypeUtils;