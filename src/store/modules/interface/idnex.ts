import type { HospitalDetailArr, DeparmentArr, UserInfo } from "@/api/hospital/type";

export interface DetailState{
    hospitalInfo:HospitalDetailArr,
    deparmentArr:DeparmentArr
}

// 用户仓库相关state数据的ts类型定义
export interface UserState{
    visible:boolean, //用于控制登录组件的对话框显示、隐藏
    code:string,
    userInfo:userInfo

}