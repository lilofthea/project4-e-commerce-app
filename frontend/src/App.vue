<template>
  <div>
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate" :class="item.class">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action" :class="item.class">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>
      </template>
    </Menubar>

    <!-- Buraya alt bileşenler (ürün listesi vs.) gelecek -->
    <div class="p-4">
      <!-- Ürünler veya başka içerikler -->
    </div>
  </div>
  <div class="card">
    <DataView :value="products" layout="list">
      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
            <div
              class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
              :class="{ 'border-top-1 surface-border': index !== 0 }"
            >
              <div class="md:w-10rem relative">
                <img
                  class="block xl:block mx-auto border-round w-full"
                  :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`"
                  :alt="item.name"
                />
                <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute" style="left: 4px; top: 4px" />
              </div>
              <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                  <div>
                    <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                    <div class="text-lg font-medium text-900 mt-2">{{ item.name }}</div>
                  </div>
                  <div class="surface-100 p-1" style="border-radius: 30px">
                    <div
                      class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
                      style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                    >
                      <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-column md:align-items-end gap-5">
                  <span class="text-xl font-semibold text-900">${{ item.price }}</span>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button icon="pi pi-heart" outlined></Button>
                    <Button
                      icon="pi pi-shopping-cart"
                      label="Buy Now"
                      :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                      class="flex-auto md:flex-initial white-space-nowrap"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import DataView from 'primevue/dataview'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'

export default {
  name: 'App',
  components: {
    Menubar,
    DataView,
    Tag,
    Button
  },
  data() {
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          route: '/'
        },
        {
          label: 'Sepet',
          icon: 'pi pi-shopping-cart',
          route: '/cart',
          class: 'ml-auto' // sağa yaslamak için
        }
      ],
      products: [] // veya elle doldurulmuş ürün listesi
    }
  },
  mounted() {
    // elle ürün yüklemesi örneği
    this.products = [
      {
        name: 'Bamboo Watch',
        category: 'Accessories',
        image: 'bamboo-watch.jpg',
        price: 65,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        name: 'Black Watch',
        category: 'Accessories',
        image: 'black-watch.jpg',
        price: 72,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4
      }
    ]
  },
  methods: {
    getSeverity(product) {
      switch (product.inventoryStatus) {
        case 'INSTOCK':
          return 'success'
        case 'LOWSTOCK':
          return 'warning'
        case 'OUTOFSTOCK':
          return 'danger'
        default:
          return null
      }
    }
  }
}
</script>

<style scoped>
::v-deep(.p-menubar-root > .p-menuitem:last-child) {
  margin-left: auto;
}
</style>

