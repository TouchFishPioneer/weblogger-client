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
              type="tel"
              :state="inputboxStatus"
              :disabled="alertSensorSupport"
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
import store from '../store'
import { fetchPinArray } from '../api/pins'

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
      inputboxStatus: null
    }
  },

  created () {
    this.sensorSupportCheck()
    this.getName()
    this.getPins()
    this.socketTest()
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

    getName () {
      if (localStorage.getItem('name') == null) {
        this.username = store.state.name
      } else {
        this.username = localStorage.getItem('name')
      }
    },

    getPins () {
      fetchPinArray().then(res => {
        this.pins = this.shuffle(res.data.pins)
        this.pinsCount = res.data.pins.length
        this.pinsLength = res.data.pins[0].length
      })
    },

    shuffle (array) {
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
      if (this.inputboxContent !== this.pins[this.progress]) {
        this.removeSensorListener()

        this.inputboxContent = ''
        this.inputboxStatus = false
      } else {
        this.removeSensorListener()

        this.inputboxContent = ''
        this.inputboxStatus = true
        this.progress++
      }

      this.addSensorListener()
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
      console.log('motionHandler called')
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
      console.log('orientationHandler called')
      let dataPackage = {
        'ori_gamma': event.gamma,
        'ori_beta': event.beta,
        'ori_alpha': event.alpha
      }

      this.dataDeliver(dataPackage)
    },

    dataDeliver (data) {
      console.log(data)
    },

    socketTest () {
      const socket = io('http://47.101.33.187:1120')
      socket.emit('sensor')
    }
  }
}
</script>
