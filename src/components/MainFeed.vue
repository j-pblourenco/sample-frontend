<template>
  <div class="main-feed">
    <FeedListItem v-for="post in posts" :key="post.id" :post="post" v-on:onPostLiked="onPostLiked" />
    <p v-if="posts.length === 0">There aren't any posts yet :(</p>
  </div>
</template>

<script>
import FeedListItem from '@/components/FeedListItem.vue'

export default {
  name: 'MainFeed',
  props: {
    posts: Object
  },
  methods: {
    onPostLiked(id){
      this.$emit('onPostLiked', id);
    }
  },
  mounted() {
    console.log(this.posts)
  },
  components: {
    FeedListItem
  },
}
</script>

<style scoped>
.main-feed{
  width: 100%;
}
</style>
