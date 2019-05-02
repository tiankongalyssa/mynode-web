import request from "@/utils/request"
export default {
  addSpringBoot (info,step) {
    return request({
      url: 'http://localhost:9001/node/springboot',
      method: 'put',
      data: {
        info:info,
        step:step
      }
    })
  },
  findById(id){
    return request({
      url: `http://localhost:9001/node/springboot/${id}`,
      method: 'get',
    })
  }
}
