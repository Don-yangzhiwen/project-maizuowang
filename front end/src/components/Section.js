import React, { Component } from 'react';

import { connect } from 'react-redux';

import Carousel from './Carousel.js';
import HitMovies from './HitMovies.js';
import Upcomm from './Upcomm.js';
import Scroll from './Scroll.js';

class Sections extends Component {
    render() {
        return (
            <section>
                {/* <Carousel /> */}
                <HitMovies />
                <Upcomm />
                <Scroll />
            </section>
        )
    }
    componentDidMount() {
        this.props.changeTitles("卖座电影");
    }
}




var Section = connect(
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
)(Sections);

export default Section;
