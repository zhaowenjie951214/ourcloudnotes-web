<template>
  <ul
    v-show="$store.getters.visible"
    :style="{
      left: $store.getters.left + 'px',
      top: $store.getters.top + 'px',
    }"
    class="contextmenu"
  >
    <li v-for="(item,index) in menuNode" @click="onClick(item)" :key="index" :style="(item.key === 'delete')?'color:red;font-weight: bold;':''">{{item.label}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    menuNode: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    onClick(item){
      this.$emit('onClick',item)
    }
  },
};
</script>

<style lang ="scss">
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>