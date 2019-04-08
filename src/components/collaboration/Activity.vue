<template>
  <el-row>
    <el-col>
      <h5>活动日志</h5>
    </el-col>
    <el-col>
      <div class="activity-container">
        <div class="avatar"></div>
        <dl class="activity">
          <dt></dt>
          <dd></dd>
        </dl>
      </div>
    </el-col>
  </el-row>
</template>
<script>
</script>
<style scoped>
.activity-container {
}
.avatar {
    width: 32px;
    height: 32px;
    float: left;
    background: url(../../assets/avatar_default.png);
    background-size: 32px 32px;
  }
.activity {
    float: left;
    margin: 0px 16px 0px 16px;
  }
</style>