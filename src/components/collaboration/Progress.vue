<template>
    <div class="progress-bar">
      <div class="indicator" v-bind:style="{width: indicatorWidth}"></div>
    </div>
</template>
<script>
export default {
  props: {
    value: {
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
    }
  },
  methods: {
    
  }
}
</script>
<style scoped>
  .progress-bar {
    width: 100%;
    height: 25px;
    border: 1px solid #000;
    border-radius: 5;
  }

  .indicator {
    height: 100%;
    background: #ccc;
  }
</style>
