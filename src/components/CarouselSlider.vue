<template>
  <section class="CarouselSlider">
    <div class="CarouselSlider-carousel">
      <div ref="carouselViewport" class="CarouselSlider-viewport">
        <div class="CarouselSlider-container">
          <slot></slot>
        </div>
      </div>

      <!-- controls -->
      <template v-if="carousel && showControls">
        <button
          class="CarouselSlider-control CarouselSlider-control--prev"
          type="button"
          :disabled="isPrevDisabled"
          @click="prevButtonClicked"
        >
          <svg
            class="CarouselSlider-controlSvg"
            viewBox="137.718 -1.001 366.563 643.999"
          >
            <path
              d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z"
            ></path>
          </svg>
        </button>
        <button
          class="CarouselSlider-control CarouselSlider-control--next"
          type="button"
          :disabled="isNextDisabled"
          @click="nextButtonClicked"
        >
          <svg
            class="CarouselSlider-controlSvg"
            viewBox="0 0 238.003 238.003"
          >
            <path
              d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z"
            ></path>
          </svg>
        </button>
      </template>
    </div>

    <!-- navigation -->
    <div
      v-if="showNavigation"
      ref="navigation"
      class="CarouselSlider-navigation"
    >
      <button
        v-for="(item, i) in new Array(navigationLength)"
        :key="i"
        class="CarouselSlider-navigationButton"
        :class="{ 'is-selected': currentSelected === i }"
        @click="carousel.scrollTo(i)"
      ></button>
    </div>
  </section>
</template>

<script>
import EmblaCarousel from "embla-carousel";

export default {
  name: "CarouselSlider",
  props: {
    /**
     * Whether the next and previous button are shown
     */
    showControls: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * Whether the navigation bellow the slider is shown
     */
    showNavigation: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * Start over when reaching the last slide
     */
    loop: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * Slides alignment `start`, `center`, `end`
     */
    align: {
      type: String,
      required: false,
      default: "start",
      validator: (value) => {
        const accepted = ["start", "center", "end"];
        return accepted.includes(value);
      }
    },
    /**
     * Amount of slides to scroll at once
     */
    slidesToScroll: {
      type: Number,
      required: false,
      default: 1
    },
    /**
     * Scroll on dragg
     */
    draggable: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * Animation speed
     */
    speed: {
      type: Number,
      required: false,
      default: 10
    },
    /**
     * Set the initial scroll snap to the given number. First snap index starts at 0. Please note that this is not necessarily equal to the number of slides when used together with the slidesToScroll option.
     */
    startIndex: {
      type: Number,
      required: false,
      default: 0
    },
    /**
     * Class to apply to the elements in viewport
     */
    selectedClass: {
      type: String,
      required: false,
      default: "is-selected"
    },
    /**
     * Class to apply to the draggable carousel container
     */
    draggableClass: {
      type: String,
      required: false,
      default: "is-draggable"
    },
    /**
     * Classname that will be applied to the container when dragging
     */
    draggingClass: {
      type: String,
      required: false,
      default: "is-dragging"
    }
  },

  data() {
    return {
      carousel: null,
      navigationLength: 0,
      currentSelected: null,
      isPrevDisabled: false,
      isNextDisabled: false
    };
  },

  mounted() {
    const viewPort = this.$refs.carouselViewport;
    this.carousel = EmblaCarousel(viewPort, {
      skipSnaps: false,
      loop: this.loop,
      slidesToScroll: this.slidesToScroll,
      align: this.align,
      draggable: this.draggable,
      speed: this.speed,
      startIndex: this.startIndex,
      selectedClass: this.selectedClass,
      draggableClass: this.draggableClass,
      draggingClass: this.draggableClass,
      containScroll: "trimSnaps"
    });
    this.setNavigationLength();
    this.setCarouselListener();
  },

  methods: {
    setNavigationLength() {
      this.navigationLength = this.carousel
        ? this.carousel.scrollSnapList().length
        : 0;
    },

    setCarouselListener() {
      this.carousel?.on("init", this.selectNavigationButton);
      this.carousel?.on("init", this.setControlsState);
      this.carousel?.on("select", this.selectNavigationButton);
      this.carousel?.on("select", this.setControlsState);
    },

    selectNavigationButton() {
      this.currentSelected = this.carousel?.selectedScrollSnap() ?? null;
    },

    setControlsState() {
      this.isPrevDisabled = !this.carousel?.canScrollPrev();
      this.isNextDisabled = !this.carousel?.canScrollNext();
    },

    slideClicked(item) {
      /**
       * Emits an event when an slide has been clicked
       * The payload is the CarouselSliderItem of the slide
       *
       * @event select
       */
      this.$emit("select", item);
    },

    prevButtonClicked() {
      /**
       * Emits an event when previous button has been clicked
       *
       * @event previous
       */
      this.$emit("prev");
      this.carousel?.scrollPrev();
    },

    nextButtonClicked() {
      /**
       * Emits an event when next button has been clicked
       *
       * @event next
       */
      this.$emit("next");
      this.carousel?.scrollNext();
    }
  }
};
</script>

<style lang="scss">
 @import "@/styles/variables.scss";

.CarouselSlider {
  &-carousel {
    position: relative;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  &-viewport {
    overflow: hidden;
    width: 100%;

    &.is-draggable {
      cursor: move;
      cursor: grab;
    }

    &.is-dragging {
      cursor: grabbing;
    }
  }

  &-container {
    display: flex;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
    margin-left: -10px;
    
    & > div, 
    & > article, 
    & > section {
      position: relative;
      min-width: 100%;
      padding-left: 10px;
    }
  }


  &-slideInner {
    position: relative;
    overflow: hidden;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  &-slideImg {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    width: auto;
    min-height: 100%;
    min-width: 100%;
    max-width: none;
    transform: translate(-50%, -50%);
  }

  &-slideText {
    background: white;
    z-index: 1;
  }

  &-control {
    outline: 0;
    cursor: pointer;
    background-color: transparent;
    touch-action: manipulation;
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    fill: gray;
    padding: 0;

    &:disabled {
      cursor: default;
      opacity: 0.3;
    }

    &--prev {
      left: 27px;
    }

    &--next {
      right: 27px;
    }
  }

  &-controlSvg {
    width: 100%;
    height: 100%;
  }

  &-navigation {
    display: flex;
    list-style: none;
    justify-content: center;
    padding-top: 10px;
  }

  &-navigationButton {
    background-color: transparent;
    cursor: pointer;
    position: relative;
    padding: 0;
    outline: 0;
    border: 0;
    width: 30px;
    height: 30px;
    margin-right: 7.5px;
    margin-left: 7.5px;
    display: flex;
    align-items: center;

    &:after {
      background-color: $gray-200;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      content: "";
    }

    &.is-selected:after {
      background-color: $primary;
      opacity: 1;
    }
  }
}
</style>
