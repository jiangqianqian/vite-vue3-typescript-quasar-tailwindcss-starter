<template>
  <hello-world :msg="msg" :aaaa="msg" />
  <sub-component />

  <q-btn class="p-[10px]" color="primary" label="其他" @click="handleClick" />
</template>

<script setup lang="ts">
import SubComponent from './components/SubComponent.vue'

const msg = ref('HelloWorld')

const router = useRouter()
const handleClick = () => {
  router.push('/other')
}
</script>
