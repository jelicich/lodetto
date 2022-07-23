<template>
  <section class="SiteMenu">
    <button 
      class="SiteMenu-hamburgerButton"
      :class="{'SiteMenu-hamburgerButton--open': isOpen, 'SiteMenu-hamburgerButton--closed': !isOpen}"
      @click="isOpen = !isOpen"
    ></button>
    <div 
      class="SiteMenu-navContainer" 
      :class="{'SiteMenu-navContainer--open': isOpen, 'SiteMenu-navContainer--closed': !isOpen}"
    >
      <nav class="SiteMenu-nav">
        <a href="#home" @click="isOpen = false">Inicio</a>
        <a href="#menu" @click="isOpen = false">Menu</a>
        <a href="#about" @click="isOpen = false">Nosotros</a>
        <a href="#contact" @click="isOpen = false">Contacto</a>
      </nav>
    </div>
  </section>
</template>

<script>
import AS from "@/services/Animation.service";

export default {
  name: "SiteMenu",
  props: {
    
  },

  data() {
    return {
      isOpen: false,
    };
  },

  mounted() {
    this.setMenuTransition();
  },

  methods: {
    setMenuTransition() {
      const TARGET_SEL = ".SiteMenu-hamburgerButton";
      const TRIGGER_ELEMENT_SEL = "#menu";
      const animationOptions = {
        runInMobile: true,
        gsapOptions: {
          scrollTrigger: {
            trigger: TRIGGER_ELEMENT_SEL,
            scrub: true,
            start: "top 25%",
            end: "top top",
          },
          x: +AS.helpers.vw(100),
        },
      };

      AS.timeline.from(TARGET_SEL, animationOptions);
    },
  }
};
</script>

<style lang="scss">
 @import "@/styles/variables.scss";
 @import "@/styles/breakpoints.scss";

.SiteMenu{
  position: fixed;
  right: 0;
  top: 10px;
  z-index: 10;

  @include desktop-up {
    display: none;
  }

  &-hamburgerButton {
    background: none;
    border: none;
    height: 50px;
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 1;
    width: 50px;
    
    &--closed {
      &::before,
      &::after {
        color: $primary;
        content: '-';
        font-family: "Bad Brush";
        font-size: 7rem;
        left: 3px;
        line-height: 10px;
        position: absolute;
        top: 15px;
      }
  
      &::after {
        content: '-';
        top: 30px;
      }
    }

    &--open {
      &::before {
        content: 'x';
        color: $white;
        font-family: "Bad Brush";
        font-size: 5rem;
        left: 12px;
        line-height: 10px;
        position: absolute;
        top: 15px;
      }
    }
  }

  &-navContainer {
    background: rgba(0, 0, 0, 0.9);
    height: 100vh;
    left: 0;
    padding: $gap;
    padding-top: 75px;
    position: fixed;
    top: 0;
    width: 100vw;

    &--open {
      display: block;
    }

    &--closed {
      display: none;
    }
  }

  &-nav {
    flex-direction: column;
    display: flex;

    a {
      color: $white;
      font-size: 2.5rem;
      margin-bottom: $gap / 2;
      text-transform: uppercase;
    }
  }
}
</style>
