import React, { Component } from 'react';

import { connect } from 'react-redux';
import $ from 'jquery';
import cookie from 'jquery.cookie';

import { Link } from 'react-router-dom';

var time;

class Personals extends Component {
    render() {
        return (
            <div className='per'>
                <form className='per-form'>
                    <div>
                        <input ref='acc' type="text" placeholder='输入手机号/邮箱' onChange={this.yzm.bind(this)} />
                        <span className='yzm' ref='yzm' style={{ display: 'none' }}>
                            <i className="iconfont icon-zuosanjiao-copy"></i>
                            <span ref='send' onClick={this.sends.bind(this)}>发送验证码</span>
                        </span>
                        <div></div>
                    </div>
                    <div>
                        <input ref='pw' type="password" placeholder='输入密码/验证码' />
                        <div></div>
                    </div>
                    <div>
                        <input type="text" placeholder='图形验证码' ref='imgs' />
                        <img ref="img" onClick={this.changeImg.bind(this)}
                            src="http://captcha.maizuo.com/captcha/code/getImg?key=27EC0FA92997C4F8" alt="" />
                        <div></div>
                    </div>
                    <span>{this.props.txt}</span>
                    <button onClick={this.change.bind(this)}>
                        {/* 登录 */}
                         <Link to='/user'>登录</Link> 
                    </button>
                </form>
            </div>
        )
    }

     componentDidMount() {
        this.props.changeTitles("登录");
    }

    //手机号码验证
    yzm() {
        var text = this.refs.acc.value;
        var a = checkMobile(text);
        this.props.change('');
        if (a.list) {
            this.refs.yzm.style.display = 'block';
        } else {
            this.refs.yzm.style.display = 'none';
        }
    }

    //点击 发送验证码到手机并做倒计时
    sends() {
        var a = 60;
        // console.dir(this.refs.send);
        clearInterval(time);
        this.refs.send.innerText = '重发' + a + 's';
        var that = this;
        time = setInterval(function () {
            a--;
            that.refs.send.innerText = '重发' + a + 's';
            if (a == 0) {
                clearInterval(time);
                that.refs.send.innerText = '发送验证码';
            }
        }, 1000)
    }

    //点击图形验证码更新图片
    changeImg() {
        this.refs.img.setAttribute('src', 'http://captcha.maizuo.com/captcha/code/getImg?key=27EC0FA92997C4F8&time=' + new Date().getTime());
    }

    //点击登录做判断 并存数据到mongodb
    change() {
        var text = this.refs.acc.value;
        var pw = this.refs.pw.value;
        var imgs = this.refs.imgs.value;

        //验证手机号码和密码正确
        var a = checkMobile(text);
        var b = password(pw);
        console.log(a);
        if (!a.list) {
            this.props.change(a.mas);
        } else {
            if (!b.list) {
                this.props.change(b.mas);
            } else {
                if (!imgs) {
                    var strs = '图形验证码为空!';
                    this.props.change(strs);
                }
            }
        }

        if (a.list && b.list && imgs) {
            this.props.change('');
            $.get('http://10.20.152.47:8080/storage?text=' + text + '&pw=' + pw, function (res) {
                console.log(res);
                //储存手机号码到cookie

                //手机号码后4位
                var a = text.substring(7);
                //手机号码前7位
                var b = text.substring(0, 7);
                var c = JSON.stringify(b) + a;
                $.cookie("username", c, { expires: 7 });

            })
            this.refs.pw.value = this.refs.imgs.value = '';
        }
    }

}

//封装验证手机号码函数
function checkMobile(sMobile) {
    var btn;
    if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(sMobile))) {
        var error = '请输入正确手机号或邮箱';
        btn = {
            mas: error,
            list: false
        }
        return btn;
    }
    btn = {
        mas: 'OK',
        list: true
    }
    return btn;
}
//验证短信验证码
function password(ps) {
    var btn;
    if (!(/^\d{6}$/.test(ps))) {
        var error = '短信验证码错误';
        btn = {
            mas: error,
            list: false
        }
        return btn;
    }
    btn = {
        mas: 'OK',
        list: true
    }
    return btn;
}

var Personal = connect(
    function (state, ownProps) {
        return {
            txt: state.txt
        }
    },
    {
        change: function (res) {
            return {
                type: 'CHANGE_TXT',
                txt: res
            }
        },
         changeTitles: function (data) {
            return {
                type: "CHANGE_TITLESSSS",
                data: data
            }
        }
    }
)(Personals);

export default Personal;