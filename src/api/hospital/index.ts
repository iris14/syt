import {requests} from '@/utils/requests'
import type {DoctorInfoData, HospitalDetailArr, DeparmentResponseData, UserLoginResponseData, loginData, WXLogin, WXLoginResponseData, HospitalWorkData, DoctorResponseData, UserResponseData} from './type'
import { request } from 'http'

enum API{
    // 医院
    HOSPITALDETAIL_URL  = '/hosp/hospital/',
    // 医院科室
    HOSPITALDEPARMENT_URL = '/hosp/hospital/department/',
    // 获取验证码接口
    GETUSERCODE_URL = 'sms/send/',
    // 用户登录几口
    USERLOGIN_URL = '/user/login',
    //获取微信扫码登录需要参数
    WXLOGIN_URL = '/user/weixin/getLoginParam/',
    // 获取医院科室挂号shuju 
    HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    // 医生排班信息
    HOSPITALDOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
    // 就诊人信息
    GETUSER_URL = '/user/patient/auth/findAll',
    // 挂的医生的信息
    GETDOCTOR_URL = '/hosp/hospital/getSchedule/'
}

export const reqHospitalDetail = (hoscode:string) => requests.get<any,HospitalDetailArr >(API.HOSPITALDETAIL_URL + hoscode)
// YIYUAN KESHI 
export const reqHospitalDepartment = (hoscode:string) => requests.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hoscode)
// 获取验证码接口
export const reqCode = (phone:string) => requests.get(API.GETUSERCODE_URL + phone)
// 用户登录接口
export const reqUserLogin = (data:loginData) => requests.post<any,UserLoginResponseData>(API.USERLOGIN_URL,data)
//获取微信扫码登录生成二维码需要参数接口
export const reqWxLogin = (wxRedirectUri: string) => requests.get<any, WXLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`);
// 预约挂号数据
export const reqHospitalWork = (page:number, limit:number, hoscode:string, depcode:string) => requests.get<any,HospitalWorkData>(API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`)
// 医生排班信息
export const reqHospitalDoctor = (hoscode:string, depcode:string, workData:string) => requests.get<any,DoctorResponseData>(API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workData}`)
// 就诊人信息
export const reqGetUser = () => requests.get<any,UserResponseData>(API.GETUSER_URL)
// 获取挂号医生的信息
export const reqDoctorInfo = (scheduleId:string) => requests.get<any, DoctorInfoData>(API.GETDOCTOR_URL + scheduleId)