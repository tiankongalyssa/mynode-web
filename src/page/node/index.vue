<template>
  <div>
    <Row>
      <Col span="4" style="margin: 30px;" v-for="item in data">
        <Card :bordered="false">
          <p slot="title">{{item.type}}</p>
          <p v-for="sub in item.data" >
            <router-link :to="sub.url===undefined?'':sub.url" :class="getClass(sub.state)"><b>{{sub.title}}</b></router-link>
          </p>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    name: 'node',
    data () {
      return {
        data: [],
      }
    },
    created () {
      fetch('http://localhost:9001/node')
        .then(res => res.json())
        .then(json => {
          console.log(json)
          this.data = json.data
        })
    },
    methods: {
      getClass (num) {
        let str = 'info'

        if (num === 1) {
          str = 'danger'
        } else if (num === 2) {
          str = 'success'
        } else if (num === 3) {
          str = 'warning'
        } else if (num === 4) {
          str = 'primary'
        }
        return str
      }
    }
  }
</script>
<style scoped>
  @import "../../mycss.css";
</style>
