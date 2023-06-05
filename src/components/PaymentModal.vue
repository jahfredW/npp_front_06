<template>
    <div class="modal">
      <div class="modal-content">
        <iframe :src="paymentUrl"></iframe>
      </div>
    </div>
  </template>

<script setup>


const props = defineProps({
    paymentUrl: String,
    default: 'No Content'
})

</script>