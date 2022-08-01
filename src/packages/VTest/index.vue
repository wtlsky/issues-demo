<template>
  <div class='vue-test'>
    hello vue, {{message}}
    <el-button size="mini" type="primary">hello</el-button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      message: Date.now()
    }
  },
  methods: {

  },
  created () {

  }
}
</script>
<style lang='scss' scoped>
</style>
