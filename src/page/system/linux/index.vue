<template>
  <div>
    <Tabs type="card">
      <TabPane :label="type.type" v-for="type in data">
        <Table highlight-row ref="currentRowTable" :columns="columns3" :data="type.data"></Table>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  export default {
    name: 'linux',
    data: function () {
      return {
        columns3: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: '功能',
            width: 140,
            key: 'function'
          },
          {
            title: '命令',
            key: 'command'
          }
        ],
        data: [],
      }
    },
    created () {
      fetch('http://localhost:9001/node/linux')
        .then(res => res.json())
        .then(json => {
          console.log(json)
          this.data = json.data
        })
    }
  }
</script>
