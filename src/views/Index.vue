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
          <b-input-group size="lg" prepend="1823">
            <b-form-input></b-form-input>
          </b-input-group>
        </div>

        <br>

        <div>
          <strong>OVERALL PROGRESS</strong>
          <b-progress variant="success" striped="striped" :animated="true" :max="max" height="25px">
            <b-progress-bar :value="value">
              <strong>{{ value }} / {{ max }}</strong>
            </b-progress-bar>
          </b-progress>
        </div>
      </b-card>
    </div>

    <div class="footer">
      <p>
        <a href="https://herculas.cn" target="_blank">@Wurahara</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      alertSensorSupport: false,
      max: 50,
      value: 33
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      if (!window.DeviceMotionEvent || !window.DeviceOrientationEvent) {
        console.log('Do not support inertial sensors.')
        this.alertSensorSupport = true
      }

      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        console.log('mobile')
        console.log(navigator.userAgent)
      } else {
        console.log('pc')
      }
    }
  }
}
</script>
