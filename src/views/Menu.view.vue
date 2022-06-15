<template>
  <section class="MenuView View" id="menu">
    <h1 class="MenuView-title">Menu</h1>
    <CarouselSlider :show-controls="false" v-loading="isLoading">
      <article class="MenuView-menu">
        <h2 class="MenuView-subtitle">Cafe</h2>
        <ul>
          <li v-for="item, i in coffeeMenu" :key="i" class="MenuView-item">
            <span class="MenuView-itemContent">
              <span class="MenuView-itemTitle">
                {{ item[0] | capitalize }}
              </span>
              <span class="MenuView-itemDescription" v-if="item[1]">
                {{ item[1] | capitalize }}
              </span>
            </span>
            <span class="MenuView-itemPrice">
              € {{ item[2] }}
            </span>
          </li>
        </ul>
      </article>
      <article class="MenuView-menu">
        <h2 class="MenuView-subtitle">Comida</h2>
        <ul>
          <li v-for="item, i in foodMenu" :key="i" class="MenuView-item">
            <span class="MenuView-itemContent">
              <span class="MenuView-itemTitle">
                {{ item[0] | capitalize }}
              </span>
              <span class="MenuView-itemDescription" v-if="item[1]">
                {{ item[1] | capitalize }}
              </span>
            </span>
            <span class="MenuView-itemPrice">
              € {{ item[2] }}
            </span>
          </li>
        </ul>
      </article>
    </CarouselSlider>
  </section>
</template>
<script>
import MenuService from "@/services/Menu.service";
import CarouselSlider from "@/components/CarouselSlider.vue";
import AS from "@/services/Animation.service";

export default {
  name: "MenuView",

  components: {
    CarouselSlider
  },
  
  data() {
    return {
      coffeeMenu: null,
      foodMenu: null,
      isLoading: false,
    }
  },

  async mounted() {
    await this.getMenuData();
    this.setIntroImageTransition();
    this.setOutroTitleTransition();
    this.setOutroMenuTransition();
    this.setOutroImageTransition();
  },

  methods: {
    async getMenuData() {
      this.isLoading = true;
      const coffeeData = await MenuService.getCoffeeMenu();
      const foodData = await MenuService.getFoodMenu();
      this.coffeeMenu = coffeeData.values;
      this.foodMenu = foodData.values;
      this.isLoading = false;
    },

    setIntroImageTransition() {
      const TARGET_SEL = ".MenuView";
      const TRIGGER_ELEMENT_SEL = "#menu";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "top bottom",
            end: "bottom bottom",
          },
          backgroundPosition: `50% ${AS.helpers.vh(100)}`,
        },
      };

      AS.timeline.from(TARGET_SEL, animationOptions);
    },

    setOutroTitleTransition() {
      const TARGET_SEL = ".MenuView-title";
      const TRIGGER_ELEMENT_SEL = "#about";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "top bottom",
            end: "bottom bottom",
          },
          x: -AS.helpers.vw(50),
        },
      };

      AS.timeline.to(TARGET_SEL, animationOptions);
    },

    setOutroMenuTransition() {
      const TARGET_SEL = ".CarouselSlider";
      const TRIGGER_ELEMENT_SEL = "#about";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "25% bottom",
            end: "top center",
          },
          x: AS.helpers.vw(100),
        },
      };

      AS.timeline.to(TARGET_SEL, animationOptions);
    },

    setOutroImageTransition() {
      const TARGET_SEL = ".MenuView";
      const TRIGGER_ELEMENT_SEL = "#about";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "25% bottom",
            end: "bottom bottom",
          },
          backgroundSize: "175vw",
        },
      };

      AS.timeline.to(TARGET_SEL, animationOptions);
    },
  },
  
  filters: {
    capitalize: function (value) {
      if (!value) return '';
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.MenuView {
  background: $black url("@/assets/images/eyes_white.svg") no-repeat;
  background-position: 50% 100%;
  background-size: 80vw;
  color: $white;

  &-title {
    font-size: 3rem;
    margin: 0;
  }

  &-subtitle {
    font-size: 2rem;
    margin: 0;
  }

  &-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: $gap / 4;
  }

  &-itemContent {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  &-itemTitle {
    font-weight: bold;
  }

  &-itemDescription {
    font-size: 14px;
    color: $gray-200;
  }
}
</style>