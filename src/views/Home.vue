<template>
  <div>
    <add-expense />

    <b-card title="Kick start your project 🚀">
      <b-card-text>Contact <b-link
        href="https://objective-solutions.com"
        target="_blank"
      >
        Objective Solutions Ltd.
      </b-link> on how to get started.</b-card-text>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText, BLink } from 'bootstrap-vue'
import AddExpense from '@/views/expenses/AddExpense.vue'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    AddExpense,
  },
}
</script>

<style>

</style>
