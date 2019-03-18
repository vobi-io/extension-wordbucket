<template>
  <div class="wordbucket-button wordbucket-inline-finder" :style="position" @click="translate($event)"></div>
</template>
<script>
  import EventBus from '../../../ext/eventBus'
  import Vue from 'vue'
  import InlineDropdown from './InlineDropdown.vue'

  export default {
    props: ['position', 'settings', 'text'],
    data: () => ({ }),
    computed: { },
    created () {
      EventBus.$on('destroyInlineFinder', () => this.selfDestroy())
    },
    mounted () { },
    methods: {
      translate (event) {
        this.setupDropdown(event)
        this.selfDestroy()
      },
      selfDestroy () {
        if (this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el)
        }
      },
      setupDropdown (e) {
        var ComponentClass = Vue.extend(InlineDropdown)
        var instance = new ComponentClass({
          propsData: {
            position: {
              top: `${event.pageY + 5}px`,
              left: `${event.pageX + 5}px`
            },
            settings: this.settings,
            text: this.text
          }
        })
        instance.$mount()
        document.body.appendChild(instance.$el)
      }
    }
  }
</script>
<style scoped>

.wordbucket-button {
	position:absolute;
	z-index: 10;
	width: 23px;
	height: 23px;
	background-image: url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNTEyLjAwMDEyIDUxMiIgd2lkdGg9IjUxMnB4Ij48cGF0aCBkPSJtMzY3LjkzMzU5NCAxMTkuMDgyMDMxaC0uMDcwMzEzYzEzLjk2ODc1IDQ0LjI4NTE1NyAyMC45MDIzNDQgOTAuNDg0Mzc1IDIwLjU1MDc4MSAxMzYuOTE3OTY5aDEyMy41ODU5MzhjLjExNzE4OC02Mi4xMzI4MTItMjIuNDg4MjgxLTEyMi4xNjQwNjItNjMuNTU4NTk0LTE2OC43ODUxNTYtMjUuMTU2MjUgMTQuNDUzMTI1LTUyLjI3MzQzNyAyNS4xODc1LTgwLjUwNzgxMiAzMS44NjcxODd6bTAgMCIgZmlsbD0iIzk2YzhlZiIvPjxwYXRoIGQ9Im0xNDQuMTM2NzE5IDExOS4xMDE1NjJoLS4wNzAzMTNjLTI4LjIzNDM3NS02LjY3OTY4Ny01NS4zNTE1NjItMTcuNDE0MDYyLTgwLjUwNzgxMi0zMS44NjcxODctNDEuMDY2NDA2IDQ2LjYxNzE4Ny02My42NzE4NzUgMTA2LjY0MDYyNS02My41NTg1OTQgMTY4Ljc2NTYyNWgxMjMuNTg1OTM4Yy0uMzUxNTYzLTQ2LjQyNTc4MSA2LjU4MjAzMS05Mi42MjEwOTQgMjAuNTUwNzgxLTEzNi44OTg0Mzh6bTAgMCIgZmlsbD0iIzVhYWFlNyIvPjxwYXRoIGQ9Im0xNDQuMTM2NzE5IDM5Mi44OTg0MzhjLTEzLjk2ODc1LTQ0LjI3NzM0NC0yMC45MDIzNDQtOTAuNDcyNjU3LTIwLjU1MDc4MS0xMzYuODk4NDM4aC0xMjMuNTg1OTM4Yy0uMTE3MTg4IDYyLjEzMjgxMiAyMi40ODgyODEgMTIyLjE2MDE1NiA2My41NTg1OTQgMTY4Ljc4MTI1IDI1LjE1NjI1LTE0LjQ1MzEyNSA1Mi4yNzM0MzctMjUuMTg3NSA4MC41MDc4MTItMzEuODY3MTg4em0wIDAiIGZpbGw9IiMzZDlhZTIiLz48cGF0aCBkPSJtMzY3Ljg2MzI4MSAzOTIuODk4NDM4aC4wNzAzMTNjMjguMjM0Mzc1IDYuNjc5Njg3IDU1LjM1MTU2MiAxNy40MTQwNjIgODAuNTA3ODEyIDMxLjg2NzE4NyA0MS4wNjY0MDYtNDYuNjE3MTg3IDYzLjY3MTg3NS0xMDYuNjQwNjI1IDYzLjU1ODU5NC0xNjguNzY1NjI1aC0xMjMuNTg1OTM4Yy4zNTE1NjMgNDYuNDI1NzgxLTYuNTgyMDMxIDkyLjYyMTA5NC0yMC41NTA3ODEgMTM2Ljg5ODQzOHptMCAwIiBmaWxsPSIjNzhiOWViIi8+PHBhdGggZD0ibTEyMy41ODU5MzggMjU2Yy0uMzUxNTYzIDQ2LjQyNTc4MSA2LjU4MjAzMSA5Mi42MjEwOTQgMjAuNTUwNzgxIDEzNi44OTg0MzggMzYuNTk3NjU2LTkuMDE1NjI2IDc0LjE3MTg3NS0xMy40ODgyODIgMTExLjg2MzI4MS0xMy4zMTI1di0xMjMuNTg1OTM4em0wIDAiIGZpbGw9IiMxZTgxY2UiLz48cGF0aCBkPSJtMjU2IDM3OS41ODU5MzhjMzcuNjkxNDA2LS4xNzU3ODIgNzUuMjYxNzE5IDQuMjk2ODc0IDExMS44NjMyODEgMTMuMzEyNSAxMy45Njg3NS00NC4yNzczNDQgMjAuOTAyMzQ0LTkwLjQ3MjY1NyAyMC41NTA3ODEtMTM2Ljg5ODQzOGgtMTMyLjQxNDA2MnptMCAwIiBmaWxsPSIjNWFhYWU3Ii8+PHBhdGggZD0ibTI1NiAxMzIuNDE0MDYyYy0zNy42OTE0MDYuMTc1NzgyLTc1LjI2NTYyNS00LjI5Njg3NC0xMTEuODYzMjgxLTEzLjMxMjUtMTMuOTY4NzUgNDQuMjc3MzQ0LTIwLjkwMjM0NCA5MC40Njg3NS0yMC41NTA3ODEgMTM2Ljg5ODQzOGgxMzIuNDE0MDYyem0wIDAiIGZpbGw9IiMzZDlhZTIiLz48cGF0aCBkPSJtMjU2IDI1NmgxMzIuNDE0MDYyYy4zNTE1NjMtNDYuNDI1NzgxLTYuNTgyMDMxLTkyLjYyMTA5NC0yMC41NTA3ODEtMTM2Ljg5ODQzOC0zNi42MDE1NjIgOS4wMTU2MjYtNzQuMTcxODc1IDEzLjQ4ODI4Mi0xMTEuODYzMjgxIDEzLjMxMjV6bTAgMCIgZmlsbD0iIzc4YjllYiIvPjxwYXRoIGQ9Im0xNDQuMTM2NzE5IDExOS4xMDE1NjJjMjMuNDcyNjU2LTcxLjU2NjQwNiA2NC43ODUxNTYtMTE5LjEwMTU2MiAxMTEuODYzMjgxLTExOS4xMDE1NjItNzMuNzM4MjgxLS4xMDU0NjktMTQzLjkxNDA2MiAzMS42OTkyMTktMTkyLjQ0MTQwNiA4Ny4yMTQ4NDQgMjUuMTU2MjUgMTQuNDUzMTI1IDUyLjI3MzQzNyAyNS4xODc1IDgwLjUwNzgxMiAzMS44NjcxODd6bTAgMCIgZmlsbD0iIzc4YjllYiIvPjxwYXRoIGQ9Im0zNjcuODYzMjgxIDExOS4xMDE1NjJoLjA3MDMxM2MyOC4yMzQzNzUtNi42Nzk2ODcgNTUuMzUxNTYyLTE3LjQxNDA2MiA4MC41MDc4MTItMzEuODY3MTg3LTQ4LjUyNzM0NC01NS41MjM0MzctMTE4LjcwMzEyNS04Ny4zMzU5MzctMTkyLjQ0MTQwNi04Ny4yMzQzNzUgNDcuMDc4MTI1IDAgODguMzkwNjI1IDQ3LjUzNTE1NiAxMTEuODYzMjgxIDExOS4xMDE1NjJ6bTAgMCIgZmlsbD0iI2MyZGZmNiIvPjxwYXRoIGQ9Im0xNDQuMTM2NzE5IDExOS4xMDE1NjJjMzYuNTk3NjU2IDkuMDE1NjI2IDc0LjE3MTg3NSAxMy40ODgyODIgMTExLjg2MzI4MSAxMy4zMTI1di0xMzIuNDE0MDYyYy00Ny4wNzgxMjUgMC04OC4zOTA2MjUgNDcuNTM1MTU2LTExMS44NjMyODEgMTE5LjEwMTU2MnptMCAwIiBmaWxsPSIjNWFhYWU3Ii8+PHBhdGggZD0ibTM2Ny44NjMyODEgMTE5LjEwMTU2MmMtMjMuNDcyNjU2LTcxLjU2NjQwNi02NC43ODUxNTYtMTE5LjEwMTU2Mi0xMTEuODYzMjgxLTExOS4xMDE1NjJ2MTMyLjQxNDA2MmMzNy42OTE0MDYuMTc1NzgyIDc1LjI2MTcxOS00LjI5Njg3NCAxMTEuODYzMjgxLTEzLjMxMjV6bTAgMCIgZmlsbD0iIzk2YzhlZiIvPjxwYXRoIGQ9Im0xNDQuMTM2NzE5IDM5Mi44OTg0MzhoLS4wNzAzMTNjLTI4LjIzNDM3NSA2LjY3OTY4Ny01NS4zNTE1NjIgMTcuNDE0MDYyLTgwLjUwNzgxMiAzMS44NjcxODcgNDguNTI3MzQ0IDU1LjUyMzQzNyAxMTguNzAzMTI1IDg3LjMzMjAzMSAxOTIuNDQxNDA2IDg3LjIzNDM3NS00Ny4wNzgxMjUgMC04OC4zOTA2MjUtNDcuNTM5MDYyLTExMS44NjMyODEtMTE5LjEwMTU2MnptMCAwIiBmaWxsPSIjMWU4MWNlIi8+PHBhdGggZD0ibTM2Ny44NjMyODEgMzkyLjg5ODQzOGMtMjMuNDcyNjU2IDcxLjU2MjUtNjQuNzg1MTU2IDExOS4xMDE1NjItMTExLjg2MzI4MSAxMTkuMTAxNTYyIDczLjczODI4MS4xMDE1NjIgMTQzLjkxMDE1Ni0zMS42OTkyMTkgMTkyLjQ0MTQwNi04Ny4yMTg3NS0yNS4xNTYyNS0xNC40NTMxMjUtNTIuMjczNDM3LTI1LjE4NzUtODAuNTA3ODEyLTMxLjg2NzE4OHptMCAwIiBmaWxsPSIjNWFhYWU3Ii8+PHBhdGggZD0ibTE0NC4xMzY3MTkgMzkyLjg5ODQzOGMyMy40NzI2NTYgNzEuNTYyNSA2NC43ODUxNTYgMTE5LjEwMTU2MiAxMTEuODYzMjgxIDExOS4xMDE1NjJ2LTEzMi40MTQwNjJjLTM3LjY5MTQwNi0uMTc1NzgyLTc1LjI2NTYyNSA0LjI5Njg3NC0xMTEuODYzMjgxIDEzLjMxMjV6bTAgMCIgZmlsbD0iIzFhNmZiMCIvPjxwYXRoIGQ9Im0zNjcuODYzMjgxIDM5Mi44OTg0MzhjLTM2LjYwMTU2Mi05LjAxNTYyNi03NC4xNzE4NzUtMTMuNDg4MjgyLTExMS44NjMyODEtMTMuMzEyNXYxMzIuNDE0MDYyYzQ3LjA3ODEyNSAwIDg4LjM5MDYyNS00Ny41MzkwNjIgMTExLjg2MzI4MS0xMTkuMTAxNTYyem0wIDAiIGZpbGw9IiMzZDlhZTIiLz48L3N2Zz4K');
	background-size: 19px;
	background-repeat: no-repeat;
	background-position: center;
	background-color: white;
	border-radius: 4px;
	border: 1px solid #e7e7e7;
	cursor: pointer;
}
.wordbucket-button:hover {
	-webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;   
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
  
</style>