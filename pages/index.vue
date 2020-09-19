<template>
  <main class="my-8">
    <div class="container mx-auto px-6">
      <h3 class="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
      <span class="mt-3 text-sm text-gray-500">200+ Products</span>
      <div
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
      >
        <product-card />
      </div>
    </div>
  </main>
</template>

<script>
import ProductCard from '@/components/ProductCard'
export default {
  components: { ProductCard },
}
</script>
