<template>
  <div class="post-form-container custom-shadow">
    <p class="post-form-title">Create new post</p>

    <PostTypeSwitch @changePostType="setPostType" :postType="postType" />

    <Form
      @submit="submit"
      :validation-schema="schema"
      class="post-form"
    >

     <Field
        name="title"
        placeholder="Write a catchy title ;)"
        class="post-form-input custom-input"
      />
      <ErrorMessage name="title" class="validation-error" />

      <Field
         name="link"
         placeholder="Paste the link to an image/video resource"
         class="post-form-input custom-input"
         v-if="postType === 'link'"
       />
       <ErrorMessage name="link" v-if="postType === 'link'" class="validation-error"/>

       <Field
          name="description"
          as="textarea"
          placeholder="Write your text here"
          class="post-form-input custom-input"
          v-if="postType === 'text'"
        />
        <ErrorMessage name="description" v-if="postType === 'text'" class="validation-error" />

      <button
        class="custom-btn post-form-submit-btn"
        :disabled="isSubmitting"
        :class="{ 'btn-submitting': isSubmitting }"
      >
        Post
      </button>
    </Form>
  </div>
</template>

<script>
import PostTypeSwitch from '@/components/create-post-form/PostTypeSwitch.vue'
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';

export default {
  name: 'CreatePostForm',
  computed: {
    // compute the schema based on which fields are required
    schema: function () {
      if(this.postType === 'text'){
        return {
          title: yup.string().required().max(255),
          description: yup.string().required().max(10000)
        };
      }else{
        return {
          title: yup.string().required().max(255),
          link: yup.string().required().test(
            'isExtensionValid',
            'Must be a valid image/video resource',
            (val) => this.validateMediaLink(val)
          ).max(255)
        };
      }
    },
  },
  data() {
    return {
      postType: 'text',
      isSubmitting: false
    }
  },
  methods: {
    setPostType(type){
      this.postType = type;
    },
    submit(values){
      var self = this;
      this.isSubmitting = true;

      axios.post(`${process.env.VUE_APP_API_URL}/post/create`, values)
      .then(function (response) {
        console.log(response);
        if(response.data.ResultCode === 1){
          self.$router.push('/home/0');
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        self.isSubmitting = false;
      });
    },
    validateMediaLink(link){
      const splitArr = link.split(".");
      const extension = splitArr[splitArr.length - 1];
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'mp4', 'webm', 'mov', 'mkv', 'avi', 'flv'];
      if(allowedExtensions.includes(extension)) return true;
      return false;
    }
  },
  components: {
    PostTypeSwitch,
    Field,
    Form,
    ErrorMessage
  }
}
</script>

<style scoped>
.post-form-container{
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.post-form-title{
  font-weight: 500;
  font-size: 1.2em;
  text-align: left;
  color: #000;
  margin: 0px;
  margin-bottom: 20px;
}
.post-form{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.post-form-input{
  margin-top: 5px;
  margin-bottom: 5px;
}
.post-form-submit-btn{
  background-color: var(--primary);
  color: #fff;
  margin-top: 20px;
}
</style>
