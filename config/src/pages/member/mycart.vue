<template>
    <div class="container-page">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/member">会员中心</el-breadcrumb-item>
        <el-breadcrumb-item>我的购物车</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
            :data="this.$store.state.cartData"
            border
            show-summary
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="图片">
            <template slot-scope="scope">
                <div style="width:50px; height:50px; overflow:hidden;">
                    <img :src="scope.row.productionphoto" width="100%">
                </div>
            </template>
            </el-table-column>
            <el-table-column
            prop="productiontitle"
            label="产品名称">
            </el-table-column>
            <el-table-column
            prop="productioncolor"
            label="颜色">
            </el-table-column>
            <el-table-column
            prop="productionsize"
            label="尺码">
            </el-table-column>
            <el-table-column
            prop="productionprice"
            sortable
            label="价格">
            </el-table-column>
            <el-table-column
            prop="productionnum"
            sortable
            label="价格">
            </el-table-column>
            <el-table-column
            prop="productionprice"
            sortable
            label="小计">
            <template slot-scope="scope">
                {{scope.row.productionprice * scope.row.productionnum}}
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    }
}
</script>
<style scoped>
.container-page{
    padding-bottom: 20px;
}
.container-page >>> .el-breadcrumb{
    height: 50px;
    line-height: 50px;
}
</style>
