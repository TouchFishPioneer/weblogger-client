<template>
  <div class="container">
    <div class="col-xs-12">
      <br>

      <b-alert :show="alertSensorSupport" dismissible variant="danger">
        <strong>Caution!</strong>
        This device do not support inertial sensors, please open this page on your mobile devices.
      </b-alert>

      <b-card
        border-variant="primary"
        header="Web Logger"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <strong>PLEASE ENTER PINS</strong>
        <div>
          <b-input-group size="lg" :prepend="pins[progress]">
            <b-form-input
              id="inputbox"
              type="tel"
              :state="inputboxStatus"
              :disabled="alertSensorSupport || inputFinishSignal"
              @focus.native="inputboxOnFocus"
              @blur.native="inputboxOnBlur"
              @keyup.native="inputboxOnKeyup"
              v-model="inputboxContent"
            >
            </b-form-input>
          </b-input-group>
        </div>

        <br>

        <div>
          <strong>OVERALL PROGRESS</strong>
          <b-progress variant="success" striped="striped" :animated="true" :max="pinsCount" height="25px">
            <b-progress-bar :value="progress">
              <strong>{{ progress }} / {{ pinsCount }}</strong>
            </b-progress-bar>
          </b-progress>
        </div>
      </b-card>
    </div>

    <div class="footer">
      <p>
        <a href="https://github.com/wurahara" target="_blank">@Wurahara</a>
      </p>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import router from '../router'
import store from '../store'
import { fetchPinArray } from '../api/pins'
import { config } from '../config/config'

export default {
  name: 'index',
  data () {
    return {
      alertSensorSupport: false,
      username: '',
      pins: [],
      pinsLength: 4,
      pinsCount: 50,
      keyIndex: 0,
      progress: 0,
      inputboxContent: '',
      inputboxStatus: null,
      socket: null,
      sampleId: new Date().getTime(),
      inputFinishSignal: false,
      inputboxClear: '',
      userAgent: null
    }
  },

  created () {
    this.sensorSupportCheck()
    this.setBasicInformation()
    this.getPins()
    this.socketEstablish()
  },

  methods: {
    sensorSupportCheck () {
      if (navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        this.alertSensorSupport = false
      } else {
        this.alertSensorSupport = true
      }
    },

    setBasicInformation () {
      if (localStorage.getItem('name') == null) {
        this.username = store.state.name
      } else {
        this.username = localStorage.getItem('name')
      }
      this.userAgent = navigator.userAgent
    },

    getPins () {
      fetchPinArray().then(res => {
        this.pins = this.shuffle(res.data.pins)
        this.pinsCount = res.data.pins.length
        this.pinsLength = res.data.pins[0].length
      })
    },

    shuffle (array) {
      // 将服务端返回的 pin 码序列打乱顺序
      for (let i = 1; i <= array.length; i++) {
        let j = Math.floor(Math.random() * (array.length - i)) + i
        if (j !== i) {
          let temp = array[i - 1]
          array[i - 1] = array[j - 1]
          array[j - 1] = temp
        }
      }
      return array
    },

    socketEstablish () {
      this.socket = io(`${config.server.url}:${config.server.port}`)
    },

    inputboxOnFocus () {
      this.addSensorListener()
    },

    inputboxOnBlur () {
      this.removeSensorListener()
    },

    inputboxOnKeyup () {
      if (this.inputboxContent.length === this.pinsLength) {
        this.sensorSignalHandler()
      }
    },

    sensorSignalHandler () {
      // 当输入值正确时
      if (this.inputboxContent === this.pins[this.progress]) {
        // 当完成所有 pin 码输入后
        if (this.progress === this.pinsCount - 1) {
          this.removeSensorListener()
          this.inputFinishSignal = true
          this.clearInputbox()
          this.sendSuccessMessage()
          this.inputboxStatus = null
          router.push('thanks')
        } else {
          this.removeSensorListener()
          this.clearInputbox()
          console.log(`pin: ${this.pins[this.progress]}, sampleId: ${this.sampleId}`)
          this.inputboxStatus = true
          this.progress++
          this.sampleId = new Date().getTime()
          this.addSensorListener()
        }
      } else {
        // 当本次 pin 码输入错误时
        this.removeSensorListener()
        this.clearInputbox()
        this.rollback()
        console.log(`pin: ${this.pins[this.progress]}, sampleId: ${this.sampleId}`)
        this.inputboxStatus = false
        this.sampleId = new Date().getTime()
        this.addSensorListener()
      }
    },

    clearInputbox () {
      // 手机浏览器中使用 v-model 时常无法自动响应式更新 input 框的值
      // 故采用 DOM 操作实现
      document.getElementById('inputbox').value = ''
      this.inputboxContent = ''
    },

    addSensorListener () {
      window.addEventListener('devicemotion', this.motionHandler)
      window.addEventListener('deviceorientation', this.orientationHandler)
    },

    removeSensorListener () {
      window.removeEventListener('devicemotion', this.motionHandler)
      window.removeEventListener('deviceorientation', this.orientationHandler)
    },

    motionHandler (event) {
      let acc = event.acceleration
      let gac = event.accelerationIncludingGravity
      let rot = event.rotationRate
      let itv = event.interval

      let dataPackage = {
        'acc_x': acc.x,
        'acc_y': acc.y,
        'acc_z': acc.z,
        'gacc_x': gac.x,
        'gacc_y': gac.y,
        'gacc_z': gac.z,
        'rot_alpha': rot.alpha,
        'rot_beta': rot.beta,
        'rot_gamma': rot.gamma,
        'interval': itv
      }
      this.dataDeliver(dataPackage)
    },

    orientationHandler (event) {
      let dataPackage = {
        'ori_gamma': event.gamma,
        'ori_beta': event.beta,
        'ori_alpha': event.alpha
      }
      this.dataDeliver(dataPackage)
    },

    dataDeliver (data) {
      this.socket.emit('sensor', {
        'username': this.username,
        'sampleId': this.sampleId,
        'pin': this.pins[this.progress],
        'time': new Date(),
        'data': data
      })
    },

    rollback () {
      this.socket.emit('rollback', {
        'sampleId': this.sampleId,
        'pin': this.pins[this.progress]
      })
    },

    sendSuccessMessage () {
      this.socket.emit('log-complete', {
        username: this.username,
        pinsCount: this.pinsCount,
        pinsLength: this.pinsLength,
        userAgent: this.userAgent
      })
    }
  }
}
</script>
