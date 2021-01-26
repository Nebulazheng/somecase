import {get,post,del} from './request';





//登陆
export const  login= (login)=>post('/h5/adminlogin',login)
//get小组列表
export const  get_allGroup=(get_allGroup)=>get('/manage/group/list',get_allGroup)
//运维查看商家
export const  find_merchant=(find_merchant)=>get('/manage/merchant/find/'+find_merchant.id,find_merchant)
//添加小组

//
export const  get_allUser=(get_allUser)=>get('/h5/getAllPatientInfo',get_allUser)
export const  get_patientDetail=(get_patientDetail)=>get('/h5/getPatientDetail',get_patientDetail)
export const  get_articleDetail=(get_articleDetail)=>get('/h5/findArticleDetail',get_articleDetail)
export const  get_course=(get_course)=>get('/h5/getCourse',get_course)
export const  get_articleList=(get_articleList)=>get('/h5/getAllArticle',get_articleList)
export const  post_article=(post_article)=>post('/h5/creatArticle',post_article)
export const  post_course=(post_course)=>post('/h5/creatCourse',post_course)
export const  del_article=(del_article)=>post('/h5/delArticle',del_article)
export const  update_article=(update_article)=>post('/h5/updateArticle',update_article)
//
export const  post_patient=(post_patient)=>post('/h5/creatPatient',post_patient)
export const  del_patient=(del_patient)=>post('/h5/delPatient',del_patient)
export const  update_patient=(update_patient)=>post('/h5/updatePatient',update_patient)
export const  del_group=(del_group)=>del('/manage/group/del/'+del_group.id,del_group)
export const  del_m=(del_m)=>del('/manage/merchant/del/'+del_m.id,del_m)
export const  count_allUser=(count_allUser)=>get('/manage/group/list',count_allUser)

export const  get_store=(get_store)=>get('/manage/merchant/list',get_store)
export const  get_problem=(get_problem)=>get('/manage/problem_list',get_problem)
export const  post_merchant=(post_merchant)=>post('/manage/merchant/add',post_merchant)
export const  post_setting=(post_setting)=>post('/setting/set',post_setting)
export const  get_setting=(get_setting)=>get('/setting/get/swiper',get_setting)
export const  get_clearlist=(get_clearlist)=>get('/manage/merchant/clear_list',get_clearlist)
export const  update_store=(update_store)=>post('/manage/merchant/update',update_store)
export const  update_group=(update_group)=>post('/manage/group/update',update_group)
export const  get_psdlist=(get_psdlist)=>get('/manage/superior/list',get_psdlist)
export const  post_psd=(post_psd)=>post('/manage/superior/add',post_psd)
export const  del_psd=(del_psd)=>del('/manage/superior/del/'+del_psd.psd,del_psd)
export const  del_user=(del_user)=>del('/manage/user/del/'+del_user.userId,del_user)
//上传
export const  upload=(upload)=>get('/api/get/upload',upload)

//今日新增用户
export const  get_dayUp=(get_dayUp)=>get('/app_user/dayup',get_dayUp)

//查询运营方
export const  get_allYuser=(get_allYuser)=>get('/y_user/all',get_allYuser)
//获取所有运营方
export const  find_allYuser=(find_allYuser)=>get('/y_user/findAll',find_allYuser)
//获取所有的app
export const  findApp=(findApp)=>get('/y_user/findApp',findApp)
//获取所有运营方的app
export const  findYuserAndApp=(findYuserAndApp)=>get('/y_user/findYuserAndApp',findYuserAndApp)
//获取所有贷超产品
export const  get_allProduct=(get_allProduct)=>get('/product/all',get_allProduct)
//删除贷超产品
export const  del_prt=(del_prt)=>get('/product/del',del_prt)
//删除app
export const  del_app=(del_app)=>get('/y_user/delApp',del_app)
//删除运营方
export const  del_yuser=(del_yuser)=>get('/y_user/del',del_yuser)
//根据名字查找产品
export const  findPrtConfig=(findPrtConfig)=>get('/product/findPrtConfig',findPrtConfig)
//查询产品设置
export const  get_onePrt=(findPrtByName)=>get('/product/findPrtByName',findPrtByName)
//获取某app前一天放款总额
export const  get_all_total=(get_all_total)=>get('/statement/all',get_all_total)
//添加贷超产品
export const  post_product=(post_product)=>post('/product/post_prt',post_product)
//下架贷超产品
export const  removed_product=(removed_product)=>get('/product/removedPrt',removed_product)
//上架贷超产品
export const  uper_product=(uper_product)=>get('/product/upPrt',uper_product)
//更新产品信息
export const  put_prt=(put_prt)=>post('/product/updatePrt',put_prt)

//添加app
export const  post_yapp=(post_yapp)=>post('/y_user/post_yapp',post_yapp)
//获取uv列表
export const  get_uv=(get_uv)=>get('/uv/all',get_uv)
//统计uv总数 （根据时间）
export const  count_uv=(count_uv)=>get('/uv/countall',count_uv)
//统计uv总数 （全库）
export const  allUv=(allUv)=>get('/uv/count',allUv)
//获取cuv列表
export const  get_cuv=(get_cuv)=>get('/cuv/all',get_cuv)
//统计cuv总数 （根据时间）
export const  count_cuv=(count_cuv)=>get('/cuv/countall',count_cuv)
//获取渠道商列表
export const  get_cuser=(get_cuser)=>get('/c_user/all',get_cuser)
//创建渠道商
export const  creat_cuser=(creat_cuser)=>post('/c_user/creat',creat_cuser)
//删除渠道商
export const  del_cuser=(del_cuser)=>get('/c_user/del',del_cuser)
//获取order
export const  get_orderList=(get_orderList)=>get('/app_order/all',get_orderList)
//获取orderbyc
export const  get_orderByC=(get_orderByC)=>get('/app_order/orderbyc',get_orderByC)