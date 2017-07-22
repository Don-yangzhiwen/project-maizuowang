import React, { Component } from 'react';

import { connect } from 'react-redux';
import $ from 'jquery';

class GetImgs extends Component {
    render() {
        return (
            <div>
                <input type="text" placeholder='图形验证码' />
                <img ref="img" onClick={this.changeImg.bind(this)}
                    src="http://captcha.maizuo.com/captcha/code/getImg?key=27EC0FA92997C4F8" alt="" />
                <div></div>
            </div>
        )
    }
    changeImg() {
        this.refs.img.setAttribute('src', 'http://captcha.maizuo.com/captcha/code/getImg?key=27EC0FA92997C4F8&time=' + new Date().getTime());
    }
}

var GetImg = connect(
    
)(GetImgs);

export default GetImg;