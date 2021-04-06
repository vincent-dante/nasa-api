<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="div-content">
          <router-view/>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.div-content {
  margin-bottom: 200px;
}
</style>
