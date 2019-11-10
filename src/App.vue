<template>
    <router-view></router-view>  
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      panel: ''
    }
  },
  methods: {
    toggle (panel) {
      this.panel = panel === this.panel ? '' : panel;
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container{
max-width:100%;
}
.mu-appbar{
  background-color: #00142a
  }
  .mu-appbar{
  color:white
  }
  .mu-list{
    background-color: rgb(0, 20, 42)
  }
  .mu-list-item-title{
    color: white
  }
  .mu-item-title{
    color:white;
  }
  .mu-icon {
    color: white;
  }

  
</style>
