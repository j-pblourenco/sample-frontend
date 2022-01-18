<template>
  <BaseLayout>
    <template v-slot:main>
      <div class="new-post-container">
        <CreatePostForm />
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/layout/BaseLayout.vue'
import CreatePostForm from '@/components/create-post-form/CreatePostForm.vue'

export default {
  name: 'NewPost',
  data() {
   return {
   }
  },
  components: {
    BaseLayout,
    CreatePostForm
  }
}
</script>

<style scoped>
.new-post-container{
  width: 90%;
}
@media only screen and (min-width: 860px) {
  .new-post-container{
    width: 70%;
  }
}
</style>
