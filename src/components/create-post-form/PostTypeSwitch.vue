<template>
  <div class="post-type-switch-container">
    <button
      v-on:click="handleChangePostType('text')"
      :class="[postType === 'text' ? 'post-form-text-btn-active' : '', 'custom-btn post-form-type-btn post-form-text-btn']"
    >
      Text
    </button>
    <button
      v-on:click="handleChangePostType('link')"
      :class="[postType === 'link' ? 'post-form-media-btn-active' : '', 'custom-btn post-form-type-btn post-form-media-btn']"
    >
      Media
    </button>
  </div>
</template>

<script>

export default {
  name: 'PostTypeSwitch',
  props: {
    postType: String,
  },
  methods: {
    handleChangePostType: function(type){
      this.$emit('changePostType', type);
    }
  }
}
</script>

<style scoped>
.post-type-switch-container{
  width: fit-content;
}
.post-form-type-btn{
  background-color: transparent;
  border: 1px solid var(--primary);
  color: #000;
  font-weight: 500;
  width: 60px;
}
.post-form-text-btn{
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-right: none;
}
.post-form-text-btn-active{
  background-color: var(--primary);
  color: #fff;
}
.post-form-media-btn{
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-left: none;
}
.post-form-media-btn-active{
  background-color: var(--primary);
  color: #fff;
}
</style>
