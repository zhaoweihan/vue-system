<template>
    <div class="shoppingContainer">
        <div class="thead">
            <ul>
                <li class="allSelect">
                    <el-checkbox v-model="allChecked" @change="allCheckedHandle()">全选</el-checkbox>
                </li>
                <li class="goodsInfo">商品信息</li>
                <li>单加</li>
                <li>数量</li>
                <li>小计</li>
                <li>活动</li>
                <li>操作</li>
            </ul>
        </div>
        <div class="tbody">
            <ul class="goodsList">
                <li v-for="goods in goodsList" :key="goods.id">
                    <div class="td allSelect">
                        <el-checkbox v-model="goods.isChecked" @change="goodsCheckedHandle(goods.isChecked)"></el-checkbox>
                        <div class="imgbox">
                            <a href="javascript:;">
                                <img src="../../assets/tz.jpg" alt="商品图片">
                            </a>
                        </div>
                    </div>
                    <div class="td goodsInfo">
                        <p class="goodsName">
                            <a href="javascript:;">{{goods.goodsName}}</a>
                        </p>
                        <span class="goodsType">
                            <a href="javascript:;">{{goods.type}}
                                <i class="el-icon-arrow-down"></i>
                            </a>
                        </span>
                    </div>
                    <div class="td">
                        <p class="price">¥{{goods.price|priceFilter}}</p>
                    </div>
    
                    <div class="td">
                        <el-input-number v-model="goods.num" :min="1" :max="50" size="small"></el-input-number>
                    </div>
                    <div class="td">
                        <p class="price subtotal">¥{{goods.price*goods.num|priceFilter}}</p>
                    </div>
                    <div class="td"></div>
    
                    <div class="td">
                        <p class="operating">
                            <a href="javascript:;">移入收藏夹</a>
                        </p>
                        <p class="operating">
                            <a href="javascript:;">删除</a>
                        </p>
    
                    </div>
                </li>
            </ul>
        </div>
        <div class="placeOrderBox">
            <el-checkbox v-model="allChecked" @change="allCheckedHandle()">{{allCheckedWord}}</el-checkbox>
            <a href="javascript:;" class="leftLink">批量删除</a>
            <a href="javascript:;" class="leftLink">清空失效产品</a>
            <button class="placeOrderBtn" @click="placeOrderHandle()">下 单</button>
            <p class="countPrice">商品合计：¥{{totalPrice|priceFilter}}
                <em class="rcPlace"></em>活动优惠：-¥{{discountedPprices|priceFilter}}
                <em class="rcPlace"></em>
                <em class="yfje">应付总额：</em>
                <em class="totalPrice">¥{{actualPrice|priceFilter}}</em>
            </p>
            <p class="freePost">
                <a href="javascript::" v-if="actualPrice<8800">再购¥88.00免邮，去凑单&gt;</a>
                <a href="javascript::" v-if="actualPrice>=8800">已免邮&gt;</a>
            </p>
        </div>
    </div>
</template>
<script>
import { servers } from '@/api'
import store from '@/store'
export default {
    data() {
        return {
            allChecked: false,// 是否全选
            discountedPprices: 1000,//优惠价格
            goodsList: [{
                id: 1,
                goodsName: "黑凤梨 20寸PC膜拉链登机箱",
                type: "钢琴白",
                price: 22800,
                num: 2,
                isChecked: false,
                active: ""
            }, {
                id: 2,
                goodsName: "日式和风声波式电动牙刷",
                type: "静雅黑机身+一个刷头",
                price: 12900,
                num: 1,
                isChecked: true,
                active: ""
            }, {
                id: 3,
                goodsName: "2件装 海洋水彩汤盘 20.3cm",
                type: "2只装",
                price: 5948,
                num: 5,
                isChecked: true,
                active: ""
            }]
        }
    },
    methods: {
        setBreadCrumbs() {
            var list = [{
                name: '购物',
                url: null,
            }, {
                name: '购物车',
                url: null
            }]
            store.commit('defineBreadCrumbs', list)
        },
        // 下单
        placeOrderHandle() {
            this.$message('下单了');
        },
        // 全选
        allCheckedHandle() {
            this.goodsList.forEach((ele) => {
                if (this.allChecked) {
                    ele.isChecked = true;
                } else {
                    ele.isChecked = false;
                }
            })
        },
        //商品列表勾选
        goodsCheckedHandle(ic) {
            if (ic) {
                this.allChecked = this.goodsList.every((element) => {
                    return element.isChecked
                }, this);
            } else {
                this.allChecked = false;
            }
        }
    },
    computed: {
        totalPrice() {
            var total = 0;
            this.goodsList.forEach((element) => {
                if (element.isChecked) {
                    total += element.price * element.num;
                }
            }, this);
            return total;
        },
        actualPrice() {
            var actualPrice = 0;
            if (this.totalPrice > this.discountedPprices) {
                actualPrice = this.totalPrice - this.discountedPprices;
            }
            return actualPrice;
        },
        allCheckedWord(){
            var word="全选";
            var totalNum=0;
            if(!this.allChecked){
                this.goodsList.forEach((ele)=>{
                    if(ele.isChecked){
                        totalNum+=ele.num;
                    }
                });
                if(totalNum){
                    word="已选( "+totalNum+" )";
                }else{
                   word="全选"; 
                }
                
            }
            return word
        }
    },
    created() {
        this.setBreadCrumbs()
    },
    filters: {
        priceFilter(val) {
            return (val / 100).toFixed(2);
        }
    }
}
</script>
<style lang="scss">
@import '../../sass/shoppingCart';
</style>


