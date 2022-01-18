<template>
  <div class="pagination-container">
    <span class="pagination-item" v-on:click="handleChangePage(0)">First</span>
    <span class="pagination-item" v-on:click="handleChangePage(page - 1)">Previous</span>
    <span class="pagination-item" v-on:click="handleChangePage(page + 1)">Next</span>
    <span class="pagination-item" v-on:click="handleChangePage(maxPages - 1)">Last</span>
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    page: Number,
    maxPages: Number,
    postsPerPage: Number,
  },
  methods: {
    handleChangePage(page) {
      if(page < this.maxPages && page >= 0){
        this.$emit('onChangePage', page);
      }
    },
  },
}
</script>

<style scoped>
.pagination-container{
  width: 100%;
}
.pagination-item{
  margin: 10px;
  cursor: pointer;
  text-decoration: underline;
  color: var(--primary);
}
.pagination-item:hover{
  color: var(--primary-hover);
}
</style>
