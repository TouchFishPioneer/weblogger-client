<template>
  <div class="container">
    <div class="col-xs-12">
      <br>

      <b-alert show variant="success">
        <h4 class="alert-heading">Well done!</h4>
        <p>You have completed all the work required, thank you again for your cooperation.</p>
        <hr>
        <p class="mb-0">You can exit this application by clicking the
          <strong>Exit</strong> button or click the
          <strong>Re-enter</strong> button to start another round of input.
        </p>
      </b-alert>

      <br>

      <div>
        <b-button variant="danger" style="margin-right: 10px" @click="exit">Exit</b-button>
        <b-button variant="primary" @click="retry">Re-enter</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'thanks',
  methods: {
    retry () {
      router.push('index')
    },

    exit () {
      router.push('/')
    }
  }
}
</script>
