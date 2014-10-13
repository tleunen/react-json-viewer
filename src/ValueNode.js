/**
 * @jsx React.DOM
 */
"use strict";

var React = require('react/addons');
var ObjectTypeUtils = require('./objectTypeUtils');

var ValueNode = React.createClass({
    propTypes: {
        value: React.PropTypes.any,
        keyName: React.PropTypes.string.isRequired,
        initialExpanded: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            initialExpanded: false
        };
    },
    getInitialState: function(props) {
        props = props || this.props;
        return {
            valueType: ObjectTypeUtils.getType(props.value),
            expanded: props.initialExpanded,
            expandable: ObjectTypeUtils.isExpandableType(props.value)
        };
    },
    componentWillReceiveProps: function(props) {
        this.setState(this.getInitialState(props));
    },

    getChildren: function() {
        var val = this.props.value;
        console.log(val);
        console.log(ObjectTypeUtils.getType(val));

        if(ObjectTypeUtils.getType(val) == ObjectTypeUtils.TYPES.OBJECT ||
           ObjectTypeUtils.getType(val) == ObjectTypeUtils.TYPES.ARRAY) {
            return Object.keys(val).map(function(k) {
                console.log(k, val[k])
                return <ValueNode keyName={k} value={val[k]} />
            });
        }

        return [];
    },

    getExpandableTypeString: function(childrenLn) {
        var m = {};
        m[ObjectTypeUtils.TYPES.OBJECT] = '{'+childrenLn+'}';
        m[ObjectTypeUtils.TYPES.ARRAY] = '['+childrenLn+']';

        return m[ObjectTypeUtils.getType(this.props.value)] || '';
    },

    handleClick: function (e) {
        e.stopPropagation();
        if(this.state.expandable) {
            this.setState({expanded: !this.state.expanded});
        }
    },

    getFormattedValue: function() {
        var val = this.props.value;

        var m = {};
        m[ObjectTypeUtils.TYPES.BOOLEAN] = val ? 'true' : 'false';
        m[ObjectTypeUtils.TYPES.NULL] = 'null';

        return m[ObjectTypeUtils.getType(val)] || val;
    },

    getContent: function() {
        var content = [];
        var children = this.getChildren();

        content.push(<span className="keyName">{ this.props.keyName }</span>);
        if(this.state.expandable) {
            content.push(<span className="desc">{ this.getExpandableTypeString(children.length) }</span>);
            content.push(<ul>{ children }</ul>);
        }
        else {
            content.push(<span className="value">{ this.getFormattedValue() }</span>);
        }
        return content;
    },

    render: function () {
        var cx = React.addons.classSet;
        var classes = {
            'expandable': this.state.expandable,
            'expanded': this.state.expandable && this.state.expanded
        };
        classes[ObjectTypeUtils.getType(this.props.value).toLowerCase()] = true;

        return (
            <li className={cx(classes)} onClick={this.handleClick}>
                { this.getContent() }
            </li>
        );
    }
});

module.exports = ValueNode;