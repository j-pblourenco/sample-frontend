<template>
  <BaseLayout>
    <template v-slot:main>
      <div class="home">
        <Spinner v-if="posts === null"/>
        <div v-else class="frontpage-container">
          <div class="frontpage-feed">
            <MainFeed :posts="posts" v-on:onPostLiked="onPostLiked" />
            <Pagination
              v-if="posts.length > 0"
              :maxPages="maxPages"
              :postsPerPage="postsPerPage"
              :page="parseInt($route.params.page)"
              v-on:onChangePage="handleChangePage"
            />
          </div>
          <div class="frontpage-sidebar">
            <Sidebar />
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import MainFeed from '@/components/MainFeed.vue'
import Spinner from '@/components/Spinner.vue'
import Pagination from '@/components/Pagination.vue'
import Sidebar from '@/layout/Sidebar.vue'
import BaseLayout from '@/layout/BaseLayout.vue'
import axios from 'axios';

export default {
  name: 'Frontpage',
  data() {
   return {
     posts: null,
     postsPerPage: 10,
     maxPosts: 0,
   }
  },
  watch: {
    $route() {
      this.posts = null;
      this.fetchPosts();
    }
  },
  computed: {
    maxPages: function () {
      // calculate the ammount of pages to fit all posts
      return Math.ceil(this.maxPosts / this.postsPerPage);
    }
  },
  methods: {
    fetchPosts(){
      // fetch posts for the current page from the API
      var self = this;
      let offset = this.$route.params.page * 10;

      axios.get(`${process.env.VUE_APP_API_URL}/post/list/${this.postsPerPage}/${offset}`)
      .then(function (response) {
        console.log(response)
        self.posts = response.data.posts;
        self.maxPosts = response.data.maxPosts;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    onPostLiked(id){
      // find Post with matching id
      let index = this.posts.findIndex(post => post.id == id);
      // update Post like ammount by 1
      this.posts[index] = {...this.posts[index], likes: this.posts[index].likes + 1};
    },
    handleChangePage(page) {
      this.$router.push(`/home/${page}`)
    }
  },
  mounted() {
    this.fetchPosts();
  },
  components: {
    MainFeed,
    BaseLayout,
    Spinner,
    Sidebar,
    Pagination
  }
}
</script>

<style scoped>
  .home{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 90%;
  }
  .frontpage-container{
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .frontpage-feed{
    width: 100%;
  }
  .frontpage-sidebar{
    display: none;
  }
  @media only screen and (min-width: 860px) {
    .frontpage-feed{
      width: 70%;
      display: inline;
    }
    .frontpage-sidebar{
      width: 30%;
      display: inline;
    }
  }
</style>
