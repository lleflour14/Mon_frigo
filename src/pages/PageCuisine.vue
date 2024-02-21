<template>
  <div>
    <img src="@/assets/cuisine.jpg" alt="cuisine" class="cuisine-image" />
    <img
      src="@/assets/frigo_ext.jpg"
      alt="frigo"
      class="object frigo"
      to="/PageFrigo"
    />
    <img
      src="@/assets/poubelle.jpg"
      alt="poubelle"
      class="object poubelle"
      @click="ouvrePoubellePage"
    />
    <img
      src="@/assets/ordi.jpg"
      alt="ordi"
      class="object ordi"
      @click="ouvreOrdiPage"
    />
  </div>
</template>

<script>

</script>

<style scoped>
.cuisine-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.object {
  position: absolute;
  cursor: pointer;
}

.frigo {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.poubelle {
  top: 50%;
  left: 10%;
  height: 20%;
  transform: translate(-50%, -50%);
}

.ordi {
  top: 50%;
  left: 90%;
  height: 20%;
  transform: translate(-50%, -50%);
}
</style>
