<template>
    <div class="home">
      <div class="container">
        <h1>Bienvenido a Telas Emanuel</h1>
        <router-link to="/categories" class="btn">Iniciar</router-link>
      </div>
    </div>
  </template>
  
  <style scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .container {
    text-align: center;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .btn {
    display: inline-block;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.2rem;
  }
  </style>  