<template>
  <div>
    <Menubar :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a
            v-ripple
            :href="href"
            v-bind="props.action"
            @click="navigate"
            :class="item.class"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <Badge
              v-if="item.label === 'Sepetim' && cart.length"
              :value="cart.length"
              class="ml-2"
            />
          </a>
        </router-link>

        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
          :class="item.class"
          @click="item.command && item.command($event)"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <Badge
            v-if="item.label === 'Sepetim' && cart.length"
            :value="cart.length"
            class="ml-2"
          />
        </a>
      </template>
    </Menubar>

    <div class="p-4">
      <div class="card">
        <DataView :value="products" layout="list">
          <template #list="slotProps">
            <div class="grid grid-nogutter">
              <div
                v-for="(item, index) in slotProps.items"
                :key="index"
                class="col-12"
              >
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
                    <Tag
                      :value="item.inventoryStatus"
                      :severity="getSeverity(item)"
                      class="absolute"
                      style="left: 4px; top: 4px"
                    />
                  </div>
                  <div
                    class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4"
                  >
                    <div
                      class="flex flex-row md:flex-column justify-content-between align-items-start gap-2"
                    >
                      <div>
                        <span class="font-medium text-secondary text-sm">{{
                          item.category
                        }}</span>
                        <div class="text-lg font-medium text-900 mt-2">
                          {{ item.name }}
                        </div>
                      </div>
                      <div class="surface-100 p-1" style="border-radius: 30px">
                        <div
                          class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
                          style="
                            border-radius: 30px;
                            box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                              0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                          "
                        >
                          <span class="text-900 font-medium text-sm">{{
                            item.rating
                          }}</span>
                          <i class="pi pi-star-fill text-yellow-500"></i>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-column md:align-items-end gap-5">
                      <span class="text-xl font-semibold text-900"
                        >${{ item.price }}</span
                      >
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <Button icon="pi pi-heart" outlined />
                        <Button
                          icon="pi pi-shopping-cart"
                          label="Sepete Ekle"
                          :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                          class="flex-auto md:flex-initial white-space-nowrap"
                          @click="addToCart(item)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>

    <Dialog
      v-model:visible="visibleCart"
      modal
      header="Sepetim"
      :style="{ width: '50vw' }"
    >
      <div v-if="cart.length === 0">Sepetiniz boş.</div>
      <ul v-else>
        <li v-for="(item, index) in cart" :key="index">
          {{ item.name }} - ${{ item.price }}
        </li>
      </ul>
    </Dialog>
  </div>
</template>

<script>
import DataView from "primevue/dataview";
import Tag from "primevue/tag";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import Dialog from "primevue/dialog";
import Badge from "primevue/badge";

export default {
  name: "App",
  components: {
    Menubar,
    DataView,
    Tag,
    Button,
    Dialog,
    Badge,
  },
  data() {
    return {
      visibleCart: false,
      cart: [],
      products: [],
    };
  },
  mounted() {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        this.products = data;
      })
      .catch((err) => console.error("Ürünleri çekerken hata:", err));
  },

  methods: {
    addToCart(product) {
      this.cart.push(product);
    },
    getSeverity(product) {
      switch (product.inventoryStatus) {
        case "INSTOCK":
          return "success";
        case "LOWSTOCK":
          return "warning";
        case "OUTOFSTOCK":
          return "danger";
        default:
          return null;
      }
    },
  },
  computed: {
    items() {
      return [
        {
          label: "Anasayfa",
          icon: "pi pi-home",
          route: "/",
        },
        {
          label: "Sepetim",
          icon: "pi pi-shopping-cart",
          class: "ml-auto",
          command: () => {
            this.visibleCart = true;
          },
        },
      ];
    },
  },
};
</script>

<style scoped>
::v-deep(.p-menubar-root > .p-menuitem:last-child) {
  margin-left: auto;
}
</style>
