<template>
  <div class="container">
    <div class="col-xs-12">
      <br>

      <b-card
        bg-variant="info"
        text-variant="white"
        header="THANKS FOR YOUR COOPERATION"
        align="left"
      >
        <p>Thanks for your cooperation with the project of keystroke deduction based on inertial sensors. Before operating, please notice the following requirements: </p>
        <ul>
          <li>Please enter your nickname in the input area below. This nickname is only used to distinguish users.</li>
          <li>Once you start your input operation, please input the <strong>4-digit-number</strong> corresponding to the prompt box.</li>
          <li>If you accidentally enter the wrong number, please <strong>do not press the delete button</strong> and continue inputing the numbers until <strong>4 digits</strong>, the system will automatically clear the recordings. Then you can re-enter the correct number again.</li>
          <li>During the keystroke process, please <strong>avoid moving the phone significantly</strong> and complete the data entry in a natural position.</li>
        </ul>
      </b-card>

    </div>

    <br>

    <div class="col-xs-12">
      <strong>PLEASE ENTER YOUR NICKNAME</strong>
      <b-form-input type="text" placeholder="In CN or EN, no more than 16 characters"></b-form-input>
    </div>

    <br>

    <div class="col-xs-12">
      <b-button variant="primary">START</b-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>
