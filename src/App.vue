<template>
  <div id="app">
    <HomeView />
    <MenuView />
    <AboutView />
    <ContactView />
  </div>
</template>

<script>
import HomeView from "@/views/Home.view.vue";
import MenuView from "@/views/Menu.view.vue";
import AboutView from "@/views/About.view.vue";
import ContactView from "@/views/Contact.view.vue";
import AS from "@/services/Animation.service";

export default {
  name: 'App',
  components: {
    HomeView,
    MenuView,
    AboutView,
    ContactView,
  },
  mounted() {
    AS.setSmoothScroll();
  }
}
</script>
<style>
#app {
  min-height: 100vh;
  min-width: 100vw;
}
</style>
