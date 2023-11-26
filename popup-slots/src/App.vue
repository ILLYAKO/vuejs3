<template>
  <button @click="learnVue">Изучить Vue</button>
  <Popup ref="confirmationPopup">
    Вы действительно хотите освоить правильные подходы к проектированию систем
    во Vue?
    <template #actions="{ confirm }">
      Напишите
      <input :placeholder="$options.CONFIRMATION_TEXT" v-model="confirmation" />
      &nbsp;
      <button @click="confirm" :disabled="isConfirmationCorrect">OK</button>
    </template>
  </Popup>
</template>

<script>
import Popup from "./components/MyPopup.vue";
export default {
  components: { Popup },
  data() {
    return { confirmation: "" };
  },

  CONFIRMATION_TEXT: "ПОДТВЕРЖДАЮ",

  computed: {
    isConfirmationCorrect() {
      return this.confirmation === this.$options.CONFIRMATION_TEXT;
    },
  },

  methods: {
    async learnVue() {
      this.confirmation = "";

      const popupResult = await this.$refs.confirmationPopup.open();

      if (popupResult) {
        alert("Confirmed!");
      }
    },
  },
};
</script>

