import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

class ScrollLinks extends Component {


    render() {
        // const styles = require('./index.scss');
        return (
            <div ref='scroll' className='scroll' onClick={this.scrollToTop.bind(this)}>
                <i className="iconfont icon-fanhuidingbu"></i>
            </div>
        );
    }

    scrollToTop() {
        $('.am-drawer-content').animate({
            scrollTop: 0
        }, 500);
    }
}

setInterval(function () {
    if ($('.am-drawer-content').scrollTop() > 50) {
        $('.scroll').animate({
            bottom: '0.1rem'
        }, 500);
    }
    else {
        $('.scroll').animate({
            bottom: '-0.5rem'
        },500);
    }
}, 500)


var ScrollLink = connect(

)(ScrollLinks);


export default ScrollLink;