
<template>
  <div>
    <Row class="expand-row">
      <Col  v-for="item in data" :value="item.title"  :key="item.key" span="8">
        <span class="expand-key">{{item.title}}: </span>
        <span class="expand-value">{{ row[item.key] }}</span>
      </Col>
    </Row>
  </div>
</template>
<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<script>
export default {
  props: {
    row: Object,
    data: Array
  }
}
</script>
