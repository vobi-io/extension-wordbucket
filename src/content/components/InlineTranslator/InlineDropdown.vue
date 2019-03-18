<template>
  <div class="wordbucket wrapper wordbucket-inline-translator" :style="position">
    <div class="inline-wrapper">
      <ul v-if="!isLoading">
        <li v-for="(translation, i) in translations" :key="'1'+translation.i">
          <div>
            <button class="wordbucket" @click="save(translation)">Save</button>
            <span class="key">{{ translation.key }}</span>
            <span class="value">{{ translation.value }}</span>
          </div>
        </li>
      </ul>

      <div v-if="isLoading" class="lds-ripple"><div></div><div></div></div>
    </div>
  </div>
</template>
<script>
  // import Vue from 'vue'
  // import InlineDropdown from './InlineDropdown.vue'

  // // import axios from 'axios'
  // import { isEmpty } from 'lodash'
  // // import chromeStorage from '../../../ext/chromeStorage'
  // import { getSelectedText } from '../../../ext/utils'
  import Api from '../../../ext/api.js'
  import EventBus from '../../../ext/eventBus'

  export default {
    props: ['settings', 'position', 'text'],
    data: () => ({
      isLoading: true,
      translations: []
    }),
    computed: { },
    created () {
      this.translate()
      EventBus.$on('destroyInlineDropdown', () => this.selfDestroy())
    },
    mounted () { },
    methods: {
      async translate () {
        this.isLoading = true
        const { translations } = await Api.translate(this.text)
        this.isLoading = false
        this.translations = translations.filter(item => !!item)
      },
      async save (translation) {
        Api.save(translation)
        this.selfDestroy()
      },
      selfDestroy () {
        if (this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    position: absolute;
    z-index: 10;
    min-width: 200px;
    min-height: 100px;
    max-width: 400px;
    background-size: 19px;
    background: #fff;

    border-radius: .5rem;
    -webkit-box-shadow: 4px 4px 15px 0 rgba(36,37,38,.08);
    box-shadow: 4px 4px 15px 0 rgba(36,37,38,.08);
    padding: 15px;

    .inline-wrapper {
      position: relative;
      position: relative;
      width: 100%;
      height: 100%;

      .lds-ripple {
          position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -32px;
        margin-top: 14px;
      }
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      
      li {
        > div {
          /* display: flex;
          align-items: center; */

          button {
            border: 1px solid rgb(218, 220, 224);
            padding: 8px 16px;
            border-radius: 4px!important;
            color: #1a73e8!important;
            background-color: white!important;
          }

          .key {
            padding: 0px 10px;
            font-weight: bold;
          }
          .value {

          }
        }

        &:not(:last-child) {
          margin-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #eaeefb;
          padding-bottom: 10px;
        }
      }

    }
  }



  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #cef;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 28px;
      left: 28px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 58px;
      height: 58px;
      opacity: 0;
    }
  }


</style>