// 统一管理首页接口
import {requests} from "@/utils/requests";
import {admin} from "@/utils/admin";
import type { HospitalResponseData, HospitalLevelAndRegionResponseData, HospitalInfo } from "./type";
// 通过枚举管理首页模块的接口地址
enum API {
    // 已有医院信息
    HOSPITAL_URL = '/hosp/hospital/',
    // 获取医院等级和地区
    HOPITALlEVELANDREGION_URL = '/cmn/dict/findByDictCode/',
    // 根据关键字医院的名字获取数据
    HOSPITALINFO_URL = '/hosp/hospital/findByHosname/'
}

export const reqHospital = (page:number, limit:number, hostype='', districtCode='') => requests.get<any, HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)

export const reqHospitalLevelAndRegion = (dictCode:string) => admin.get<any, HospitalLevelAndRegionResponseData>(API.HOPITALlEVELANDREGION_URL + `${dictCode}`)

export const reqHospitalInfo = (hosname:string) => requests.get<any, HospitalInfo>(API.HOSPITALINFO_URL + `${hosname}`)