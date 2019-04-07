<template>
    <div>
        <jj-progress 
          v-bind:value="progressWidth"
          :time-tracking="timeTracking">
        </jj-progress>

        <el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <h5>记录时间</h5>
              <el-input :value="spentLocal" @input="spentChanged" placeholder="例如，3w 1d 12m"/>
            </el-col>
            <el-col :span="12">
              <h5>剩余时间</h5>
              <el-input :value="remainingLocal" @input="remainingChanged"/>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <h5>开始时间</h5>
            </el-col>
            <el-col :span="24">
              <el-date-picker
                class="full-width"
                type="datetime"
                v-model="startedLocal"
                @change="startedChanged"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-col><h5>工作描述</h5></el-col>
            <el-col>
              <ckeditor :editor="editor" :value="contentLocal" :config="editorConfig" @input="contentChanged"></ckeditor>
            </el-col>
          </el-row>
        </el-row>
      </div>
</template>
<script>
import Progress from './Progress'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { progressWidthForTimeTracking } from '../../lib/time_tracking'

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      remainingLocal: '',
      spentLocal: '',
      startedLocal: new Date(),
      contentLocal: '',
    }
  },
  props: {
    spent: {
      type: String,
      default: ""
    },
    remaining: {
      type: String,
      default: ""
    },
    started: {
      type: String,
      default: (new Date()).toString()
    },
    content: {
      type: String,
      default: ''
    },
    timeTracking: {
      type: Object,
    }
  },
  computed: {
    progressWidth() {
      return progressWidthForTimeTracking(this.timeTracking)
    }
  },
  components: {
    'jj-progress': Progress,
    ckeditor: CKEditor.component,
  },
  watch: {
    remaining(val) {
      this.remainingLocal = val
    },
    spent(spent) {
      this.spentLocal = spent
    }
  },
  methods: {
    remainingChanged(remaining) {
      this.remainingLocal = remaining
      this.$emit('remainingChanged', remaining)
    },

    spentChanged(spent) {
      this.spentLocal = spent
      this.$emit('spentChanged', spent)
    },
    startedChanged(date) {
      this.startedDateBind = date
      this.$emit('startedChanged', date)
    },

    contentChanged(content) {
      this.contentLocal = content
      this.$emit('contentChanged', content)
    }
  },

  mounted() {
    this.remainingBind =  this.remaining
  }
}
</script>