<template>
	<div class="container-page">
		<el-breadcrumb separator="/">
        <el-breadcrumb-item to="/member">会员中心</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
        </el-breadcrumb>
		<el-row>
			<el-form :rules="rules" :model="form" ref="edit" label-width="90px">
				<el-row>
					<el-form-item label="用户姓名:">
						<span>{{userData.username}}</span>
					</el-form-item>
					<el-form-item label="用户电话:">
						<span>{{userData.telphone}}</span>
					</el-form-item>
					<el-form-item label="新密码:"  prop="password" >
						<el-input type="password" v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码:" prop="repassword">
						<el-input type="password" v-model="form.repassword"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="editPassword">确认</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-row>   
			</el-form>
		</el-row>
	</div>
</template>

<script>
export default {
	// name: 'Userinfo',
	data(){
		return {
			fullscreenLoading: false,
			userData: this.$store.state.userInfo,
			form: {
				password: '',
				repassword: ''
			},
			rules: {
				password: [
					{required: true, message: '请输入新密码', trigger: 'blur'},
					{min: 5, max: 20, message: '密码长度在 5 到 20个字符', trigger: 'blur'}
				],
				repassword: [
					{required: true, message: '请输入密码', trigger: 'blur'},
					{validate(rules, value, callback) {
						if (value != this.form.password) {
							callback(new Error('确认密码不正确'))
						}
					},
					trigger: 'blur'
					}
				]
			}
		}
	},
	methods:{
		editPassword () {  
			this.$refs.edit.validate((status) => {
				if (status) {
					this.axios.post('/api/user/edit', {
						params: {
							id: this.userData.id,
							username: this.userData.username,
							telphone: this.userData.telphone,
							authority: this.userData.authority,
							password: this.form.password
						}
					}).then((data) => {
						if (data.data.code == 0) {
							this.$alert('修改成功', '提示')
							this.$router.go(-1)
						} else {
							this.$alert(data.data.msg, '提示')
						}
					}).catch((error) => {
						this.$alert('网络错误请稍后重试', '提示')
					})
				}
			})
		}
	}
}
</script>

<style scoped="scoped">
	.form{
		margin: 0px auto;
	}
	.avatar-uploader .el-upload {
    border: 1px dashed #eee;
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
  	.el-page-header{
  	    height:50px;
  	    line-height:50px;
  	    border-bottom:1px solid #eee;
  	    padding-left:20px;
  	    margin-bottom:10px;
  	}
</style>
