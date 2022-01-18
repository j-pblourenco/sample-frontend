<template>
  <div class="topbar-container custom-shadow">
    <div class="topbar-logo">
      <img
        src="@/assets/images/logo.svg"
        class="topbar-logo"
        v-on:click="handleLogoClick()"
      />
    </div>
    <div class="topbar-search">
    </div>
    <div class="topbar-options">
      <button
        v-if="currentRouteName !== 'NewPost'"
        class="custom-btn new-post-btn"
        v-on:click="handleNewPostClick()"
      >
        New Post
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Topbar',
  props: {
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  },
  methods: {
    handleNewPostClick: function(){
      this.$router.push('/new-post');
    },
    handleLogoClick: function(){
      this.$router.push('/home/0');
    }
  }
}
</script>

<style scoped>
.topbar-container{
  height: 8vh;
  padding: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topbar-logo{
  height: 80%;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.new-post-btn{
  color: #fff;
  background-color: var(--primary);
  transition: ease-in-out 0.2s;
  font-family: 'Nunito', sans-serif !important;
}
.new-post-btn:hover{
  background-color: #fff;
  color: var(--primary);
  border: 1px solid var(--primary);
}
</style>
