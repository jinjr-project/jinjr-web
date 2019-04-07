<template>
    <div>
      <div class="progress-bar">
        <div class="indicator" v-bind:style="{width: indicatorWidth}"></div>
      </div>
      <small v-if="timeTracking.time_spent.seconds == 0">无记录的时间</small>
      <div>
        <span v-if="timeTracking.time_spent.seconds > 0">已记录 {{timeTracking.time_spent.expression}}</span>
        <span v-if="timeTracking.remaining_estimate.seconds > 0" style="float: right;">{{timeTracking.remaining_estimate.expression}}</span>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    passed: {
      type: Number,
      default: 10
    },
    remaining: {
      type: Number,
      default: 10
    },
    timeTracking: {
      type: Object,
      default: () => { return {
        original_estimate: {
          expression: "",
          seconds: 0
        },
        remaining_estimate: {
          expression: "",
          seconds: 0
        },
        time_spent: {
          expression: "",
          seconds: 0
        }
      }}
    }
  },
  data() {
    return {

    }
  },
  computed: {
    indicatorWidth() {
      if (0 == this.value)
        return "0%";
      return `${this.value}%`;
    },
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
