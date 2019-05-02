<template>
  <div>
    <!--操作-->
    <div>
      <a @click="value5 = true">
        <Icon type="ios-water-outline" size="20"/>
      </a>
      <Drawer title="添加" width="600" :closable="false" v-model="value5" placement="left">
        <!--springboot表-->
        <Form ref="formItem" :model="formItem" :label-width="80">
          <FormItem label="分类">
            <Select v-model="formItem.typeName" filterable>
              <Option :value="i.type" v-for="i in datas">{{i.type}}</Option>
            </Select>
            <a href="#" @click="addShow()">新增</a>
            <Input v-model="formItem.typeName" placeholder="新增" v-show="show"/>
          </FormItem>
          <FormItem label="标题">
            <Input v-model="formItem.name" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="描述">
            <Input v-model="formItem.summary" type="textarea" :autosize="{minRows: 2,maxRows: 10}"
                   placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="步骤">
            <Input v-model="formItem.step" placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
        <!--步骤表-->
        <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
          <FormItem
            v-for="(item, index) in formDynamic.items"
            v-if="item.status"
            :key="index"
            :label="'步骤 ' + item.index"
            :prop="'items.' + index + '.value'"
            :rules="{required: false, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
            <Row style="width: 441px;">
              <Col span="21">
                <Input type="text" v-model="item.step=item.index" style="display: none"></Input>
                <Input type="text" v-model="item.title" placeholder="标题"></Input>
                <Input v-model="item.content" type="textarea" :autosize="{minRows: 2,maxRows: 10}"
                       placeholder="内容"></Input>
                <Input type="text" v-model="item.description" placeholder="注释"></Input>
              </Col>
              <Col span="1" offset="1">
                <Button @click="handleRemove(index)">Delete</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
                <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit()">Submit</Button>
            <Button @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
          </FormItem>
        </Form>
      </Drawer>
    </div>
    <!--内容呈现-->
    <Tabs :animated="false">
      <TabPane :label="i.type" v-for="i in datas">
        <Collapse accordion>
          <Panel v-for="j in i.data" name="">{{j.name}}
            <Button slot="content" type="primary" @click="findSpringBootById(j.id)">修改</Button>
            <Modal
              v-model="modal1"
              title="Common Modal dialog box title"
              @on-ok="ok"
              @on-cancel="cancel">
              <p>Content of dialog</p>
              <p>Content of dialog</p>
              <p>Content of dialog</p>
            </Modal>
            <h5 slot="content" v-if="j.summary!==null">说明</h5>
            <textarea slot="content" v-if="j.summary!==null" v-html="j.summary"
                      style="width: 800px;height: 200px;padding: 10px" readonly></textarea>
            <h5 slot="content">{{j.step}}</h5>
            <timeline slot="content">
              <TimelineItem v-for="k in j.steps">
                <p class="time"><b>{{k.title}}</b></p>
                <hr>
                <pre class="content">{{k.content}}</pre>
                <hr>
                <code class="content"><b v-html="k.description"></b></code>
              </TimelineItem>
            </timeline>
          </Panel>
        </Collapse>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import nodeApi from '@/api/nodeApi'

  export default {
    name: 'springboot',
    data () {
      return {
        datas: [],
        value5: false,
        index: 1,
        formItem: {},
        formDynamic: {
          items: [
            {
              title: '',
              content: '',
              index: 1,
              status: 1
            }
          ]
        },
        show: false,
        modal1: false //修改弹出框
      }
    },
    created () {
      fetch('http://localhost:9001/node/springboot')
        .then(res => res.json())
        .then(json => {
          this.datas = json.data
        })
    },
    methods: {
      findSpringBootById (id) {
        this.modal1=true
        console.log(id)
        nodeApi.findById(id)
          .then(res =>{
            console.log(res.data)
          })
      },
      ok () {
        this.$Message.info('修改成功')
      },
      cancel () {
        this.$Message.info('已取消')
      },
      addShow () {//是否展示添加窗口
        this.show = this.show === false
      },
      handleAdd () {//添加一个步骤
        this.index++
        this.formDynamic.items.push({
          value: '',
          index: this.index,
          status: 1
        })
      },
      handleRemove (index) {//移除一个步骤
        this.index--
        this.formDynamic.items[index].status = 0
        this.formDynamic.items.pop()
      },
      handleSubmit () {//提交一条记录
        let info = JSON.stringify(this.formItem)
        let step = JSON.stringify(this.formDynamic.items)
        nodeApi.addSpringBoot(info, step).then(res => {
          if (res.data.flag) {
            this.$Message.success(res.data.message)
            this.formItem = {}
            this.formDynamic = {}
            this.value5 = false
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      handleReset (name) {

      }
    }
  }
</script>

<style scoped>
  @import "../../../mycss.css";
</style>
