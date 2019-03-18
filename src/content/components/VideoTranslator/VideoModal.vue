<template>
  <div id="wordbucket-video-model" class="wordbucket-video-modal-wrapper">
    <div class="wordbucket-video-word-list">
      <button @click="translate(word)" v-for="(word, i) in words" :key="word+i">
        {{word}}
      </button>
    </div>
    <div class="wordbucket-video-translation-list">
      <spinner v-if="isLoading"></spinner>
      <ul v-if="!isLoading">
        <li v-for="(translation, i) in translations" :key="translation.key+i">
          <button @click="save(translation)">save</button>
          <div>
            <span>{{translation.key}}</span> - <span>{{translation.value}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import Api from '../../../ext/api.js'
import Spinner from '../Spinner'

export default {
  props: ['domain', 'settings', 'text', 'videoTag'],
  components: {
    Spinner
  },
  data () {
    return {
      words: [],
      translations: [],
      isLoading: false
    }
  },
  methods: {
    async translate (text) {
      this.isLoading = true
      const { translations } = await Api.translate(text)
      this.translations = translations.filter(item => !!item)
      this.isLoading = false
    },
    async save (translation) {
      this.isLoading = true
      await Api.save(translation)
      this.isLoading = false
      this.destroy(true)
    },
    destroy (play) {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }

      if (play) {
        document.querySelector(this.videoTag).play()
      }
    },
    handleClick (event) {
      var container = document.getElementById('wordbucket-video-model')
      if (container !== event.target && !container.contains(event.target)) {
        this.destroy()
      }
    },
    handleVideoPlayed (event) {
      this.destroy(true)
    }
  },
  created () {
    this.words = this.text
      .match(/\S+\s*/g)
      .map(item => item.trim().replace(/[^a-zA-Z ]/g, ''))
      .filter(item => !!item && item.length > 0)

    this.translate(this.text)

    document.querySelector(this.videoTag).addEventListener('play', this.handleVideoPlayed)

    window.addEventListener('click', this.handleClick)
  },
  destroyed () {
    window.removeEventListener('click', this.handleClick)
    document.querySelector(this.videoTag).removeEventListener('resize', this.handleVideoPlayed)
  }
}
</script>

<style lang="scss" scoped>
.wordbucket-video-modal-wrapper {
	position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 400px;
  margin-left: -250px;
  margin-top: -200px;
  border-radius: 6px;
  background: #000000a3;
  color: white;
  display: flex;
  flex-direction: column;
  
  > div::-webkit-scrollbar-thumb{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }
  
  .wordbucket-video-word-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px;
    font-size: 22px;
    overflow-x: scroll;

    button {
      background: gray;
      border-radius: 5px;
      padding: 3px 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }

  .wordbucket-video-translation-list {
    overflow-y: scroll;

     button {
      background: gray;
      border-radius: 5px;
      padding: 3px 15px;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
    }

    li {
      display: flex;
      font-size: 18px;
      padding: 5px 16px;
      font-size: 22px;
      font-family: "Helvetica Neue Custom", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-weight: 400;
    }
  }

  button {
    border: 0;
    border-radius: 3px;
    color: white;
    font-size: 22px;
    font-family: "Helvetica Neue Custom", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 400;
  }
}
</style>
