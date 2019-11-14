<template>
    <div class="goodsDetail">
        {{groupList}}
        <ul class="skuList">
            <li v-for="(gr,key,i) in groupList" :key="i">
                <span>{{key|keyFilter}}：</span>
                <button type="button" class="skuBtn" @click="selectSku(key,item,i,index)" :class="{'on':item.isChecked}" v-for="(item,index) in gr" :key="index">{{item.val}}</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      groupList: {
        color: ['红', '白', '蓝'],
        size: ['大', '中', '小'],
        model: ['A', 'B', 'C']
      },
      skuList: [{
        color: '红',
        size: '大',
        model: 'A',
        skuId: '3158054'
      }, {
        color: '白',
        size: '中',
        model: 'B',
        skuId: '3133859'
      }, {
        color: '蓝',
        size: '小',
        model: 'C',
        skuId: '3516833'
      }, {
        color: '蓝',
        size: '大',
        model: 'B',
        skuId: '3516816'
      }]
    }
  },
  methods: {
    isDisabled (key, val) {
      return !this.skuList.some((element) => {
        return element[key] === val
      })
    },
    selectSku (key, item, i, index) {
      this.groupList.color[0].isChecked = true
      // if (item.isChecked) {//取消选择
      //     // this.groupList[key][index].isChecked = false;
      //     item.isChecked = false;
      // } else {//选中
      //     // this.groupList[key][index].isChecked = true;
      //     item.isChecked = true;
      // }
    }
  },
  created () {
    for (let keys in this.groupList) {
      this.groupList[keys].forEach((element, index) => {
        this.groupList[keys][index] = {
          val: element,
          isChecked: false
        }
      })
    }
  },
  filters: {
    keyFilter (val) {
      var resultVal = ''
      if (val === 'color') {
        resultVal = '颜色'
      } else if (val === 'size') {
        resultVal = '尺码'
      } else if (val === 'model') {
        resultVal = '型号'
      }
      return resultVal
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../sass/common';
.goodsDetail {
    margin: 50px;
    .skuList {
        li {
            margin: 15px 0;
            span {
                display: inline-block;
                width: 50px;
            }
            .skuBtn {
                padding: 4px 20px;
                background: #fff;
                color: #666;
                border: 2px solid #ccc;
                margin: 0 5px;
                cursor: pointer;
                &.on {
                    border: 2px solid #c81623;
                }
            }
        }
    }
}
</style>
