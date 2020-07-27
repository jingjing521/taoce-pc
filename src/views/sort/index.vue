<template>
  <div class="max_width">
    <div class="main_width">
      <div class="el-card box-card is-hover-shadow">
        <div class="el-card__header">
          <div class="clearfix">
            <span class="header-title">
              所选条件
              <i class="el-icon-arrow-right"></i>
            </span>
            <span class="el-tag el-tag--small el-tag--light">
              酒类 <i class="el-tag__close el-icon-close"></i>
            </span>
            <button type="button" class="el-button el-button--default el-button--mini" style="float:right;" >
              <i class="el-icon-caret-top"></i>
              <span>收起筛选</span>
            </button>
          </div>
        </div>
        <div class="el-card__body" style="display:block;">
          <div class="filter">
            <div class="el-row">
              <div class="filter-title el-col el-col-2">分类</div>
              <div class="filter-default el-col el-col-1">
                <a href="javascript:;" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">全部</span>
                  <!---->
                </a>
              </div>
              <div class="filter-select el-col el-col-21">
                <a
                  href="/org?kind=%25E9%25A3%259F%25E5%2593%2581%25E5%258F%258A%25E5%2586%259C%25E4%25BA%25A7%25E5%2593%2581&amp;code=00"
                  class="nuxt-link-active el-link el-link--default on"
                >
                  <span class="el-link--inner">食品及农产品</span>
                </a>
                <a
                  href="/org?kind=%25E5%25BB%25BA%25E6%259D%2590%25E5%25AE%25B6%25E5%25B1%2585&amp;code=01"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">建材家居</span>
                </a>
                <a
                  href="/org?kind=%25E6%259C%25BA%25E6%25A2%25B0%25E8%25AE%25BE%25E5%25A4%2587&amp;code=02"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">机械设备</span>
                </a>
                <a
                  href="/org?kind=%25E7%2594%259F%25E6%25B4%25BB%25E7%2594%25A8%25E5%2593%2581&amp;code=03"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">生活用品</span>
                </a>
                <a
                  href="/org?kind=%25E6%2596%2587%25E6%2595%2599%25E5%25A8%25B1%25E4%25B9%2590&amp;code=04"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">文教娱乐</span>
                </a>
                <a
                  href="/org?kind=%25E5%2586%259C%25E4%25B8%259A%25E7%259B%25B8%25E5%2585%25B3&amp;code=05"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">农业相关</span>
                </a>
                <a
                  href="/org?kind=%25E7%259A%25AE%25E9%259D%25A9%25E5%258F%258A%25E7%25BA%25BA%25E7%25BB%2587%25E5%2593%2581&amp;code=06"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">皮革及纺织品</span>
                </a>
                <a
                  href="/org?kind=%25E5%25B7%25A5%25E4%25B8%259A%25E4%25BA%25A7%25E5%2593%2581&amp;code=07"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">工业产品</span>
                </a>
                <a
                  href="/org?kind=%25E8%25AE%25A4%25E8%25AF%2581%25E9%2589%25B4%25E5%25AE%259A&amp;code=08"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">认证鉴定</span>
                </a>
                <a
                  href="/org?kind=%25E7%2594%25B5%25E5%25AD%2590%25E7%2594%25B5%25E5%2599%25A8&amp;code=10"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">电子电器</span>
                </a>
                <a
                  href="/org?kind=%25E5%258C%25BB%25E8%258D%25AF%25E5%258C%25BB%25E7%2596%2597&amp;code=11"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">医药医疗</span>
                </a>
                <a
                  href="/org?kind=%25E7%258E%25AF%25E5%25A2%2583%25E4%25B8%258E%25E7%258E%25AF%25E4%25BF%259D&amp;code=12"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">环境与环保</span>
                </a>
                <a
                  href="/org?kind=%25E8%25AE%25A1%25E9%2587%258F%25E5%2599%25A8%25E5%2585%25B7&amp;code=13"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">计量器具</span>
                </a>
                <a
                  href="/org?kind=%25E5%2585%25B6%25E4%25BB%2596%25E7%25B1%25BB%25E5%2588%25AB&amp;code=09"
                  class="nuxt-link-active el-link el-link--default"
                >
                  <span class="el-link--inner">其他类别</span>
                </a>
              </div>
            </div>
            <div class="el-row">
              <div class="el-col el-col-3">&nbsp;</div>
              <div class="el-col el-col-21">
                <div class="el-card filter-class-sub is-never-shadow">
                  <!---->
                  <div class="el-card__body">
                    <div class="el-row">
                      <div class="filter-default el-col el-col-1.8">
                        <a href="javascript:;" class="el-link el-link--default">
                          <!---->
                          <span class="el-link--inner">全部</span>
                          <!---->
                        </a>
                      </div>
                      <div class="filter-select el-col el-col-22">
                        <a
                          href="/org?kind=%25E9%2585%2592%25E7%25B1%25BB&amp;code=0000"
                          class="nuxt-link-exact-active nuxt-link-active el-link el-link--default on"
                        >
                          <span class="el-link--inner">酒类</span>
                        </a>
                        <a
                          href="/org?kind=%25E9%25A5%25AE%25E6%2596%2599&amp;code=0001"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">饮料</span>
                        </a>
                        <a
                          href="/org?kind=%25E7%25B1%25B3%25E9%259D%25A2%25E7%25B2%25AE%25E6%25B2%25B9&amp;code=0002"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">米面粮油</span>
                        </a>
                        <a
                          href="/org?kind=%25E8%25B0%2583%25E5%2591%25B3%25E5%2593%2581&amp;code=0003"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">调味品</span>
                        </a>
                        <a
                          href="/org?kind=%25E6%2596%25B9%25E4%25BE%25BF%25E9%2580%259F%25E9%25A3%259F&amp;code=0004"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">方便速食</span>
                        </a>
                        <a
                          href="/org?kind=%25E9%25A3%259F%25E7%2594%25A8%25E5%2586%259C%25E4%25BA%25A7%25E5%2593%2581&amp;code=0005"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">食用农产品</span>
                        </a>
                        <a
                          href="/org?kind=%25E9%2580%259F%25E5%2586%25BB%25E9%25A3%259F%25E5%2593%2581&amp;code=0006"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">速冻食品</span>
                        </a>
                        <a
                          href="/org?kind=%25E7%2589%25B9%25E6%25AE%258A%25E9%25A3%259F%25E5%2593%2581&amp;code=0007"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">特殊食品</span>
                        </a>
                        <a
                          href="/org?kind=%25E9%25A3%259F%25E5%2593%2581%25E7%259B%25B8%25E5%2585%25B3&amp;code=0008"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">食品相关</span>
                        </a>
                        <a
                          href="/org?kind=%25E5%2585%25B6%25E4%25BB%2596%25E9%25A3%259F%25E5%2593%2581&amp;code=0009"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">其他食品</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="el-row">
              <div class="el-col el-col-3">&nbsp;</div>
              <div class="el-col el-col-21">
                <div class="el-card filter-class-sub is-never-shadow">
                  <!---->
                  <div class="el-card__body">
                    <div class="el-row">
                      <div class="filter-default el-col el-col-1.8">
                        <a href="javascript:;" class="el-link el-link--default on">
                          <!---->
                          <span class="el-link--inner">全部</span>
                          <!---->
                        </a>
                      </div>
                      <div class="filter-select el-col el-col-22">
                        <a
                          href="/org?kind=%25E7%2599%25BD%25E9%2585%2592&amp;code=000000"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">白酒</span>
                        </a>
                        <a
                          href="/org?kind=%25E5%2595%25A4%25E9%2585%2592&amp;code=000001"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">啤酒</span>
                        </a>
                        <a
                          href="/org?kind=%25E8%2591%25A1%25E8%2590%2584%25E9%2585%2592&amp;code=000002"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">葡萄酒</span>
                        </a>
                        <a
                          href="/org?kind=%25E9%25BB%2584%25E9%2585%2592&amp;code=000003"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">黄酒</span>
                        </a>
                        <a
                          href="/org?kind=%25E9%2585%258D%25E5%2588%25B6%25E9%2585%2592&amp;code=000004"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">配制酒</span>
                        </a>
                        <a
                          href="/org?kind=%25E5%2585%25B6%25E4%25BB%2596%25E8%2592%25B8%25E9%25A6%258F%25E9%2585%2592&amp;code=000005"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">其他蒸馏酒</span>
                        </a>
                        <a
                          href="/org?kind=%25E6%259E%259C%25E9%2585%2592%25EF%25BC%2588%25E5%258F%2591%25E9%2585%25B5%25E5%259E%258B%25EF%25BC%2589%25E5%258F%258A%25E5%2585%25B6%25E4%25BB%2596%25E5%258F%2591%25E9%2585%25B5%25E9%2585%2592%2520&amp;code=000006"
                          class="nuxt-link-active el-link el-link--default"
                        >
                          <span class="el-link--inner">果酒（发酵型）及其他发酵酒</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="el-divider el-divider--horizontal">
              <!---->
            </div>
            <div class="el-row">
              <div class="filter-title el-col el-col-2">相关标准</div>
              <div class="filter-default el-col el-col-1">
                <a href="javascript:;" class="el-link el-link--default on">
                  <!---->
                  <span class="el-link--inner">全部</span>
                  <!---->
                </a>
              </div>
              <div class="filter-select el-col el-col-21">
                <a href="javascript:;" title="GB 5009.35-2016" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">GB 5009.35-2016</span>
                  <!---->
                </a>
                <a href="javascript:;" title="GB/T 10345-2007" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">GB/T 10345-2007</span>
                  <!---->
                </a>
                <a href="javascript:;" title="GB/T 394.2-2008" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">GB/T 394.2-2008</span>
                  <!---->
                </a>
                <a href="javascript:;" title="GB 5009.266-2016" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">GB 5009.266-2016</span>
                  <!---->
                </a>
                <a href="javascript:;" title="GB/T 15038-2006" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">GB/T 15038-2006</span>
                  <!---->
                </a>
                <a href="javascript:;" title="GB/T 16289-2018" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">GB/T 16289-2018</span>
                  <!---->
                </a>
                <a href="javascript:;" title="GB 23200.14-2016" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">GB 23200.14-2016</span>
                  <!---->
                </a>
                <a href="javascript:;" title="GB/T 23547-2009" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">GB/T 23547-2009</span>
                  <!---->
                </a>
                <a href="javascript:;" title="GB/T 19508-2007" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">GB/T 19508-2007</span>
                  <!---->
                </a>
                <a href="javascript:;" title="GB/T 19327-2007" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">GB/T 19327-2007</span>
                  <!---->
                </a>
                <div
                  class="filter-input el-input el-input--mini el-input-group el-input-group--append"
                >
                  <!---->
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="请输入标准"
                    maxlength="30"
                    class="el-input__inner"
                  >
                  <!---->
                  <!---->
                  <div class="el-input-group__append">
                    <button type="button" class="el-button el-button--default el-button--mini">
                      <!---->
                      <i class="el-icon-search"></i>
                      <!---->
                    </button>
                  </div>
                  <!---->
                </div>
              </div>
            </div>
            <div class="el-divider el-divider--horizontal">
              <!---->
            </div>
            <div class="el-row">
              <div class="filter-title el-col el-col-2">相关指标</div>
              <div class="filter-default el-col el-col-1">
                <a href="javascript:;" class="el-link el-link--default on">
                  <!---->
                  <span class="el-link--inner">全部</span>
                  <!---->
                </a>
              </div>
              <div class="filter-select el-col el-col-21">
                <a href="javascript:;" title="2-甲基咪唑" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">2-甲基咪唑</span>
                  <!---->
                </a>
                <a href="javascript:;" title="氨基甲酸乙酯" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">氨基甲酸乙酯</span>
                  <!---->
                </a>
                <a href="javascript:;" title="尿素" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">尿素</span>
                  <!---->
                </a>
                <a href="javascript:;" title="锶（Sr）" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">锶（Sr）</span>
                  <!---->
                </a>
                <a href="javascript:;" title="钙（Ca）" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">钙（Ca）</span>
                  <!---->
                </a>
                <a href="javascript:;" title="5-羟甲基糠醛" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">5-羟甲基糠醛</span>
                  <!---->
                </a>
                <a href="javascript:;" title="柠檬酸" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">柠檬酸</span>
                  <!---->
                </a>
                <a href="javascript:;" title="脲酶定性" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">脲酶定性</span>
                  <!---->
                </a>
                <a href="javascript:;" title="铁（Fe）" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">铁（Fe）</span>
                  <!---->
                </a>
                <a href="javascript:;" title="锌（Zn）" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">锌（Zn）</span>
                  <!---->
                </a>
                <div
                  class="filter-input el-input el-input--mini el-input-group el-input-group--append"
                >
                  <!---->
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="请输入指标项"
                    maxlength="30"
                    class="el-input__inner"
                  >
                  <!---->
                  <!---->
                  <div class="el-input-group__append">
                    <button type="button" class="el-button el-button--default el-button--mini">
                      <!---->
                      <i class="el-icon-search"></i>
                      <!---->
                    </button>
                  </div>
                  <!---->
                </div>
              </div>
            </div>
            <div class="el-divider el-divider--horizontal">
              <!---->
            </div>
            <div class="el-row">
              <div class="filter-title el-col el-col-2">检验资质</div>
              <div class="filter-default el-col el-col-1">
                <a href="javascript:;" class="el-link el-link--default on">
                  <!---->
                  <span class="el-link--inner">全部</span>
                  <!---->
                </a>
              </div>
              <div class="filter-select el-col el-col-21">
                <a href="javascript:;" title="CMA" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">CMA</span>
                  <!---->
                </a>
                <a href="javascript:;" title="CNAS" class="el-link el-link--default">
                  <!---->
                  <span class="el-link--inner">CNAS</span>
                  <!---->
                </a>
                <!---->
              </div>
            </div>
            <!---->
          </div>
        </div>
      </div>
    </div>
    <!-- potal 检测机构列表 -->
    <div class="el-row main_width">
      <div class="el-col el-col-20" style="padding-left:5px;padding-right:5px;">
        <div class="list-container">
          <div class="el-card box-card is-never-shadow list-header">
            <div slot="cascader" class="el-cascader el-cascader--small">
              <div class="el-input el-input--small el-input--suffix">
                <!---->
                <input
                  type="text"
                  readonly="readonly"
                  autocomplete="off"
                  placeholder="请选择地区"
                  class="el-input__inner"
                  aria-expanded="false"
                >
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner">
                    <i class="el-input__icon el-icon-arrow-down"></i>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div class="list-content">
            <div class="el-card box-card is-hover-shadow">
              <div class="el-card__body">
                <div class="el-row">
                  <div class="org-container el-col el-col-12">
                    <a href="javascript:;" class="el-link el-link--default" style="display:block;">
                      <span class="el-link--inner">
                        <div title="西安市产品质量监督检验院" class="org-title">
                          <span>西安市产品质量监督检验院</span>
                        </div>
                        <div title="陕西省西安市高新开发区科技六路198号" class="org-addr">地 址：陕西省西安市高新开发区科技六路198号</div>
                        <div title="" class="org-link">联系方式：</div>
                        <div class="org-cert">检验资质：CNAS</div>
                      </span>
                    </a>
                  </div>
                  <div class="org-adi el-col el-col-12">
                    <div class="el-row">
                      <div class="el-col el-col-4">检测项目</div>
                      <div class="org-tag el-col el-col-20">
                        <span
                          class="el-tag el-tag--light"
                          title="酒精度 GB 5009.225-2016 食品安全国家标准 酒中乙醇浓度的测定"
                        >
                          <span class="org-adi-pro">酒精度&nbsp;&nbsp;</span>
                          <span class="org-adi-std">GB 5009.225-2016</span>
                        </span>
                        <span class="el-tag el-tag--light" title="总酸 GB/T 10345-2007 白酒分析方法">
                          <span class="org-adi-pro">总酸&nbsp;&nbsp;</span>
                          <span class="org-adi-std">GB/T 10345-2007</span>
                        </span>
                        <span class="el-tag el-tag--light" title="总酯 GB/T 11858-2008 伏特加(俄得克)">
                          <span class="org-adi-pro">总酯&nbsp;&nbsp;</span>
                          <span class="org-adi-std">GB/T 11858-2008</span>
                        </span>
                        <span class="el-tag el-tag--light" title="醛类 GB/T 11856-2008 白兰地">
                          <span class="org-adi-pro">醛类&nbsp;&nbsp;</span>
                          <span class="org-adi-std">GB/T 11856-2008</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span class="org-no-apply">暂未入驻</span>
                </div>
              </div>
            </div>
            <div class="el-card box-card is-hover-shadow"> 
              <div class="el-card__body">
                <div class="el-row">
                  <div class="org-container el-col el-col-12">
                    <a
                      href="http://zljweb.com/pages/home/potal.html?cnum=0&amp;main=0&amp;id=3"
                      class="el-link el-link--default"
                      style="display: block;"
                    >
                      <!---->
                      <span class="el-link--inner">
                        <div title="浙江方圆检测集团股份有限公司" class="org-title">
                          <span>浙江方圆检测集团股份有限公司</span>
                          <i title="国家中心" class="org-icon org-icon-nature"></i>
                          <i title="省中心" class="org-icon org-icon-pro"></i>
                        </div>
                        <div
                          title="浙江省杭州市杭州经济技术开发区下沙路300号"
                          class="org-addr"
                        >地 址：浙江省杭州市杭州经济技术开发区下沙路300号</div>
                        <div
                          title="0571-86839998;0571-85026216"
                          class="org-link"
                        >联系方式：0571-86839998;0571-85026216</div>
                        <div class="org-cert">检验资质：CMA&nbsp;&nbsp;&nbsp;CNAS</div>
                      </span>
                      <!---->
                    </a>
                  </div>
                  <div class="org-adi el-col el-col-12">
                    <div class="el-row">
                      <div class="el-col el-col-4">检测项目</div>
                      <div class="org-tag el-col el-col-20">
                        <span
                          class="el-tag el-tag--light"
                          title="微生物 GB/T 4789.25-2003 食品卫生微生物学检验 酒类检验"
                        >
                          <span class="org-adi-pro">微生物&nbsp;&nbsp;</span>
                          <span class="org-adi-std">GB/T 4789.25-2003</span>
                        </span>
                        <span
                          class="el-tag el-tag--light"
                          title="锂（Li） QB/T 4711-2014 黄酒中无机元素的测定方法 电感耦合等离子体质谱法和电感耦合等离子体原子发射光谱法"
                        >
                          <span class="org-adi-pro">锂（Li）&nbsp;&nbsp;</span>
                          <span class="org-adi-std">QB/T 4711-2014</span>
                        </span>
                        <span
                          class="el-tag el-tag--light"
                          title="锰（Mn） QB/T 4711-2014 黄酒中无机元素的测定方法 电感耦合等离子体质谱法和电感耦合等离子体原子发射光谱法"
                        >
                          <span class="org-adi-pro">锰（Mn）&nbsp;&nbsp;</span>
                          <span class="org-adi-std">QB/T 4711-2014</span>
                        </span>
                        <span
                          class="el-tag el-tag--light"
                          title="镍（Ni） QB/T 4711-2014 黄酒中无机元素的测定方法 电感耦合等离子体质谱法和电感耦合等离子体原子发射光谱法"
                        >
                          <span class="org-adi-pro">镍（Ni）&nbsp;&nbsp;</span>
                          <span class="org-adi-std">QB/T 4711-2014</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="padding-bottom: 20px;">
                  <router-link to="/potal">
                    <a class="org-apply el-link el-link--default is-underline">
                      <span class="el-link--inner">
                        在线委托
                        <i class="el-icon-s-promotion el-icon--right"></i>
                      </span>
                    </a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="el-col el-col-4" style="padding-left:5px;padding-right:5px;">
        <div class="el-card box-card is-never-shadow">
          <div class="el-card__header">
            <div class="clearfix">
              <span class="header-title-span">热门服务</span>
            </div>
          </div>
          <div class="el-card__body">
            <div class="hot-item">
              <a href="http://zljweb.com/product/P00019000712.html" target="_blank">
                <div class="hot-img">
                  <img
                    alt=""
                    data-src="http://wj.zljweb.com/zljfiles/UploadFile/Product/20191122/566eaa1d-305b-4fd9-a87d-69b2b4e5d505.compress.jpg"
                    src="http://wj.zljweb.com/zljfiles/UploadFile/Product/20191122/566eaa1d-305b-4fd9-a87d-69b2b4e5d505.compress.jpg"
                    lazy="loaded"
                  >
                </div>
                <div class="hot-fee">
                  <b>￥</b>1200.00
                </div>
                <div class="hot-title">白酒检测</div>
              </a>
            </div>
            <div class="hot-item">
              <a href="http://zljweb.com/product/P00041000780.html" target="_blank">
                <div class="hot-img">
                  <img
                    alt=""
                    data-src="http://wj.zljweb.com/zljfiles/UploadFile/Product/20191126/820d2601-bf25-4688-b3e0-659844a3bafa.compress.jpg"
                    src="http://wj.zljweb.com/zljfiles/UploadFile/Product/20191126/820d2601-bf25-4688-b3e0-659844a3bafa.compress.jpg"
                    lazy="loaded"
                  >
                </div>
                <div class="hot-fee">
                  <b>￥</b>800.00
                </div>
                <div class="hot-title">白酒检测</div>
              </a>
            </div>
            <div class="hot-item">
              <a href="http://zljweb.com/product/P00041000784.html" target="_blank">
                <div class="hot-img">
                  <img
                    alt=""
                    data-src="http://wj.zljweb.com/zljfiles/UploadFile/Product/20191126/1b21a96f-5bc8-49af-a30d-adbd1b14b4b1.compress.jpg"
                    src="http://wj.zljweb.com/zljfiles/UploadFile/Product/20191126/1b21a96f-5bc8-49af-a30d-adbd1b14b4b1.compress.jpg"
                    lazy="loaded"
                  >
                </div>
                <div class="hot-fee">
                  <b>￥</b>800.00
                </div>
                <div class="hot-title">黄酒检测</div>
              </a>
            </div>
            <div class="hot-item">
              <a href="http://zljweb.com/product/P00041000785.html" target="_blank">
                <div class="hot-img">
                  <img
                    alt=""
                    data-src="http://wj.zljweb.com/zljfiles/UploadFile/Product/20191126/3726a5de-3b76-4968-a410-c5157df2cfdb.compress.jpg"
                    src="http://wj.zljweb.com/zljfiles/UploadFile/Product/20191126/3726a5de-3b76-4968-a410-c5157df2cfdb.compress.jpg"
                    lazy="loaded"
                  >
                </div>
                <div class="hot-fee">
                  <b>￥</b>500.00
                </div>
                <div class="hot-title">果酒检测</div>
              </a>
            </div>
            <div class="hot-item">
              <a href="http://zljweb.com/product/P00041000787.html" target="_blank">
                <div class="hot-img">
                  <img
                    alt=""
                    data-src="http://wj.zljweb.com/zljfiles/UploadFile/Product/20191126/00271f54-d214-4398-8135-4b46fcd4e06b.compress.jpg"
                    src="http://wj.zljweb.com/zljfiles/UploadFile/Product/20191126/00271f54-d214-4398-8135-4b46fcd4e06b.compress.jpg"
                    lazy="loaded"
                  >
                </div>
                <div class="hot-fee">
                  <b>￥</b>1200.00
                </div>
                <div class="hot-title">葡萄酒检测</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sort",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style>
