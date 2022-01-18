<template>
  <div class="feed-item-container custom-shadow">
    <div class="feed-item-like-container" v-on:click="likePost(post.id)">
      <img src="@/assets/images/heart_white.png" class="feed-item-like-icon" />
      <span class="feed-item-like-quant">{{post.likes}}</span>
    </div>
    <div class="feed-item-preview-container" v-on:click="openPostDetails(post.id)">
      <p class="feed-item-preview-title">{{post.title}}</p>
      <div class="feed-item-preview-stats">
        <span class="feed-item-preview-date">{{formatDate(post.created_at.date)}}</span>
        <span class="feed-item-preview-stat-separator">-</span>
        <span class="feed-item-preview-comments">{{post.comments_ammount}} comments</span>
      </div>
      <MediaContent :post="post" />
    </div>
  </div>
</template>

<script>
import MediaContent from '@/components/MediaContent';
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'FeedListItem',
  props: {
    post: Object
  },
  data() {
    return{
        isSubmittingLike: false,
    }
  },
  methods: {
    formatDate(date){
      return moment(date).fromNow();
    },
    openPostDetails(id){
      this.$router.push(`/post-details/${id}`);
    },
    likePost(id){
      // prevent calling API multiple times simultaneously
      if(this.isSubmittingLike) return null;

      var self = this;
      this.isSubmittingLike = true;
      axios.post(`${process.env.VUE_APP_API_URL}/post/like`, {
        post_id: id
      })
      .then(function (response) {
        console.log(response);
        if(response.data.ResultCode === 1){
          self.$emit('onPostLiked', id);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function(){
        self.isSubmittingLike = false;
      });
    }
  },
  components: {
    MediaContent
  }
}
</script>

<style scoped>
.feed-item-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 10px;
}
.feed-item-like-container{
  min-width: 44px;
  border-radius: 10px 0px 0px 10px;
  background-color: var(--primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.feed-item-like-icon{
  max-width: 24px;
}
.feed-item-like-quant{
  margin-top: 5px;
  font-size: 0.8em;
}
.feed-item-preview-container{
  width: 95%;
  border-radius: 0px 5px 5px 0px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.feed-item-preview-stats{
  flex-direction: row;
  align-self: start;
}
.feed-item-preview-date{
  color: rgba(0,0,0,0.5);
  font-size: 0.8em;
  text-align: left;
  margin-top: 0px;
}
.feed-item-preview-comments{
  color: rgba(0,0,0,0.5);
  font-size: 0.8em;
}
.feed-item-preview-stat-separator{
  color: rgba(0,0,0,0.5);
  font-size: 0.8em;
  margin-left: 20px;
  margin-right: 20px;
}
.feed-item-preview-title{
  text-align: left;
  color: #000;
  margin: 0px;
  font-size: 1.1em;
  width: 100%;
}
</style>
