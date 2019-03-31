<template>
    <div>
        <jj-progress v-bind:value="20"></jj-progress>
        <el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <h5>记录时间</h5>
              <el-input :value="originalBind" @input="originalChanged" placeholder="例如，3w 1d 12m"/>
            </el-col>
            <el-col :span="12">
              <h5>剩余时间</h5>
              <el-input :value="remainingBind" @input="remainingChanged"/>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <h5>开始时间</h5>
            </el-col>
            <el-col :span="12">
              <el-date-picker
                class="full-width"
                type="date"
                v-model="startedDateBind"
                @change="startedDateChanged"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-time-select
                class="full-width"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                
                  v-model="startedTimeBind"
                  @change="startedTimeChanged"
                  placeholder="选择时间">
                </el-time-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <ckeditor :editor="editor" :value="contentBind" :config="editorConfig" @input="contentChanged"></ckeditor>

            </el-col>
          </el-row>
        </el-row>
      </div>
</template>
<script>
import Progress from './Progress'
import TimeTracker from './TimeTracker'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      remainingBind: '',
      originalBind: '',
      startedDateBind: null,
      startedTimeBind: '',
      contentBind: '',

      startedDatePick: {
        onPick(picker) {
          debugger
        }
      }
    }
  },
  props: {
    remaining: {
      type: String,
      default: ""
    },
    original: {
      type: String,
      default: ""
    },
    startedDate: {
      type: Date,
      default: null
    },
    startedTime: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: ''
    }
  },
  components: {
    'jj-progress': Progress,
    ckeditor: CKEditor.component,
  },
  watch: {
    remaining(val) {
      this.remainingBind = val
    }
  },
  methods: {
    remainingChanged(text) {
      this.remainingBind = text
      this.$emit('remaining', text)
    },
    originalChanged(text) {
      this.originalBind = text
      this.$emit('originalChanged', text)
    },
    startedDateChanged(date) {
      this.startedDateBind = date
      this.$emit('startedDateChanged', date)
    },
    startedTimeChanged(text) {
      this.startedTimeBind = text 
      this.$emit('startedTimeChanged', text)
    },
    contentChanged(text) {
      this.contentBind = text
      this.$emit('contentChanged', text)
    }
  },
  mounted() {
    this.remainingBind =  this.remaining
  }
}
</script>