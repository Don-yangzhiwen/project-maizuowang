import React, { Component } from 'react';

import { connect } from 'react-redux';

import $ from 'jquery';
import { Link } from 'react-router-dom';

class HitMoviess extends Component {
    render() {
        return (
            <div className='now'>
                <ul className='u-1'>
                    {
                        this.props.statenows.map(function (item, index) {
                            return (
                                <li key={index}>
                                    <Link to={'/films/' + item.id}>
                                        <img src={item.cover.origin} key={index} alt={item.name} />
                                        <div className='u-bottom'>
                                            <div className='u-left'>
                                                <div className='uLf-top'>{item.name}</div>
                                                <div className='uLf-bottom'>
                                                    <span>{item.cinemaCount}</span>
                                                    <span>家影院上映</span>
                                                    <span> {item.watchCount}</span>
                                                    <span> 人购票</span>
                                                </div>
                                            </div>
                                            <div className='u-right'>
                                                <span>{item.grade}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className='more'>
                    <Link to='/film/now-playing'>更多热映电影</Link>
                </div>
            </div>
        )
    }
    componentDidMount() {
        var that = this;
        $.get('http://10.20.152.47:8080/now-playing', function (res) {
            // console.log(JSON.parse(res).data.films);
            var data = JSON.parse(res).data.films;
            that.props.change(data);
        })
    }
}

var HitMovies = connect(
    function (state, ownProps) {
        return {
            statenows: state.statenow
        }
    },
    {
        change: function (data) {
            return {
                type: 'CHANGE_NOW',
                statenows: data
            }
        }
    }
)(HitMoviess);

export default HitMovies;