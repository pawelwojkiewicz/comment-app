<template>
  <ul class="comment-list">
    <li v-for="item in items" :key="item.id" class="comment-list__item">
      {{ item.name }}
      <img :src="item.avatar" class="comment-list__avatar" />
      <div class="comment-list__info">
        <span class="comment-list__owner"
          >{{ item.first_name }} {{ item.last_name }}:
        </span>
        <span class="comment-list__text">{{ item.text }}</span>
        <time-ago
          class="comment-list__time"
          refresh
          :datetime="item.created_at"
          locale="en"
          tooltip
          long
        ></time-ago>
      </div>
    </li>
  </ul>
</template>

<script>
import TimeAgo from "vue2-timeago";
import { mapState } from "vuex";

export default {
  name: "comment-list",
  components: {
    TimeAgo
  },
  computed: {
    ...mapState(["items"])
  },
  mounted() {
    this.$store.dispatch("loadItems");
  }
};
</script>

<style lang="scss" scoped>
.comment-list {
  height: 600px;
  overflow: auto;
  list-style: none;
  margin: 0;
  padding: 0;

  &__item {
    display: flex;
    padding: 20px 30px;
    border-bottom: 1px solid #dadada;
  }

  &__owner {
    font-weight: bold;
    margin-right: 5px;
  }

  &__avatar {
    margin-right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  &__time {
    display: block;
    margin-top: 10px;
  }
}
</style>
