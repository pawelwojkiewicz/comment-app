<template>
  <div class="comment-textarea">
    <picker
      title="Pick your emoji..."
      v-show="showEmojiPicker"
      emoji="point_up"
      @select="addEmoji"
    />
    <span
      class="emoji-trigger"
      :class="{ triggered: showEmojiPicker }"
      @mousedown.prevent="toggleEmojiPicker"
    >
      <svg style="width:20px;height:20px" viewBox="0 0 24 24">
        <path
          fill="#888888"
          d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
        />
      </svg>
    </span>
    <Mentionable :keys="['@']" :items="items" offset="2" @open="pushItems()">
      <textarea
        ref="textarea"
        class="comment-textarea__field"
        :value="value"
        placeholder="Add your comment..."
        @input="$emit('input', $event.target.value)"
      ></textarea>
    </Mentionable>
  </div>
</template>

<script>
import { Picker } from "emoji-mart-vue";
import { Mentionable } from "vue-mention";
import { mapState } from "vuex";
export default {
  name: "comment-textarea",
  data() {
    return {
      showEmojiPicker: false,
      text: "",
      items: []
    };
  },
  components: {
    Picker,
    Mentionable
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState(["metioned"])
  },
  methods: {
    pushItems() {
      this.items = [];
      this.metioned.forEach(metion => {
        const username = `${metion.first_name} ${metion.last_name}`;
        this.items.push({ value: username });
      });
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    addEmoji(emoji) {
      const textarea = this.$refs.textarea;
      const cursorPosition = textarea.selectionEnd;
      const start = this.value.substring(0, textarea.selectionStart);
      const end = this.value.substring(textarea.selectionStart);
      const text = start + emoji.native + end;
      this.$emit("input", text);
      textarea.focus();
      this.$nextTick(() => {
        textarea.selectionEnd = cursorPosition + emoji.native.length;
      });
    }
  },
  mounted() {
    this.$store.dispatch("loadMetioned");
  }
};
</script>

<style lang="scss" scoped>
.comment-textarea {
  position: relative;
  width: 100%;
  &__field {
    background: transparent;
    border: none;
    padding: 10px;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    height: 60px;
    resize: none;
    &:focus {
      outline: none;
    }
  }
}

//Mention Styling

//Emoji Styling
.emoji-mart {
  position: absolute;
  bottom: 95px;
  left: 0;
}
.emoji-trigger {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  height: 20px;
  z-index: 100;
}
.emoji-trigger path {
  transition: 0.1s all;
}
.emoji-trigger:hover path {
  fill: #000000;
}
.emoji-trigger.triggered path {
  fill: darken(#fec84a, 15%);
}
</style>
