<template>
  <div class="comment-container">
    <p class="comment-date">{{formatDate(comment.created_at.date)}}</p>
    <p class="comment-content">{{comment.text}}</p>
    <div class="comment-bottom-row">
      <span
        v-if="!isReply"
        class="comment-reply"
        v-on:click="toggleReply"
      >
        Reply
      </span>

      <img
        src="@/assets/images/heart_red.png"
        class="comment-heart-icon"
        v-on:click="likeComment(comment.id)"
      />
      <span class="comment-likes">{{comment.likes}}</span>
    </div>

    <div v-if="isReplying">
      <CommentForm v-on:onPostComment="onReply" v-on:onCancelReply="toggleReply" :comment_id="comment.id"/>
    </div>

    <div class="comment-replies">
      <Comment
        v-for="reply in comment.replies"
        :comment="reply"
        :key="reply.id"
        :isReply="true"
        v-on:onCommentLiked="onReplyLiked"
      />
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment';
import CommentForm from '@/components/CommentForm';
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'Comment',
  props: {
    comment: Object,
    isReply: Boolean
  },
  data() {
    return {
        isReplying: false,
        isSubmittingLike: false,
    }
  },
  methods: {
    likeComment: function(id){
      // prevent calling API multiple times simultaneously
      if(this.isSubmittingLike) return null;

      this.isSubmittingLike = true;
      var self = this;
      axios.post(`${process.env.VUE_APP_API_URL}/comment/like`, {
        comment_id: id
      })
      .then(function (response) {
        console.log(response);
        if(response.data.ResultCode === 1){
          self.$emit('onCommentLiked', id);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function(){
        self.isSubmittingLike = false;
      });
    },
    formatDate(date){
      return moment(date).format('hh:mm:ss DD/MM/YYYY');
    },
    toggleReply(){
      this.isReplying = !this.isReplying;
    },
    onReplyLiked(replyId){
      this.$emit('onReplyLiked', {replyId: replyId, commentId: this.comment.id});
    },
    onReply(){
      this.isReplying = false;
      this.$emit('onReply');
    }
  },
  components: {
    CommentForm,
    Comment
  }
}
</script>

<style scoped>
.comment-container{
  width: 100%;
  margin-top: 20px;
  border-left: 2px solid var(--primary);
  padding: 10px;
}
.comment-bottom-row{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.comment-date{
  color: rgba(0,0,0,0.5);
  font-size: 0.8em;
  margin: 0px;
}
.comment-content{
  margin-top: 5px;
  margin-bottom: 5px;
}
.comment-heart-icon{
  width: 20px;
  height: auto;
  cursor: pointer;
  margin-right: 10px;
}
.comment-likes{
  color: var(--danger);
}
.comment-reply{
  color: #000;
  font-weight: 600;
  font-size: 0.9em;
  cursor: pointer;
  margin-right: 20px;
}
.comment-replies{
  width: 90%;
  margin-left: 2%;
}
</style>
