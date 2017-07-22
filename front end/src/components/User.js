import React, { Component } from 'react';
import { connect } from 'react-redux';

import $ from 'jquery';
import cookie from 'jquery.cookie';

import { Link } from 'react-router-dom';

class Users extends Component {

  state = {
    username: ''
  }

  componentDidMount() {
    this.props.changeTitles("我的");
    var that = this;
    setTimeout(function () {
      //取username的cookie的值
      var temp = getCookie('username');
      // console.log(temp.length);
      //取temp值的后4位
      var num = temp.substring(temp.length - 4);
      // console.log(num);
      if (temp) {
        that.setState({
          username: num
        })
      }
    }, 500)
  }

  render() {
    return (
      <div className='user'>
        <div className='user-top'>
          <div className='ust'>
            <img src="https://pic.maizuo.com/usr/default/maizuomoren66.jpg" />
            <div className='ut-right'>
              <p >
                <span className='span-1'>手机用户{this.state.username}</span>
              </p>
              <p>ID:217321022</p>
              <p>
                <Link to='/personal'>
                  <span className='span-2' onClick={this.out.bind(this)}>退出</span>
                </Link>
              </p>
            </div>
          </div >
        </div>
        <div className='user-bottom'>
          <ul className='usb-ul'>
            {
              this.props.user.map(function (item, index) {
                return <li key={index}>
                  <div className='usb-li'>
                    <i className={"iconfont icon-" + item.iconfont} style={{ color: item.color }}></i>
                    <span className='span-1'>{item.title}</span>
                    <div className='usb-right'>
                      <span className='span-2'>
                        <span className='span-3'>{item.span1}</span>
                        <span className='span-4'> {item.span2}</span>
                      </span>
                      <i className="iconfont icon-icon"></i>
                    </div>
                  </div>
                </li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  out() {
    $.cookie('username', '');
  }

}

//封装 取cookie特定值的函数
function getCookie(cookieName) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split("; ");
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    if (cookieName == arr[0]) {
      return arr[1];
    }
  }
  return "";
}

var User = connect(
  function (state, ownProps) {
    return {
      user: state.user,
      username: state.username
    }
  }, {
    change: function (res) {
      return {
        type: 'CHANGE_USERNAME',
        username: res
      }
    },
    changeTitles: function (data) {
            return {
                type: "CHANGE_TITLESSSS",
                data: data
            }
        }
  }
)(Users);


export default User;