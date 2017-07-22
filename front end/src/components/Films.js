import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';

import ComingSoon from './ComingSoon.js';
import NowPlaying from './NowPlaying.js';
import Scroll from './Scroll.js';

class Films extends Component {
    render() {
        return (
            <Router>
                <div className='m-section'>
                    <div className='mp'>
                        <div className='mp-top'>
                            <NavLink activeClassName='highlight' to='/film/now-playing'>正在热映</NavLink>
                            <NavLink activeClassName='highlight' to='/film/coming-soon'>即将上映</NavLink>
                        </div>
                        <div className='mp-bottom'>
                            <Route path='/film/now-playing' component={NowPlaying} />
                            <Route path='/film/coming-soon' component={ComingSoon} />
                        </div>
                    </div>
                    <Scroll />
                </div>

            </Router>
        )
    }

    componentDidMount() {
        this.props.changeTitles("卖座电影");
    }

}

var Film = connect(
    function (state, ownProps) {
        return {

        }
    },
    {
        changeTitles: function (data) {
            return {
                type: "CHANGE_TITLESSSS",
                data: data
            }
        }
    }
)(Films);

export default Film;