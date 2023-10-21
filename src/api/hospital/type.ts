//定义详情模块ts类型
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

export interface HospitalDetail{
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
      },
      "hospital": {
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
          "hostypeString": string,
          "fullAddress": string
        },
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "logoData": string,
        "intro": null,
        "route": string,
        "status": number,
        "bookingRule": null
      }
}
// 医院详情
export interface HospitalDetailArr extends ResponseData{
    data:HospitalDetail
}


// 医院科室
export interface Deparment{
  "depcode": string,
  "depname": string,
  "children": ?:Deparment []
}

// 存储科室数据类型
export type DeparmentArr =  Deparment[];
// 获取科室接口返回的数据类型
export interface DeparmentResponseData extends ResponseData{
  data:DeparmentArr
}

// 用户登录接口需要携带参数类型
export  interface loginData{
  phone:string,
  code:string
}

// 登录接口返回的用户信息数据
export interface UserInfo {
  name:string,
  token:string
}

// 登录接口返回的数据的ts类型
export interface UserLoginResponseData extends ResponseData{
  data:UserInfo
}

// 定义微信扫码登录返回数据的ts类型
export interface WXLogin {
  "redirectUri": string,
    "appid": string,
    "scope": string,
    "state": string
}

export interface WXLoginResponseData extends ResponseData{
  data: WXLogin
}

// 挂号信息ts类型
export interface BaseMap{
  "workDateString": string,
  "releaseTime": string,
  "bigname":string,
  "stopTime": string,
  "depname": string,
  "hosname": string
}

export interface WorkData{
  "workDate": string,
  "workDateMd": string,
  "dayOfWeek": string,
  "docCount": number,
  "reservedNumber": number,
  "availableNumber": number,
  "status": number
}

export type BookingScheduleList = WorkData[]

export interface HospitalWorkData extends ResponseData{
  data:{
    total:number,
    bookingScheduleList:BookingScheduleList,
    baseMap:BaseMap
  }
}

// 医生排班数据
export interface Doctor{
  "id": string,
      "createTime": string,
      "updateTime": string,
      "isDeleted": number,
      "param": {
        "dayOfWeek": string,
        "depname": string,
        "hosname": string,
      },
      "hoscode": string,
      "depcode": string,
      "title": string,
      "docname": string,
      "skill": string,
      "workDate": string,
      "workTime": number,
      "reservedNumber": number,
      "availableNumber": number,
      "amount": number,
      "status": number,
      "hosScheduleId": string
}

export type DocArr = Doctor[];

export interface DoctorResponseData extends ResponseData{
  data:DocArr
}

// 就诊人信息
export interface User{
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
      "certificatesTypeString": string,
      "contactsCertificatesTypeString": string,
      "cityString": string,
      "fullAddress": string,
      "districtString": string,
      "provinceString": string
  },
  "userId": number,
  "name": string,
  "certificatesType": string,
  "certificatesNo": string,
  "sex": number,
  "birthdate": string,
  "phone": string,
  "isMarry": number,
  "provinceCode": string,
  "cityCode": string,
  "districtCode": string,
  "address": string,
  "contactsName": string,
  "contactsCertificatesType": string,
  "contactsCertificatesNo": number,
  "contactsPhone": string,
  "isInsure": number,
  "cardNo": null,
  "status": number
}

export type UserArr = User[];

export interface UserResponseData extends ResponseData{
  data:UserArr
}


// 某位挂号医生的数据
export interface DoctorInfoData extends ResponseData{
  data:Doctor
}