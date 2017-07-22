import { createStore } from 'redux';
import reducer from './reducer.js';

var state = {
    img: [],
    statenow: [],
    statecome: [],
    filmnow: [],
    filmcoming: [],
    cinema: [],
    detail: [],
    txt: '',
    title: '卖座电影',
    // 个人用户界面初始
    user: [
        {
            iconfont:'yingpiaodingdan',
            title:'影票订单',
            span1:'0',
            span2:'张',
            color:'#7bcdcc'

        },{
            iconfont:'yingpiaoxiaofeidingdan',
            title:'影票待付订单',
            span1:'0',
            span2:'张',
            color:'#bbcea5'
        },{
            iconfont:'shangchengdingdan',
            title:'商城订单',
            span1:'',
            span2:'',
            color:'#95c0ea'
        },{
            iconfont:'yanchudingdan',
            title:'演出订单',
            span1:'',
            span2:'',
            color:'#67a5e1'
        },{
            iconfont:'cashcoupon',
            title:'我的现金券',
            span1:'0',
            span2:'张',
            color:'#ffb978'
        },{
            iconfont:'zhanghuyue',
            title:'账户余额',
            span1:'0',
            span2:'元',
            color:'#faa0b5'
        },{
            iconfont:'card',
            title:'我的买座卡',
            span1:'0',
            span2:'张',
            color:'#80dae6'
        },{
            iconfont:'shezhi',
            title:'设置',
            span1:'',
            span2:'',
            color:'#a4c9e5'
        }
    ],
    username:'',
    titless:"卖座电影"

}

var store = createStore(reducer, state);

export default store;