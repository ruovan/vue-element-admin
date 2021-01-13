<template>
  <div class="navbar-logo-container" :class="{ collapse: collapse }">
    <div class="navbar-logo-link">
      <img v-if="logo" :src="logo" class="navbar-logo" />
      <h1 class="navbar-title">{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vue Admin Template',
      logo:
        'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
