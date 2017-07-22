import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { Link } from 'react-router-dom';

class Upcomms extends Component {
    render() {
        return (
            <div className='come'>
                <div className='c-top'>
                    <div>即将上映</div>
                </div>
                <ul className='u-2'>
                    {
                        this.props.statecomes.map(function (item, index) {
                            return <li key={index}>
                                <Link to={'/films/' + item.id}>
                                    <img src={item.cover.origin} key={index} alt={item.name} />
                                    <div className='u-bottom'>
                                        <div className='uB-left'>{item.name}</div>
                                        <div className='uB-right'>
                                            {((new Date(item.premiereAt)).getMonth() + 1) + '月' + ((new Date(item.premiereAt)).getDate()) + '日上映'}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        })
                    }
                </ul>
                <div className='more'>
                    <Link to='/film/coming-soon'>更多即将上映电影</Link>
                </div>
            </div>
        )
    }

    componentDidMount() {
        var that = this;
        $.get('http://10.20.152.47:8080/coming-soon', function (res) {
            var datas = JSON.parse(res).data.films;
            // console.log(datas);
            that.props.change(datas);
        })
    }
}

var Upcomm = connect(
    function (state, ownProps) {
        return {
            statecomes: state.statecome
        }
    },
    {
        change: function (data) {
            return {
                type: 'CHANGE_COMING',
                statecoming: data
            }
        }
    }
)(Upcomms);

export default Upcomm;