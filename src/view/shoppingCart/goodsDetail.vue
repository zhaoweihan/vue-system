<template>
    <div class="goodsDetail">

    </div>
</template>
<script>
export default {
  data () {
    return {
      commoditySpecs: [
        { title: '颜色', list: [ '红色', '紫色', '白色', '黑色' ] },
        { title: '套餐', list: [ '套餐一', '套餐二', '套餐三', '套餐四' ] },
        { title: '内存', list: [ '64G', '128G', '256G' ] }
      ],
      skuList: [
        { id: '1', specs: [ '紫色', '套餐一', '64G' ] },
        { id: '2', specs: [ '紫色', '套餐一', '128G' ] },
        { id: '3', specs: [ '紫色', '套餐二', '128G' ] },
        { id: '4', specs: [ '黑色', '套餐三', '256G' ] }
      ]
    }
  },
  created () {},
  methods: { }
}
</script>
<style lang="scss" scoped>
@import '../../sass/common';
.goodsDetail {
    margin: 50px;
}
</style>
