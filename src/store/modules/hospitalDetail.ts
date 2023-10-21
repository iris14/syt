import { defineStore } from "pinia";
import { reqHospitalDetail, reqHospitalDepartment } from "@/api/hospital";
import type { HospitalDetailArr, DeparmentResponseData, DeparmentArr } from "@/api/hospital/type";
import type { DetailState } from "./interface/idnex";
// pinia仓库两个写法： 组合式API、 选择式API
const useDetailStore = defineStore("Detail", {
  state: ():DetailState => {
    return {
      hospitalInfo: ({} as HospitalDetailArr),
      deparmentArr:[]
    };
  },
  actions: {
    async getHospital(hoscode: string) {
      let result: HospitalDetailArr = await reqHospitalDetail(hoscode);
      if (result.code == 200) {
        this.hospitalInfo = result.data;
      }
    },
    async getDeparment(hoscode:string){
      let result: DeparmentResponseData = await reqHospitalDepartment(hoscode)
      if(result.code == 200){
        this.deparmentArr = result.data
      }
      console.log("getDeparment", result)
    }
  },
  getters: {},
});

// 获取仓库方法对外暴露
export default useDetailStore;
