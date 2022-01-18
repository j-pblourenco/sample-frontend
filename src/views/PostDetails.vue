<template>
  <BaseLayout>
    <template v-slot:main>
      <Spinner v-if="post === null"/>
      <div v-else class="post-details-container">
        <div class="post-details-main custom-shadow">
          <button class="post-details-back-btn" v-on:click="goBack">
            <img
              src="@/assets/images/left-arrow.png"
              class="post-details-back-arrow"
            />
            <span>
              Go back
            </span>
          </button>
          <p class="post-title">{{post.title}}</p>
          <div class="post-details-date-likes-row">
            <span class="post-date">{{formatDate(post.created_at.date)}}</span>
            <img
              src="@/assets/images/heart_red.png"
              class="post-details-heart-icon"
              v-on:click="likePost(post.id)"
            />
            <span class="post-details-likes">{{post.likes}}</span>
          </div>

          <p class="post-description" v-if="post.description !== null">{{post.description}}</p>

          <MediaContent :post="post" />

          <p class="post-details-comments-section-title">Comments</p>
          <CommentForm v-on:onPostComment="getPostDetails" :comment_id="null"/>
          <Comment
            v-for="comment in post.comments"
            :comment="comment"
            :key="comment.id"
            :isReply="false"
            v-on:onCommentLiked="onCommentLiked"
            v-on:onReplyLiked="onReplyLiked"
            v-on:onReply="getPostDetails"
          />
        </div>

        <div class="post-details-sidebar custom-shadow">
          <MostRecentPosts />
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/layout/BaseLayout.vue'
import CommentForm from '@/components/CommentForm.vue'
import MediaContent from '@/components/MediaContent.vue'
import MostRecentPosts from '@/components/MostRecentPosts.vue'
import Comment from '@/components/Comment.vue'
import Spinner from '@/components/Spinner.vue'
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'PostDetails',
  data() {
   return {
     post: null,
     isSubmittingLike: false,
   }
  },
  watch: {
    $route() {
      this.post = null;
      this.getPostDetails();
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    getPostDetails(){
      var self = this;

      axios.get(`${process.env.VUE_APP_API_URL}/post/details/${this.$route.params.id}`)
      .then(function (response) {
        console.log(response)
        if(response.data.ResultCode === 1){
          self.post = response.data.post;
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    formatDate(date){
      return moment(date).fromNow();
    },
    onCommentLiked(id){
      // find Comment with matching id
      let index = this.post.comments.findIndex(comment => comment.id == id);
      // update Comment like ammount by 1
      this.post.comments[index] = {...this.post.comments[index], likes: this.post.comments[index].likes + 1};
    },
    onReplyLiked(args){
      // find Comment with matching id
      let commentIndex = this.post.comments.findIndex(comment => comment.id == args.commentId);
      // find reply with matching id
      let replyIndex = this.post.comments[commentIndex].replies.findIndex(reply => reply.id == args.replyId);
      // update Comment like ammount by 1
      const reply = this.post.comments[commentIndex].replies[replyIndex];
      this.post.comments[commentIndex].replies[replyIndex] = {...reply, likes: reply.likes + 1};
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
          self.post.likes = self.post.likes + 1;
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
  mounted() {
    this.getPostDetails();
  },
  components: {
    BaseLayout,
    CommentForm,
    Comment,
    MediaContent,
    Spinner,
    MostRecentPosts
  }
}
</script>

<style scoped>
.post-details-container{
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.post-details-main{
  width: 90%;
  border-radius: 10px;
  text-align: left;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.post-details-sidebar{
  display: none;
}
.post-date{
  color: rgba(0,0,0,0.5);
  font-size: 0.8em;
  margin: 0px;
}
.post-title{
  font-size: 1.5em;
  font-weight: 600;
  margin: 0px;
}
.post-details-heart-icon{
  width: 30px;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 10px;
}
.post-details-date-likes-row{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}
.post-details-likes{
  color: var(--danger);
}
.post-details-comments-section-title{
  font-size: 1.2em;
  font-weight: 600;
  margin-top: 40px;
  border-top: 2px solid var(--primary);
  padding-top: 5px;
}
.post-details-back-arrow{
  height: 24px;
  margin-right: 10px;
}
.post-details-back-btn{
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
}
@media only screen and (min-width: 860px) {
  .post-details-container{
    width: 90%;
  }
  .post-details-main{
    width: 70%;
    padding: 40px;
  }
  .post-details-sidebar{
    width: 30%;
    margin-left: 40px;
    height: fit-content;
    display: flex;
  }
}
</style>
