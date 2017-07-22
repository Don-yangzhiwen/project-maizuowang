import React, { Component } from 'react';
import { connect } from 'react-redux';



class Shoppings extends Component {
    render() {
        return (
            <div>什么也没写!</div>
        )
    }
    componentDidMount() {
        this.props.changeTitles("卖座商城");
    }
}

var Shopping = connect(
    function (state, ownProps) {
        return {

        }
    },
    {
        changeTitles: function (data) {
            return {
                type: "CHANGE_TITLESSSS",
                data: data
            }
        }
    }
)(Shoppings);

export default Shopping;