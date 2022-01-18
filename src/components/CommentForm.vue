<template>
  <div class="comment-form-container">
    <Form
      @submit="submit"
      :validation-schema="schema"
      class="comment-form"
    >

     <Field
        name="comment"
        as="textarea"
        placeholder="Write your comment"
        class="comment-form-input custom-input"
      />
      <ErrorMessage name="comment" class="validation-error"/>

      <button
        class="custom-btn comment-form-submit-btn"
        :disabled="isSubmitting"
        :class="{ 'btn-submitting': isSubmitting }"
      >
        Comment
      </button>
      <button
        type="button"
        v-if="comment_id !== null"
        class="custom-btn comment-form-cancel-btn"
        v-on:click="cancelReply"
      >
        Cancel
      </button>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';

export default {
  name: 'CommentForm',
  data() {
    return {
      schema: {
        comment: yup.string().required().max(500),
      },
      isSubmitting: false,
    }
  },
  props: {
    comment_id: Number
  },
  methods: {
    submit(values, actions){
      var self = this;
      this.isSubmitting = true;

      axios.post(`${process.env.VUE_APP_API_URL}/comment/create`, {
        comment_id: this.comment_id,
        post_id: this.$route.params.id,
        text: values.comment
      })
      .then(function (response) {
        console.log(response);
        if(response.data.ResultCode === 1){
          self.$emit('onPostComment');
          actions.resetForm();
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        self.isSubmitting = false;
      });
    },
    cancelReply(){
      this.$emit('onCancelReply');
    }
  },
  components: {
    Field,
    Form,
    ErrorMessage
  }
}
</script>

<style scoped>
.comment-form-container{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.comment-form{
  width: 100%;
  margin-top: 10px;
}
.comment-form-input{
  width: calc(100% - 20px);
  display: block;
}
.comment-form-submit-btn{
  background-color: var(--primary);
  color: #fff;
  margin-top: 5px;
  margin-right: 10px;
}
.comment-form-submit-btn:hover{
  background-color: var(--primary-hover);
}
</style>
