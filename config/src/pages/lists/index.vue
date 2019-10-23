<template>
    <div class="page bg-white" style="min-height:500px;">
        <div style="padding:20px;">
            <el-row style="margin-top:10px;">
                <el-button-group>
                <el-button size="small">分类</el-button>
                <el-button type="primary" size="small">连衣裙<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="5">
                <template v-for="(item, key) in productionData">
                    <el-col :span="6" :key="key">
                    <router-link :to="'/detail?id='+item.id">
                        <el-card :body-style="{ padding: '0px' }" class="item-production">
                            <el-image :src="item.productionphoto">
                                <div slot="placeholder" class="image-slot">
                                    <img src="/static/images/loading.gif">
                                </div>
                            </el-image>
                            <div style="padding: 14px;">
                                <div class="title-production">{{item.productiontitle}}</div>
                                <div class="bottom clearfix">
                                    <div>
                                        <span class="addtime-production">{{item.addtime|timeformate('yyyy/mm/dd')}}</span>
                                        <span class="price-production">{{item.productionprice}}</span>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </router-link>
                    </el-col>
                </template>
            </el-row>
        </div>
    </div>
</template>
<script>
import {getChildCategory} from '@/utils/index'
export default {
    data () {
        return {
            currentPage:1,
            pageSize: 8,
            totalPages: 1,
            productionData: []
        }
    },
    computed: {
        scrollbottom () {
            return this.$store.state.scrolltimes
        }
    },
    mounted () {
        this.$store.commit('scrollBottonInit', 0)
    },
    methods: {
        getData () {
            let categoryid = this.$route.query.id
            let ids = getChildCategory(categoryid)
            this.axios.get('/api/production/getDataByCategoryIds', {
                params: {
                    categoryid: ids,
                    pagesize: this.pageSize,
                    currentpage: this.currentPage
                }
            }).then((data) => {
                if (data.data.code === 0) {
                    data.data.data.listdata.forEach((item) => {
                        this.productionData.push(item)
                    })
                    this.pageSize = parseInt(data.data.data.pagesize)
                    this.currentPage = parseInt(data.data.data.currentpage)
                    this.totalPages = parseInt(data.data.data.totalpages)
                } else {

                }
            }).catch((error) => {
                this.$router.push('/error')
            })
        }
    },
    watch:{
        scrollbottom: function (oldvalue, newvalue) {
            alert(this.currentPage)
            if (this.currentPage >= 1) {
                this.currentPage ++
                if (this.currentPage > this.totalPages) {
                    this.$store.state.scrolltimes = -1
                    this.currentPage = this.totalPages
                } else {
                    this.getData()
                }
            }
        },
        $route (to, from) {
            if (to.path === '/lists') {
                this.productionData = []
                this.$store.state.scrolltimes = 0
                this.getData()
            }
        }
    },
    activated (to,from, next) {
        this.productionData = []
        this.getData()
    }
}
</script>
<style scoped>
.item-production{
    margin-top:5px!important;
}
.el-image{
    height: 205px;
    overflow: hidden;
}
.el-image >>> img{
    width: 100%;
    height: auto;
}
.el-card >>> .title-production{
    height: 42px;
    overflow: hidden;
    padding-bottom: 5px;
    font-size: 14px;
}
.el-card >>> .title-production a{
    color:#333 !important;
}
.el-card >>> a:link, .el-card >>> a:visited{
    color:#333
}
.addtime-production{
    float: right;
    font-size: 14px;
}
.price-production{
    color:#f40;
}
</style>