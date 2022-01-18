<template>
  <div class="media-content-container" v-if="post.link !== null">
    <img
      v-if="isImageResource(post.link)"
      :src="post.link"
      class="feed-item-preview-resource"
    />
    <video
      v-else-if="isVideoResource(post.link)"
      :src="post.link"
      controls
      class="feed-item-preview-resource"
    />
    <p v-else>INVALID RESOURCE</p>
  </div>
</template>

<script>

export default {
  name: 'MediaContent',
  props: {
    post: Object
  },
  data() {
    return{
     imageExtensions: ['jpg', 'jpeg', 'png', 'svg', 'gif'],
     videoExtensions: ['mp4', 'webm', 'mov', 'mkv', 'avi', 'flv']
    }
  },
  methods: {
    isImageResource(src){
      // check if URL extensions matches a image file
      let fileType =  src.split(/[#?]/)[0].split('.').pop().trim();

      if(this.imageExtensions.includes(fileType)) return true;
    },
    isVideoResource(src){
      // check if URL extensions matches a video file
      let fileType =  src.split(/[#?]/)[0].split('.').pop().trim();

      if(this.videoExtensions.includes(fileType)) return true;
    },
  },
}
</script>

<style scoped>
.media-content-container{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.feed-item-preview-resource{
  max-width: 100%;
  max-height: 50vh;
}
</style>
