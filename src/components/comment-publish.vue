<template>
  <div class="comment-input">
    <img src="@/assets/avatar.webp" class="comment-input__avatar" />
    <comment-text-area v-model="commentText"></comment-text-area>
    <button @click="addComment" type="button" class="comment-input__button">
      Publish
    </button>
  </div>
</template>

<script>
import commentTextArea from "./comment-textarea.vue";

import { mapState } from "vuex";

export default {
  name: "comment-publish",
  components: {
    commentTextArea
  },
  data() {
    return {
      commentText: ""
    };
  },

  computed: {
    ...mapState(["items"])
  },
  methods: {
    addComment() {
      this.$store.dispatch("addComment");
      this.items.push({
        avatar: require("@/assets/avatar.webp"), //hardcoded avatar
        text: this.commentText,
        first_name: "Example", //hardcoded first_name
        last_name: "User" //hardcoded last_name
      });
      this.commentText = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-input {
  border-top: 1px solid #dadada;
  display: flex;
  padding: 10px 20px;
  &__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  &__button {
    width: 150px;
    cursor: pointer;
    margin-left: auto;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    &:focus {
      outline: none;
    }
  }
}
</style>
