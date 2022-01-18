<template>
  <div class="most-liked-posts-container">
    <p class="most-liked-posts-title">Most Recent Posts</p>

    <p
      v-for="post in posts"
      :key="post.id"
      class="most-liked-posts-item"
      v-on:click="goToPost(post.id)"
    >
      {{post.title}}
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MostRecentPosts',
  data() {
    return{
      posts: null,
    }
  },
  methods: {
    getMostRecentPosts() {
      // fetch 10 most recent posts from API
      var self = this;

      axios.get(`${process.env.VUE_APP_API_URL}/post/list/10/0`)
      .then(function (response) {
        console.log(response)
        if(response.data.ResultCode === 1){
          self.posts = response.data.posts;
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    goToPost(id){
      // go to post details view
      this.$router.push(`/post-details/${id}`);
    }
  },
  mounted() {
    this.getMostRecentPosts();
  },
}
</script>

<style scoped>
.most-liked-posts-container{
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  border-top: 30px solid var(--primary);
}
.most-liked-posts-title{
  font-size: 1.5em;
  margin: 0px;
  text-align: left;
}
.most-liked-posts-item{
  text-align: left;
  text-decoration: underline;
  cursor: pointer;
}
</style>
