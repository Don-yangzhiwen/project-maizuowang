import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

class Detailss extends Component {
    render() {
        // console.log(this.props.details);
        if (this.props.details != '') {
            return (
                <div className='details'>
                    <div className='de-top'>
                        <img src={this.props.details.cover.origin} alt="" />
                    </div>
                    <div className='de-section'>
                        <h2>影片简介</h2>
                        <div className='des-dir'>
                            <span>导&nbsp;&nbsp;&nbsp;&nbsp;演 : </span>
                            <span>{this.props.details.director}</span>
                        </div>
                        <div className='des-ts'>
                            <span>主&nbsp;&nbsp;&nbsp;&nbsp;演 : </span>
                            <span>
                                {
                                    this.props.details.actors.map(function (item, index) {
                                        return item.name + ' | ';
                                    })
                                }
                            </span>
                        </div>
                        <div className='des-la'>
                            <span>地区语言 : </span>
                            <span>{this.props.details.nation}</span>
                            <span>(</span>
                            <span>{this.props.details.language}</span>
                            <span>)</span>
                        </div>
                        <div className='des-lex'>
                            <span>类&nbsp;&nbsp;&nbsp;&nbsp;型 : </span>
                            <span>{this.props.details.category}</span>
                        </div>
                        <div className='des-shyi'>
                            <span>上映日期 : </span>
                            <span>7月19日上映</span>
                        </div>
                        <div className='des-syn'>{this.props.details.synopsis}</div>
                    </div>
                    <div className='de-fl'>立即购票</div>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    componentDidMount() {
        var that = this;
        // console.log(this.props);
        // console.log(this.props.match.params.id);
        var id = this.props.match.params.id;
        $.get('http://10.20.152.47:8080/details?id=' + id, function (res) {
            var data = JSON.parse(res).data.film;
            // console.log(data.name);

            that.props.change(data);
            that.props.changeTitles(data.name);
        })
    }
}

var Details = connect(
    function (state, ownProps) {
        return {
            details: state.detail
        }
    },
    {
        change: function (res) {
            return {
                type: 'CHANGE_DETAILS',
                detail: res
            }
        },
        changeTitles: function (data) {
            return {
                type: "CHANGE_TITLESSSS",
                data: data
            }
        }

    }
)(Detailss);

export default Details;