<template>
  <div class="sidebar-container custom-shadow">
    <p class="sidebar-title">Welcome to <span class="sidebar-sitename">Redclip</span> 👋</p>
    <p class="sidebar-text">
      Hello there!
      This is Redclip, created on January 2022 by a developer with a dream.
      A dream he hoped to achieve while building this website.
      And, from his passion Redclip was born. Now you can use this platform to share
      anything you want with the world.
    </p>
    <p class="sidebar-title">Rules</p>
    <ol class="sidebar-text">
      <li>Be polite</li>
      <li>Be friendly</li>
      <li>No hateful posts</li>
      <li>Have fun</li>
    </ol>
  </div>
</template>

<script>

export default {
  name: 'Sidebar',
}
</script>

<style scoped>
.sidebar-container{
  width: 90%;
  margin-left: 10%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  border-top: 30px solid var(--primary);
}
.sidebar-title{
  margin: 0px;
  font-size: 1.7em;
  text-align: left;
}
.sidebar-sitename{
  color: var(--primary);
  font-weight: 600;
}
.sidebar-text{
  margin: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
}
</style>
