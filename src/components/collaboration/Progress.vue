<template>
    <div>
    <div class="progress-bar">
      <div class="indicator" v-bind:style="{width: indicatorWidth}"></div>
    </div>
    <small>已记录时间 剩余时间</small>
    </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 10
    },
    passed: {
      type: Number,
      default: 10
    },
    remaining: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
    }
  },
  computed: {
    indicatorWidth() {
      return `${this.value}%`;
    },

    passedDescription() {

    },

    remainingDescription() {

    }
  },
  methods: {
    format(seconds) {
      
    }
  }
}
</script>
<style scoped>
  .progress-bar {
    width: 100%;
    height: 10px;
    border: 1px solid #fff;
    background-color: rgb(223, 225, 230);
    border-radius: 15px;
  }

  .indicator {
    height: 100%;
    background: #0052cc;
    border-radius: 15px;
  }
</style>
