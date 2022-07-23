<template>
  <div id="app">
    <SiteMenu />
    <div class="ViewsContainer">
      <HomeView />
      <MenuView />
      <AboutView />
      <ContactView />
    </div>
  </div>
</template>

<script>
import SiteMenu from "@/components/SiteMenu.vue";
import HomeView from "@/views/Home.view.vue";
import MenuView from "@/views/Menu.view.vue";
import AboutView from "@/views/About.view.vue";
import ContactView from "@/views/Contact.view.vue";
import AS from "@/services/Animation.service";

export default {
  name: 'App',
  components: {
    SiteMenu,
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
