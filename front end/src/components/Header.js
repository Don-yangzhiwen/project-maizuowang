import React, { Component } from 'react';
// import RouterDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
// import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Drawer, List } from 'antd-mobile';
import Section from './Section.js';
import Films from './Films.js';

import Cinema from './Cinema.js';

import Details from './Details.js';
import Shopping from './Shopping.js';

import Personal from './Personal.js';

import Scroll from './Scroll.js';

import User from './User.js';

import { BackTop } from 'antd';



class Headers extends Component {
  state = {
    open: false,
    url: 'personal',
    title: '登录'
  }

  onOpenChange = (...args) => {
    // console.log(args);
    this.setState({ open: !this.state.open });
  }
  render() {
    var sidebar = (<List>
      <ul onClick={this.onOpenChange}>
        <li>
          <Link to='/'>
            <span>首页</span>
            <i className="iconfont icon-icon"></i>
          </Link>
        </li>
        <li>
          <Link to='/film/now-playing'>
            <span>影片</span>
            <i className="iconfont icon-icon"></i>
          </Link>
        </li>
        <li>
          <Link to='/cinema'>
            <span>影院</span>
            <i className="iconfont icon-icon"></i>
          </Link>
        </li>
        <li>
          <Link to='/shopping'>
            <span>商城</span>
            <i className="iconfont icon-icon"></i>
          </Link>
        </li>
        <li>
          <Link to={'/' + this.state.url} onClick={this.props.change.bind(this, this.state.title)}>
            <span>我的</span>
            <i className="iconfont icon-icon"></i>
          </Link>
        </li>
      </ul>
    </List>);
    return (

      <Router>
        <div>
          <header>
            <div className='h-left'>
              <div className='h-1'>
                <i onClick={this.onOpenChange} className="iconfont icon-sanhengzongleimu"></i>
              </div>
              <div className='h-2'>
                <div>{this.props.titless}</div>
              </div>
            </div>
            <div className='h-right'>
              <div className='h-3' >
                <span className='ipwz'>深圳</span>
                <i className="iconfont icon-fanhui-copy"></i>
              </div>
              <div className='h-4 '>
                <Link to={'/' + this.state.url}>
                  <i className="iconfont icon-yonghu1" onClick={this.gogogo.bind(this)}></i>
                </Link>
              </div>
            </div>
          </header>
          <Drawer
            className="my-drawer"
            style={{ minHeight: document.documentElement.clientHeight - 200 }}
            sidebar={sidebar}
            open={this.state.open}
            onOpenChange={this.onOpenChange}
            touch={false}

          >

            {/* 首页组件 */}
            <Route exact path='/' component={Section} />
            {/* 影片组件  */}
            <Route path='/film' component={Films} />
            {/* 影院组件  */}
            <Route path='/cinema' component={Cinema} />
            {/* 影片详情页  */}
            <Route path='/films/:id' component={Details} />
            {/* 商城组件  */}
            <Route path='/shopping' component={Shopping} />
            {/* 登录和注册页面  */}
            <Route path='/personal' component={Personal} />
            {/* 个人用户页面 */}
            <Route path='/user' component={User} />

          </Drawer>

        </div>
      </Router>
    )
  }

  componentDidMount() {
    //取username的cookie的值
    var temp = getCookie('username');
    if (temp) {
      this.setState({
        url: 'user',
        title: '我的'
      })
    }
  }

  gogogo() {
    //取username的cookie的值
    var temp = getCookie('username');
    if (!temp) {
      this.setState({
        url: 'personal'
      })
    } else {
      this.setState({
        url: 'user'
      })
    }
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



var Header = connect(
  function (state, ownProps) {
    return {
      title: state.title,
      titless: state.titless
    }
  }, {
    change: function (res) {
      // console.log(res);
      return {
        type: 'CHANGE_TITLE',
        title: res
      }
    }
  }
)(Headers);

export default Header;