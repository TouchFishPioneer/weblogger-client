<template>
  <div class="container">
    <div class="col-xs-12">
      <br>

      <b-alert :show="!supportMotionSensors" variant="danger">
        <strong>Caution!</strong>
        This device do not support inertial sensors, please open this page on your mobile devices.
      </b-alert>

      <b-card bg-variant="primary" text-variant="white" header="WELCOME!" align="left">
        <p>Thanks for your cooperation with the project of keystroke deduction based on inertial sensors. Before operating, please notice the following requirements:</p>
        <ul>
          <li>Please enter your nickname in the input area below. This nickname is only used to distinguish users.</li>
          <li>Once you start your input operation, please input the
            <strong>4-digit-number</strong> corresponding to the prompt box.
          </li>
          <li>If you accidentally enter the wrong number, please
            <strong>do not press the delete button on your keyboard</strong> and continue to input until all
            <strong>4 digits</strong> have been entered, the system will automatically clear the recordings. Then you can re-enter the correct number again.
          </li>
          <li>During the keystroke process, please
            <strong>avoid moving your device significantly</strong> and complete the data entry in a natural position.
          </li>
        </ul>
      </b-card>
    </div>

    <br>

    <div class="col-xs-12">
      <strong>PLEASE ENTER YOUR NICKNAME</strong>
      <b-form-input
        type="text"
        v-model="name"
        :state="nameState"
        @keyup.native="inputboxCheck"
        aria-describedby="inputFeedback"
        placeholder="Please input your nickname."
      >
      </b-form-input>

      <b-form-invalid-feedback id="inputFeedback">
        Your nickname should not be null or more than 16 characters.
      </b-form-invalid-feedback>

    </div>

    <br>

    <div class="col-xs-12">
      <b-button variant="primary" :disabled="startButtonDisplay" @click="login">START</b-button>
    </div>
  </div>
</template>

<script>
import store from '../store'
import router from '../router'

export default {
  name: 'welcome',
  data () {
    return {
      name: '',
      supportMotionSensors: true,
      nameState: null
    }
  },

  created () {
    this.sensorSupportCheck()
  },

  computed: {
    startButtonDisplay () {
      if (this.nameState === true && this.supportMotionSensors === true) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    sensorSupportCheck () {
      if (navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        console.log(navigator.userAgent)
        this.supportMotionSensors = true
      } else {
        console.log(navigator.userAgent)
        console.log('pc')
        this.supportMotionSensors = false
      }
    },

    inputboxCheck () {
      if (this.name.length <= 16 && this.name.length > 0) {
        this.nameState = true
      } else {
        this.nameState = false
      }
    },

    login () {
      store.commit('SET_NAME', this.name)
      router.push('index')
    }
  }
}
</script>
