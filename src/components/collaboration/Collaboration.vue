<template>
  <el-container>
    <el-row>
      <el-col>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">项目</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">Jinjr</a></el-breadcrumb-item>
          <el-breadcrumb-item>Jinjr 面板</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h1>待办事项列表</h1>
      </el-col>
    </el-row>
  </el-container>

</template>