<template>
	<div class="container-page" style="margin-left:50px;">
		<el-breadcrumb separator="/">
            <el-breadcrumb-item to="/memberinfo">会员中心</el-breadcrumb-item>
            <el-breadcrumb-item>我的信息</el-breadcrumb-item>
        </el-breadcrumb>
		<el-row>
		<!--完善信息-->
			<el-form >
				<el-form-item label="我的头像:" label-width="80px" >
					<el-upload
						v-loading.fullscreen.lock="fullscreenLoading"
						class="avatar-uploader"
						action="/api/common/UploadUserimage"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="userData.avatarUrl" :src="userData.avatarUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-row>
					<el-col :span='10'>
						<el-form-item label="我的电话:" label-width="80px" >
							<span>{{userData.telphone}}</span>
							</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='10'>
						<el-form-item label="我的昵称:" label-width="80px" >
							<el-input v-model='userData.username' v-on:blur="getuse('nickName')"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='10'>
						<el-form-item label="我的性别" prop="gender" label-width="80px" v-on:blur="getuse('gender')">
							<el-radio-group v-model="userData.gender">
									<el-radio label="0">男</el-radio>
									<el-radio label="1">女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='10'>
						<el-form-item label="我的地址:" label-width="80px" >
							<el-input v-model='city'>{{city}}</el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item style="float:right;padding-right:100px;">
						<el-button type="primary" @click="submitform">确认修改</el-button>
					</el-form-item>
				</el-row>
			</el-form>
		</el-row>
	</div>
</template>

<script>
export default {
		data(){
			return {
			    city: "",
			    fullscreenLoading: false,
				userData: this.$store.state.userInfo
			}
		},
		methods:{
				handleAvatarSuccess(res, file) {
				this.fullscreenLoading = false;
				this.userData.avatarUrl = res.data.src;
				this.getuse('avatarUrl');
				},
				beforeAvatarUpload(file) {
					this.fullscreenLoading = true;
					const isJPG = file.type === 'image/jpeg';
					const isLt2M = file.size / 1024 / 1024 < 2;

					if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
					}
					if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
					}
					return isJPG && isLt2M;
				},
				submitform(){
					this.getuse()
					this.goBack()
				},
				getuse(key){
					if (key && this['userData'][key] != '') {
						let id = this.$store.state.user.userData.id
						this.axios.post("/api/User/editUserInfo",{
						params:{
								accountid:id,
								[key]:this['userData'][key]
							}
						})
						.then((data) =>{
							if(data.data.code == 0) {
								this.$store.commit('user/updateUserInfo',{[key]: this[key]});
							}
						})
						.catch((error)=>{
							this.$alert('服务器繁忙，请稍后重试','提示');
						})
					}
				},
              goBack() {
                 this.$router.push('/member');
              },
		},
		created(){
			let use = this.$store.state.userInfo;
			this.telphone=use.telphone;
			this.nickName= use.nickName;
			this.city = use.city;
			this.gender = use.gender;
			this.imageUrl = use.avatarUrl;
			console.log(use.city)
		},
	}
</script>

<style scoped="scoped">
.el-form-item{
	margin-bottom: 5px;
	z-index: 10000000000;
}
.el-breadcrumb {
	line-height: 40px;
}
.avatar-uploader .el-upload {
border: 2px dashed #eee;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
}
.el-icon-plus {
    border:1px solid #eee;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>