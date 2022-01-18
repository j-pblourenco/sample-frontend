<template>
  <div class="layout-container">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400&display=swap');
:root {
  --primary: #87abe0;
  --primary-hover: #769dd6;
  --danger: #e81b17;
  --faded: #f2f4f7;
}
body{
  background-color: var(--faded);
}
.custom-shadow{
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
}
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.custom-btn{
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
}
.custom-input{
  background-color: var(--faded);
  border: none;
  padding: 10px;
  border-radius: 10px;
  font-family: 'Nunito', sans-serif;
}
.custom-input:focus{
  outline: none;
}
.btn-submitting{
  opacity: 0.6;
}
.validation-error{
  border-radius: 10px;
  color: var(--danger);
  padding: 5px;
  display: block;
  width: fit-content;
}
textarea {
  resize: none;
}
</style>
