import React, { Component } from 'react';

import { connect } from 'react-redux';

import $ from 'jquery';
import Swiper from 'swiper';

class Carousels extends Component {
    render() {
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        this.props.imgs.map(function (item, index) {
                            return (
                                <div className="swiper-slide" key = { index } >
                                    <a href={item.url} target='_blank'>
                                        <img src={item.imageUrl} alt={item.name} key={index}/>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    componentDidMount() {

        var that = this;
        $.get('http://10.20.152.47:8080/home', function (res) {
            var datas = JSON.parse(res).data.billboards;
            // console.log(JSON.parse(res).msg);
            that.props.change(datas);

            new Swiper('.swiper-container', {
                loop: true,
                autoplay: 5000,
                direction: 'horizontal',
                autoplayDisableOnInteraction: false
            });

        });
    }
}

var Carousel = connect(
    function (state, ownProps) {
        return {
            imgs: state.img
        }
    },
    {
        change: function (img) {
            return {
                type: "CHANGE_IMG",
                img: img
            }
        }
    }

)(Carousels);


export default Carousel;