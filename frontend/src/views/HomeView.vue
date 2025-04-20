<template>
  <div>
    <h1>Ürün Listesi</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.price }} TL
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      products: []
    }
  },
  mounted() {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        this.products = data;
      })
      .catch(err => console.error('Hata:', err));
  }
}
</script>
