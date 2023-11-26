<template>
  <button @click="openPopup">Открыть окно</button>
  <Popup
    :is-open="isPopupOpen"
    @ok="popupConfirmed"
    @close="isPopupOpen = false"
  >
    Вы действительно хотите освоить правильные подходы к проектированию систем
    во Vue?
    <template #actions="{ confirm }">
      Напишите
      <input :placeholder="$options.CONFIRMATION_TEXT" v-model="confirmation" />
      &nbsp;
      <button @click="confirm" :disabled="!isConfirmationCorrect">OK</button>
    </template>
  </Popup>
</template>

<script>
import Popup from "./components/MyPopup.vue";
export default {
  components: { Popup },
  data() {
    return { isPopupOpen: false, confirmation: "" };
  },

  CONFIRMATION_TEXT: "ПОДТВЕРЖДАЮ",

  computed: {
    isConfirmationCorrect() {
      return this.confirmation === this.$options.CONFIRMATION_TEXT;
    },
  },

  methods: {
    openPopup() {
      this.confirmation = "";
      this.isPopupOpen = true;
    },

    popupConfirmed() {
      alert("Confirmed!");
      this.isPopupOpen = false;
    },
  },
};
</script>

