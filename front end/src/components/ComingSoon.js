import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';



import { Link } from 'react-router-dom';
 
class ComingSoons extends Component {
    render() {
        return (
            <div className='mp-u'>
                <ul className='mpu'>
                    {
                        this.props.filmcomings.map(function (item, index) {
                            return <li key={index}>
                                <Link to={ '/films/'+item.id }>
                                <div className='mpu-li'>
                                    <div className='mpul-left'>
                                        <img src={item.poster.origin} alt={item.name} />
                                    </div>
                                    <div className='mpul-right'>
                                        <div className='mpulr-top'>
                                            <span className='span-1'>{item.name}</span>
                                            <i className="iconfont icon-icon"></i>
                                        </div>
                                        <div className='mpulr-middle'>{item.intro}</div>
                                        <div className='mpulr-bottom'>
                                            <span className='span-5'>
                                                {((new Date(item.premiereAt)).getMonth() + 1) + '月' + ((new Date(item.premiereAt)).getDate()) + '日上映'}
                                            </span>
                                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <span className='span-6'>
                                                { getCurDate(item.premiereAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }

    componentDidMount() {
        var that = this;
        $.get('http://10.20.152.47:8080/film/coming-soon', function (res) {
            // console.log(JSON.parse(res).data.films);
            var datas = JSON.parse(res).data.films;
            that.props.change(datas);
        })
    }

}
//时间戳转换星期
function getCurDate(time) {
    var d = new Date(time);
    switch (d.getDay()) {
        case 1: return "星期一";
        case 2: return "星期二";
        case 3: return  "星期三";
        case 4: return  "星期四";
        case 5: return  "星期五";
        case 6: return  "星期六";
        default: return "星期天";
    }
}

var ComingSoon = connect(
    function (state, ownProps) {
        return {
            filmcomings: state.filmcoming
        }
    },
    {
        change: function (data) {
            return {
                type: 'CHANGE_FILMCOMING',
                filmcomings: data
            }
        }
    }
)(ComingSoons);

export default ComingSoon;