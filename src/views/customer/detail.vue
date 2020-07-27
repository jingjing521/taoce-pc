<template>
	<div class="main_width" style="padding:0 20px;box-sizing: border-box;overflow: auto;">
		<div class="step">
			<el-steps :active="0">
				<el-step title="提交订单" description="2020-03-18 17:26:59"></el-step>
				<el-step title="付款成功" description=""></el-step>
				<el-step title="等待发货" description=""></el-step>
				<el-step title="商品出库" description=""></el-step>
			</el-steps>
		</div>
		
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>订单信息</span>
			</div>
			<div>
				<el-row class="box">
					<el-col :span="6">
						<div class="grid-content bg-purple">订单号</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">20200318SHWZ255418</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">下单时间</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">20200318SHWZ255418</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">订单总金额</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light color-red"> 938.00 元</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">商品金额</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light color-red"> 938.00 元</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">运费金额</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light color-red">0.00元</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">订单状态 </div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light color-red">待审核</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">配送物流方式</div>
					</el-col>
					<el-col :span="18">
						<div class="grid-content bg-purple-light">LE CAKE冷链配送</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">客户留言</div>
					</el-col>
					<el-col :span="18">
						<div class="grid-content bg-purple-light"></div>
					</el-col>
				</el-row>
			</div>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>收货信息</span>
			</div>
			<div>
				<el-row class="box">
					<el-col :span="6">
						<div class="grid-content bg-purple">收货人</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">李晶晶 <el-tag size="mini">修改</el-tag>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">邮箱</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">- <el-tag size="mini">修改</el-tag>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">手机</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">- <el-tag size="mini">修改</el-tag>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">电话</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">- <el-tag size="mini">修改</el-tag>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">标志建筑物</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">-</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">最佳送货时间</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">-</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">收货地址</div>
					</el-col>
					<el-col :span="18">
						<div class="grid-content bg-purple-light"> 上海上海市 黄浦区 南京东路830号第一百货商业中心B1 诚吃cheng chi(第一百货店) 1 <el-tag size="mini">修改</el-tag>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">收货时间</div>
					</el-col>
					<el-col :span="18">
						<div class="grid-content bg-purple-light">2020-04-17 周五 10:00:00 - 20:00:00 <el-tag size="mini">修改</el-tag>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>支付信息</span>
			</div>
			<div>
				<el-row class="box">
					<el-col :span="4">
						<div class="grid-content bg-purple">支付方式</div>
					</el-col>
					<el-col :span="4">
						<div class="grid-content bg-purple-light">微信支付</div>
					</el-col>
					<el-col :span="4">
						<div class="grid-content bg-purple">支付金额</div>
					</el-col>
					<el-col :span="4">
						<div class="grid-content bg-purple-light color-red">938.00元 </div>
					</el-col>
					<el-col :span="4">
						<div class="grid-content bg-purple">支付状态</div>
					</el-col>
					<el-col :span="4">
						<div class="grid-content bg-purple-light color-red">未支付 <el-tag size="mini">微信支付</el-tag>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>优惠信息</span>
			</div>
			<div>
			</div>
		</el-card>
		<el-card class="box-card">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="date" label="图片">
				</el-table-column>
				<el-table-column prop="name" label="商品信息">
				</el-table-column>
				<el-table-column prop="address" label="规格">
				</el-table-column>
				<el-table-column prop="address" label="成交价">
				</el-table-column>
				<el-table-column prop="address" label="优惠">
				</el-table-column>
				<el-table-column prop="address" label="数量">
				</el-table-column>
				<el-table-column prop="address" label="生日牌">
				</el-table-column>
				<el-table-column prop="address" label="是否切分">
				</el-table-column>
				<el-table-column prop="address" label="操作">
				</el-table-column>
			</el-table>
		</el-card>
		<div>
			<div class="text item">商品总金额：938.00元</div>
			<div class="text item">＋ 运费：0.00元</div>
			<div class="text item">－ 优惠券抵扣优惠：0.00元</div>
			<div class="text item">－ 其他优惠（包括订单立减）： 0.00 元</div>
			<div class="text item">－ 余额支付：0.00元</div>
			<div class="text item color-red total">订单支付金额： 938.00 元</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-03',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}]
			}
		}
	}
</script>

<style>
	.box {
		border: 1px solid #f1f1f1;
	}

	.box .el-col {
		border-right: 1px solid #f1f1f1;
		border-bottom: 1px solid #f1f1f1;
		line-height: 35px;
		padding: 0 15px;
	}

	.box .el-col:nth-child(2n+1) {
		text-align: right;

	}

	.box-card {
		margin-bottom: 10px;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
		text-align: right;
	}

	.total {
		font-size: 16px;
		font-weight: bold;
	}
	.step{
		width: 80%;
		margin: 10px auto;
	}
</style>
