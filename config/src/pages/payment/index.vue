<template>
    <div class="page">
        <el-row class="page bg-white">
            <el-col :span="10" :offset="2">
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item :title="(key+1) + ' '+item.productiontitle + ' ￥:'+item.itemtotal" :name="key"
                   v-for="(item,key) in productionData"
                   :key="key"
                  >
                    <div class="pro-list">
                        <div class="pro-cover">
                        <img :src="item.productionphoto">
                        </div>
                        <div class="pro-info">
                            数量: {{item.productionnum}}
                            颜色: {{item.productioncolor}}
                            尺码: {{item.productionsize}}
                            <br/>
                            价格: {{item.productionprice}}
                            <br />
                            小计: {{item.itemtotal.toFixed(2)}}
                        </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-card shadow="never" class="order-pay margin-top-10">
                      <i class="el-icon-s-shop"></i> 收款方法: 麦电商城
                      <br />
                      <i class="el-icon-s-goods"></i>支付总金额: {{total}}
                      <br />
                      <i class="el-icon-s-ticket"></i>订单号: {{ordersn}} 
                      <br />
                      <el-divider></el-divider>
                      <el-button type="success">立刻支付</el-button>
                      <el-button >放弃支付</el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName:0,
            productionData: [],
            total:0.00,
            ordersn: ''
        }
    },
    mounted () {
        this.getData();
    },
    methods: {
        getData () { //提交订单
            let params = this.$store.state.orderData
            this.axios.get('/api/order/getData', {
                params:params
            }).then( (data) => {
                this.productionData = data.data.data
                this.total = data.data.total
                this.ordersn= data.data.ordersn
                console.log(data)
            })
        }
    }
}
</script>
<style scoped>
.pro-list{
    border:1px solid #eee;
    height:238px;
    overflow-y:auto;
}
.pro-list{
    border:1px solid #eee;
    height:238px;
    overflow-y:auto;
}
.el-collapse-item{
    overflow:hidden;
}
.pro-list .pro-cover{
    width:70px; height:70px;
    overflow:hidden;
    float:left;
    margin:10px;
}
.pro-list .pro-info{
    margin-top:10px;
}
.order-pay{
    line-height:50px;
    font-size:20px;
}
</style>