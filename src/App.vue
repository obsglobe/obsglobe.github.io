<template>
  <div id="app">
    <v-content>
      <v-toolbar style="margin-bottom: 32px;">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Observatories over the Globe</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat href="https://github.com/obsglobe">
            <v-avatar size=42>
              <img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png">
            </v-avatar>
            Source Code</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
