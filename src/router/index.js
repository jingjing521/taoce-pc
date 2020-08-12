import Vue from 'vue'
import Router from 'vue-router'
import Common from '@/views/index/common'
import Main from '@/views/customer/main' // 个人中心的公共头部
import user from '@/views/template/user-top.vue'
Vue.use(Router)

export default new Router({ 
  routes: [
    { path: '/', name: 'Index', component: Common,
      children: [
        // 首页
        { path: '/', component: () => import('@/views/index/index'), name: 'IndexMain'},
        // 新闻中心
        { path: '/news', name: 'News', component: () => import('@/views/news/index') },
        { path: '/news-detail', name: 'NewsDetail', component: () => import('@/views/news/news-detail')},
        // 问答集锦
        { path: '/answer',name: 'Answer',component: () => import('@/views/index/answer')},
        { path: '/ask-detail', name: 'AskDetail', component: () => import('@/views/news/ask-detail')},
        // 检测知识
        { path: '/test-knowledge', name: 'test-knowledge', component: () => import('@/views/index/test-knowledge')},
        { path: '/test-knowledge-detail',name: 'test-knowledge-detail',component: () => import('@/views/index/test-knowledge-detail')},
        //机构展示
        { path: '/institution', name: 'Institution', component: () => import('@/views/institution/index')},
        { path: '/server', name: 'Server', component: () => import('@/views/product/server')},
        // 查询
        { path: '/reportFind', name: 'ReportFind', component: () => import('@/views/index/reportFind')},
				// 证书查询  
				{ path: '/certificateFind', name: 'CertificateFind', component: () => import('@/views/index/certificateFind')},
				// 标准查询
        { path: '/standardFind', name: 'StandardFind', component: () => import('@/views/index/standardFind')},
        // 产品分类
        { path: '/product', name: 'Product', component: () => import('@/views/product/index')},
        // 商品详情
        { path: '/productDetail', name: 'ProductDetail', component: () => import('@/views/product/detail')},
        { path: '/potal', name: 'Potal', component: () => import('@/views/sort/potal') },
        { path: '/sort', name: 'Sort', component: () => import('@/views/sort/index') },
      ]
    },



    {
			path: '/step',
			name: 'user',
			component: user,
			children:[ 
				{
					path: '/step',
					name: 'Step',
					component: () => import('@/views/product/step')
				},
				{
					path: '/step1',
					name: 'Step1',
					component: () => import('@/views/product/step1')
				},
				{
					path: '/enter-step',
					name: 'Enter',
					component: () => import('@/views/institution/enter-step')
				},
				{
					path: '/addOrder',
					name: 'Order',
					component: () => import('@/views/order/addOrder')
				},
				{
					path: '/addOrder2',
					name: 'Order',
					component: () => import('@/views/order/addOrder2')
				}
			]
		},





    

    /**
     * 登录/注册/忘记密码
     */
    { path: '/login', name: 'Login', component: () => import('@/views/login/login') },
    { path: '/register', name: 'Register', component: () => import('@/views/login/register') },
    { path: '/forgetPass', name: 'ForgetPass', component: () => import('@/views/login/forgetPass')},
    { path: '/shopJoinApply', name: 'ShopJoinApply', component: () => import('@/views/shop/shopJoinApply')},
    // 单页管理
    { path: '/agreement', name: 'Agreement', component: () => import('@/views/product/agreement')},
    // 个人中心
    {
      path: '/customer', name: 'Customer',component: Main,
      children: [
        // 个人中心 主页
        { path: '/customer', name: 'Customer', component: () => import('@/views/customer/customer')},
        // 我的订单
        { path: '/order', name: 'Order', component: () => import('@/views/customer/order') },
        { path: '/orderDetail', name: 'OrderDetail', component: () => import('@/views/customer/order-detail') },
        { path: '/otherDetail', name: 'OtherDetail', component: () => import('@/views/customer/other-detail') },
        {  path: '/orderPay',  name: 'OrderPay', component: () => import('@/views/customer/order-pay') },
        { path: '/payGateWay', name: 'PayGateWay', component: () => import('@/views/customer/payGateWay') },
        // 我的钱包
        { path: '/wallet', name: 'Wallet', component: () => import('@/views/customer/wallet')},
        { path: '/rechargeDetail', name: 'RechargeDetail', component: () => import('@/views/customer/rechargeDetail') },
        { path: '/recharge', name: 'Recharge', component: () => import('@/views/customer/recharge')},
        // 用户信息
        { path: '/userInfo', component: () => import('@/views/customer/userInfo'), name: 'userInfo'}, 
        // 用户认证
        { path: '/authentication', name: 'Authentication', component: () => import('@/views/customer/authentication/index')},
        { path: '/personal', name: 'Personal', component: () => import('@/views/customer/authentication/personal')},
        { path: '/enterprise', name: 'Enterprise', component: () => import('@/views/customer/authentication/enterprise')},
        { path: '/enterpriseList', name: 'EnterpriseList', component: () => import('@/views/customer/authentication/enterpriseList')},
        // 地址库
        { path: '/address', component: () => import('@/views/customer/address'), name: 'Address' },
        // 发票薄
        { path: '/invoice', name: 'Invoice', component: () => import('@/views/customer/invoice')},
        // 修改密码
        { path: '/updatePwd', name: 'UpdatePwd', component: () => import('@/views/customer/UpdatePwd') },
        // 我的消息
        { path: '/message', name: 'Message', component: () => import('@/views/customer/message')},
        // 买家大数据
        { path: '/buydata', name: 'Buydata', component: () => import('@/views/customer/buydata') },
        // 意见反馈
        { path: '/feedback', name: 'Feedback', component: () => import('@/views/customer/feedback')},
        // 我的收藏
        { path: '/collection', name: 'Collection', component: () => import('@/views/customer/collection')}
      ]
    }

  ],
  scrollBehavior: () => ({
    y: 0
  })
})
