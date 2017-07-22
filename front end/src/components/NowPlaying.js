import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { Link } from 'react-router-dom';

class NowPlayings extends Component {
    render() {
        return (
            <div className='mp-u'>
                <ul className='mpu'>
                    {
                        this.props.filmnows.map(function (item, index) {
                            return <li key={index}>
                                <Link to={'/films/'+item.id}>
                                <div className='mpu-li'>
                                    <div className='mpul-left'>
                                        <img src={item.poster.origin} alt={item.name} />
                                    </div>
                                    <div className='mpul-right'>
                                        <div className='mpulr-top'>
                                            <span className='span-1'>{item.name}</span>
                                            <i className="iconfont icon-icon"></i>
                                            <span className='span-2'>{item.grade}</span>
                                        </div>
                                        <div className='mpulr-middle'>{item.intro}</div>
                                        <div className='mpulr-bottom'>
                                            <span className='span-1'>{item.cinemaCount}</span>
                                            <span className='span-2'>家影院上映&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <span className='span-3'>{item.watchCount}</span>
                                            <span className='span-4'>人购票</span>
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
        $.get('http://10.20.152.47:8080/film/now-playing', function (res) {
            // console.log(JSON.parse(res).data.films);
            var datas = JSON.parse(res).data.films;
            that.props.change(datas);
        })
    }

}

var NowPlaying = connect(
    function (state, ownProps) {
        return {
            filmnows: state.filmnow
        }
    },
    {
        change: function (data) {
            return {
                type: 'CHANGE_FILMNOW',
                filmnows: data
            }
        }
    }
)(NowPlayings);

export default NowPlaying;