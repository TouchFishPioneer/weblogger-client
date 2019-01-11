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
            <b-form-input type="tel"></b-form-input>
          </b-input-group>
        </div>

        <br>

        <div>
          <strong>OVERALL PROGRESS</strong>
          <b-progress variant="success" striped="striped" :animated="true" :max="max" height="25px">
            <b-progress-bar :value="progress">
              <strong>{{ progress }} / {{ max }}</strong>
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
import store from '../store'
import { fetchPinArray } from '../api/pins'

export default {
  name: 'index',
  data () {
    return {
      alertSensorSupport: false,
      max: 50,
      username: '',
      pins: [],
      progress: 0
    }
  },

  async created () {
    await this.initialize()
    await this.getName()
    await this.getPins()
  },

  methods: {
    async initialize () {
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        this.alertSensorSupport = false
      } else {
        this.alertSensorSupport = true
      }
    },

    async getName () {
      if (localStorage.getItem('name') == null) {
        this.username = store.state.name
      } else {
        this.username = localStorage.getItem('name')
      }
    },

    async getPins () {
      fetchPinArray().then(async res => {
        this.pins = res.data.pins
        this.max = res.data.pins.length
      })
    }
  }
}
</script>
