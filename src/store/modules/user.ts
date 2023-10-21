//定义用户相关的仓库
import { defineStore } from "pinia";
import { reqCode, reqUserLogin } from "@/api/hospital";
import type { loginData, UserLoginResponseData } from "@/api/hospital/type";
import type { UserState } from "./interface";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/user";
import { UserInfo } from "os";
const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      visible: false, //用于控制登录组件的dialog显示和隐藏
      code: "",
      userInfo: JSON.parse(GET_TOKEN() as string) || {},
    };
  },
  actions: {
    // 获取验证码方法
    async getCode(phone: string) {
      // 在向服务器携带手机号码  获取验证码
      let result: any = await reqCode(phone);
      if (result.code == 200) {
        this.code = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    // 用户手机号码登录
    async userLogin(loginParam: loginData) {
      let result: UserLoginResponseData = await reqUserLogin(loginParam);
      if (result.code == 200) {
        this.userInfo = result.data;
        SET_TOKEN(JSON.stringify(this.userInfo));
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    // 退出登录
    logout() {
      // chu
      this.userInfo = { name: "", token: "" };
      REMOVE_TOKEN();
    },
    // 查询微信扫码接口
    queryState() {
      // 开启定时器监听
      console.log("queryState");
      let timer = setInterval(() => {
        // 本地存储已有数据：扫码成功
        if (GET_TOKEN()) {
          // 关闭对话框
          this.visible = false;
          this.userInfo = JSON.parse(GET_TOKEN() as string);
          clearInterval(timer);
        }
      }, 1000);
    },
  },
  getters: {},
});

export default useUserStore;
