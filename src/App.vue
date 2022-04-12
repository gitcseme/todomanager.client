<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <h3 class="page-header">Dashboard</h3>
      </div>
      <div class="col-md-9">
        <nav>
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link> |
          <router-link to="/about">About</router-link>
        </nav>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
