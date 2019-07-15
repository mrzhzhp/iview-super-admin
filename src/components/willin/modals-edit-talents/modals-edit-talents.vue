<template>
  <Modal :value="modalsShow"  :title="title" @on-cancel="onCancel" :styles="{top: '20px'}" width="860">
    <Form :model="formItem" :label-width="80">
      <FormItem label="姓名">
        <Row>
          <Col span="6">
            <Input v-model="modalsData.tr_name" placeholder="请输入姓名"></Input>
          </Col>
          <Col span="2" style="text-align: center">手机号</Col>
          <Col span="6">
            <Input v-model="modalsData.tr_phone" placeholder="请输入手机号"></Input>
          </Col>
          <Col span="2" style="text-align: center">身份证</Col>
          <Col span="6">
            <Input v-model="modalsData.ID_card" placeholder="请输入身份证"></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="所属人">
        <Row>
          <Col span="6">
            <Select v-model="modalsData.tr_user_id" filterable>
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="2" style="text-align: center">中介</Col>
          <Col span="6">
            <Select v-model="modalsData.tr_sex">
              <Option value="男">男</Option>
              <Option value="女">男</Option>
            </Select>
          </Col>
          <Col span="2" style="text-align: center">招聘来源</Col>
          <Col span="6">
            <Select v-model="modalsData.tr_sex">
              <Option value="男">男</Option>
              <Option value="女">男</Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Select">
        <Select v-model="formItem.select">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="DatePicker">
        <Row>
          <Col span="11">
            <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
            <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Radio">
        <RadioGroup v-model="formItem.radio">
          <Radio label="male">Male</Radio>
          <Radio label="female">Female</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="Checkbox">
        <CheckboxGroup v-model="formItem.checkbox">
          <Checkbox label="Eat"></Checkbox>
          <Checkbox label="Sleep"></Checkbox>
          <Checkbox label="Run"></Checkbox>
          <Checkbox label="Movie"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="Switch">
        <i-switch v-model="formItem.switch" size="large">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      <FormItem label="Slider">
        <Slider v-model="formItem.slider" range></Slider>
      </FormItem>
      <FormItem label="Text">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
export default {
  name: 'Modals',
  props: {
    title: {
      type: String,
      default: '编辑'
    },
    modalsShow: {
      type: Boolean
    },
    modalsData: {
      type: Object
    }
  },
  data () {
    return {
      modalsShow2: false,
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      cityList: [
        {
          value: '237',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ]
    }
  },
  methods: {
    onCancel () {
      this.$emit('on-cancel', false)
    }
  },
  mounted () {
    console.log(this.modalsData)
  }
}
</script>
