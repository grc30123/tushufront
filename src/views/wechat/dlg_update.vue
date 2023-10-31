<template>
  <div class="app-container">
    <el-dialog
      ref="dlg"
      :title="dlgTitle"
      :visible.sync="dialogFormVisible"
      width="400px"
      top="5vh"
      :close-on-click-modal="false"
    >
      <el-form
        v-if="!paystate"
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="100px"
        size="small"
        style="width: 100%; margin-left:5px;"
      >
        <el-form-item label="商品价格">
          <span class="priceValue">{{ temp.price }}元</span>
        </el-form-item>
        <el-form-item label="微信扫码支付">
          <div id="qrcode" style="width: 150px;display: inline-block;" />
        </el-form-item>
      </el-form>
      <div v-if="paystate">
        <div class="payOK">
          支付成功。
        </div>
        <div class="payContent">
          我们将及时为您发货。
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button :disabled="paystate" @click="Cancel">稍后付款</el-button>
        <el-button type="primary" @click="Cancel">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2' // 二维码生成器
import $ from 'jquery'
import { getNativePay, judgePayState } from '@/api/wechat'

export default {
  components: {},
  data() {
    return {
      dlgTitle: '购买支付',
      temp: {
        price: 3,
        paynote: '图书购买'
      },
      payurl: '',
      payid: 0,
      paystate: false,
      disabledValue: false,
      timer: null,
      dialogFormVisible: false,
      rules: {

      }
    }
  },
  methods: {
    OpenDialog(price) {
      this.dialogFormVisible = true
      this.temp.price = price
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
      this.makeQRCode() // 生成支付码
      this.timer = setInterval(() => {
        if (this.paystate === false) {
          this.onJudge()
        } else {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 5000)
    },
    onJudge() {
      judgePayState({ payid: this.payid }).then(rsp => {
        if (rsp.data.code === 0) {
          this.paystate = true
        } else {
          this.paystate = false
        }
      })
    },
    Cancel() {
      this.gwselectValue = []
      clearInterval(this.timer)
      this.timer = null
      this.dialogFormVisible = false
    },
    makeQRCode() {
      this.onResetQRCode()
      const data = this.temp
      console.log(data)
      getNativePay(data).then(r => {
        console.log(r)
        if (r.data.code === 0) {
          this.payurl = r.data.data.payurl
          this.payid = r.data.data.payid
          setTimeout(() => {
            new QRCode('qrcode', {
              width: 150,
              height: 150,
              text: this.payurl
            })
          }, 150)
        } else {
          this.$message.error(r.msg)
        }
      }, error => {
        return error
      })
    },
    onResetQRCode() {
      $('#qrcode').html('')
    }
  }
}
</script>

<style scoped>
.priceValue {
  font-size: 16px;
  color:red;
  font-weight: bold;
}
.payOK {
  margin: 20px;
  line-height: 30px;
  font-size: 16px;
  color:green;
  font-weight: bold;
}
.payContent {
  margin: 20px;
  line-height: 30px;
  font-size: 16px;
}
</style>
