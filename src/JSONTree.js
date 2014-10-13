/**
 * @jsx React.DOM
 */
"use strict";

var React = require('react/addons');
var ValueNode = require('./ValueNode');

var JSONTree = React.createClass({
    getDefaultProps: function () {
        return {
            data: {}
        };
    },
    render: function() {
        return (
            <ul className="json_tree">
                <ValueNode keyName="root" value={this.props.data} initialExpanded={true} />
            </ul>
        );
    }
});

module.exports = JSONTree;