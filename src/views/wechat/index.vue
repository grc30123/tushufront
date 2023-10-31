<template>
  <div style="margin:20px; padding:10px">
    <div style="margin:20px; margin-buttom:30px">
      <el-divider content-position="left" />
    </div>
    <div>
      <el-row style="width:1000px; margin-left:20px; margin-bottom:40px;">
        <el-col :span="10">
          <el-card class="box-card card">
            <div slot="header" class="clearfix">
              <span class="proTitle">图书</span>
              <el-button style="float: right; padding: 3px 0" type="text" :loading="Loading" @click="onPay(temp.price)">立即购买</el-button>
            </div>
            <div>
              <div class="text item">
<!--                <el-row class="rowContent">-->
<!--                  <div class="proContent">-->
<!--                    好商品，错过不再有。-->
<!--                  </div>-->
<!--                </el-row>-->
                <el-row>
                  <div>
                    <span class="priceTitle">原价40元，现价</span><span class="priceValue">{{ temp.price }}元</span>
                  </div>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <dlg-edit ref="dlgedit" />
  </div>
</template>

<script>
import dlgEdit from './dlg_update'

export default {
  components: {
    dlgEdit
  },
  data() {
    return {
      Loading: false,
      temp: {
        price: 0.01
      }
    }
  },
  created() {

  },
  methods: {
    onPay(price) {
      this.$refs['dlgedit'].OpenDialog(price)
    }
  }
}
</script>

<style scoped>
.card {
  width: 400px
}
.proTitle {
  font-size: 20px;
  color:blue;
  font-weight: bold;
}
.rowContent {
  height:70px;
  line-height: 30px;
  font-size: 15px;
}
.proContent {
  line-height: 30px;
  font-size: 18px;
}
.priceTitle {
  line-height: 40px;
  font-size: 22px;
}
.priceValue {
  line-height: 40px;
  font-size: 36px;
  color:red;
  font-weight: bold;
}
</style>

