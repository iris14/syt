// 引入二次封装的axios
import {requests} from '@/utils/requests'
import type {AddOrUpdateUser, AllOrderStateResponseData, AllUserResponseData,UserOrderInfoResponseData, UserParams, CertationTypeResponseData, UserInfoResponseData, PayResult, QrCode,SubmitOrder,OrderRespneseData} from './type'
import { request } from 'http';
enum API{
    // 
    SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',
    // 获取订单详情
    GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
    // 取消订单
    ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
    // 订单微信二维码
    QRCODE_URL = '/order/weixin/createNative/',
    // 订单支付状态
    PAYRESULT_URL = '/order/weixin/queryPayStatus/',
    // 获取当前账号用户信息
    USERINGO_URL = '/user/auth/getUserInfo',
    // 获取证件类型
    CERTIFICATION_URL = '/cmn/dict/findByDictCode/',
    // 用户认证的结构
    USERCERTATION_URL = '/user/auth/userAuah',
    // 挂号订单
    USERORDERINFO_URL = '/order/orderInfo/auth/',
    // 获取就诊人的信息
    ALLUSER_URL = '/user/patient/auth/findAll/',
    // 获取订单状态
    ORDERSTATUS_URL = '/order/orderInfo/auth/getStatusList',
    // 获取城市数据
    CITY_URL = '/cmn/dict/findByParentId/',
    // 新增就诊人
    ADDUSER_URL = '/user/patient/auth/save',
    // 更新就诊人
    UPDATEUSER_URL = '/user/patient/auth/update',
    // 删除就诊人
    DELETEUSER_URL = '/user/patient/auth/remove/'

}

export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => requests.post<any, SubmitOrder>(API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`);
 // 获取订单详情
export const reqOrderInfo = (id:string) => requests.get<any,OrderRespneseData>(API.GETORDERINFO_URL + id)
//取消订单
export const reqCancelOrder = (orderId:string) => requests.get<any,any>(API.ORDERCANCEL_URL + orderId)
// 订单微信二维码
export const reqQrcode = (orderId:string) => requests.get<any, QrCode>(API.QRCODE_URL + orderId)
// 订单支付状态
export const reqQueryPayState = (orderId:string) => requests.get<any, PayResult>(API.PAYRESULT_URL + orderId)
// 获取当前账号用户信息
export const reqUserInfo = () => requests.get<any, UserInfoResponseData>(API.USERINGO_URL)
// 证件类型
export const reqCertationType = (CertificatesType='CertificatesType') => requests.get<any, CertationTypeResponseData>(API.CERTIFICATION_URL + CertificatesType)
// 用户认证接口
export const reqUserCertation = (data:UserParams) =>requests.post<any, any>(API.USERCERTATION_URL,data)
// 挂号订单
export const reqUserOrderInfo = (page:number, limit:number, patientId:string, orderStatus:string) => requests.get<any,UserOrderInfoResponseData>(API.USERORDERINFO_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
// 获取就诊人的信息
export const reqAllUser = () => requests.get<any,AllUserResponseData>(API.ALLUSER_URL)
 // 获取订单状态
 export const reqOrderState = () =>requests.get<any,AllOrderStateResponseData>(API.ORDERSTATUS_URL)
//  获取城市的数据
export const reqCity = (parentId:string)=> requests.get<any,any>(API.CITY_URL + parentId)
// 新增就诊人& 修改
export const reqAddOrUpdateUser = (data:AddOrUpdateUser) => {
    if(data.id){
        return requests.put<any,any>(API.UPDATEUSER_URL , data)
    }else{
        return requests.post<any,any>(API.ADDUSER_URL , data)
    }
}
// 删除就诊人
export const reqRemoveUser = (id:number) => requests.delete<any,any>(API.DELETEUSER_URL + id)
