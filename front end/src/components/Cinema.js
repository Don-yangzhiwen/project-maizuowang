import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import $ from 'jquery';

import { Accordion, List } from 'antd-mobile';
import Scroll from './Scroll.js';
// var arrs = [];

class Cinemas extends Component {
  onChange = (key) => {
    // console.log(key);
  }

  render() {
    // var that = this;
    return (
      <div className='cm-section'>
        <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
          {
            this.props.cinemas.map(function (item, index) {
              return <Accordion.Panel header={item.name} key={index}>
                <List className="my-list">
                  <ul className='ml'>
                    {
                      item.list.map(function (items, index) {
                        return <li key={index}>
                          <div className='clearfix'>
                            <div className='ml-left'>
                              <div className='mll-top'>
                                <span className='span-1'>{items.name}</span>
                                <span className='span-2'>1</span>
                                <span className='span-3'>2</span>
                              </div>
                              <div className='mll-middle' >
                                {
                                  items.labels.map(function (itemss, index) {
                                    return <span className='span-1' key={index}>{itemss.name}</span>
                                  })
                                }
                              </div>
                              <div className='mll-bottom'>{items.address}</div>
                              <div className='mll-juli'>
                                <span className='span-1'>距离</span>
                                <span className='span-2'>未知</span>
                              </div>
                            </div>
                            <div className='ml-right'>
                              <i className="iconfont icon-icon"></i>
                            </div>
                          </div>
                        </li>
                      })
                    }

                  </ul>
                </List>
              </Accordion.Panel>
            })
          }
        </Accordion>
         <Scroll />
      </div>
    );
  }

  componentDidMount() {
    var that = this;
    that.props.changeTitles("全部影院");
    $.get('http://10.20.152.47:8080/cinema', function (res) {
      // console.log(JSON.parse(res).data.cinemas);
      var datas = JSON.parse(res).data.cinemas;
      // console.log(datas);
      var arr = [];
      datas.map((i) => {
        arr.push(i.district.name);
      })

      // console.log(arr);

      var name = quchong(arr);
      // console.log(name);
      name.map((i) => {
        datas.map((item) => {
          // console.log(i);
          if (item.district.name === i.name) {
            i.list.push(item);
          }
        })
      })
      // console.log(name);
      that.props.change(name);
    })
  }

}

function quchong(arr) {
  var res = [];
  var json = {};
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push({ name: arr[i], list: [] });
      json[arr[i]] = 1;
    }
  }
  return res;
}



var Cinema = connect(
  function (state, ownProps) {
    return {
      cinemas: state.cinema
    }
  },
  {
    change: function (res) {
      return {
        type: "CHANGE_AREA",
        cinema: res
      }
    },
    changeTitles: function (data) {
      return {
        type: "CHANGE_TITLESSSS",
        data: data
      }
    }

  }
)(Cinemas);

export default Cinema;