.box-card {
  margin-bottom: 12px;
}
.el-link {
  margin-right: 15px;
}
.filter-input {
  width: 200px !important;
  display: inline-flex !important;
}
.list-header {
  display: flex;
  flex-direction: row;
  padding: 16px 20px;
  align-items: center;
}
org-addr,
.org-cert,
.org-link,
.org-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.org-title span {
  display: inline-block;
  font-size: 24px;
  font-weight: 600;
  color: #222;
  max-width: 460px;
  line-height: 24px;
}
.org-addr,
.org-cert,
.org-link {
  color: #666;
  font-size: 14px;
  font-weight: 500;
  max-width: 530px;
  box-sizing: border-box;
}
.org-addr,
.org-cert,
.org-link,
.org-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-tag {
  background-color: #ecf5ff;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
}
.org-tag > span {
  /* width: 188px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  margin-left: 0 !important;
  margin-right: 8px;
  margin-bottom: 6px;
}
.org-apply {
  float: right !important;
  margin-top: -5px !important;
  margin-right: 12px !important;
  color: #fff !important;
  background-color: #33a0e5;
  padding: 5px !important;
}
.el-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: 0;
  padding: 0;
}
.org-no-apply {
  float: right;
  margin-top: -15px;
  margin-right: 12px;
  color: #f60 !important;
  font-size: 14px;
  font-weight: 600;
}
</style>

