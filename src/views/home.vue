<template>
  <div class="comment-box">
    <div class="comment-box__container">
      <comment-list></comment-list>
      <comment-publish></comment-publish>
    </div>
  </div>
</template>

<script>
import commentList from "@/components/comment-list.vue";
import commentPublish from "@/components/comment-publish.vue";

export default {
  name: "Home",
  components: {
    commentList,
    commentPublish
  }
};
</script>

<style lang="scss" scoped>
.comment-box {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e2e2e2;

  &__container {
    background: #fff;
    width: 450px;
    border-radius: 5px;
  }
}
</style>
