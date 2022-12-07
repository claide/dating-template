<template>
  <div class="relative mt-4">
    <div class="bg-slate-100 dark:bg-[#1D2636] p-2 md:p-4 rounded">
      <form @submit.prevent="sendMessage">
        <div class="flex items-center">
          <div v-if="imgSrc" class="relative">
            <button
              type="button"
              aria-label="Close message"
              class="absolute top-[-8px] right-[-8px] text-slate-200"
              @click="removeImage"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"
                />
              </svg>
            </button>
            <img :src="imgSrc" class="max-w-[60px] max-h-[50px]" alt="Image" />
          </div>

          <div class="flex-grow mr-4">
            <AuthChatResizeAuto>
              <template #default="{ resize }">
                <textarea
                  ref="messageBox"
                  v-model="form.body"
                  :disabled="sending"
                  rows="1"
                  class="w-full bg-slate-100 dark:bg-[#1D2636] outline-none dark:text-slate-100 text-sm md:text-base"
                  placeholder="Say something..."
                  autofocus
                  maxlength="200"
                  @input="resize"
                  @keydown="keyDownEvent"
                ></textarea>
              </template>
            </AuthChatResizeAuto>
          </div>

          <div class="flex items-center leading-none self-start">
            <div class="overflow-hidden relative">
              <AuthChatUploader
                v-model="form.image"
                @input="imageChange($event)"
              >
                <div class="px-2 dark:text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    class="fill-current"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                    />
                  </svg>
                </div>
              </AuthChatUploader>
            </div>
            <button
              :disabled="sending"
              class="pr-2 dark:text-slate-400"
              type="button"
              @click="showEmojie = !showEmojie"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0zm1-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                />
              </svg>
            </button>
            <button
              :disabled="sending"
              class="p-2 rounded text-black bg-primary"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M1.923 9.37c-.51-.205-.504-.51.034-.689l19.086-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.475.553-.717.07L11 13 1.923 9.37zm4.89-.2l5.636 2.255 3.04 6.082 3.546-12.41L6.812 9.17z"
                />
              </svg>
            </button>
          </div>
        </div>
        <!-- Emojie picker -->

        <div v-show="showEmojie" class="emojie-container">
          <div class="emojie-inner">
            <button
              v-for="emojie in emojies"
              :key="emojie"
              class="clickable emojie-btn"
              style="font-size: 20px"
              @click.prevent="appendEmojie(emojie)"
            >
              {{ emojie }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Conversation from '@/models/UserConversation'
import Message from '@/models/Message'
import * as cost from '@/utils/const/message'
import { emojies } from '@/utils/emojies'

export default {
  props: {
    conversation: {
      type: Conversation,
      required: true,
    },
  },

  data() {
    return {
      form: {
        body: '',
        type: 'text',
        image: null,
      },
      search: '',
      imgSrc: null,
      sending: false,
      showEmojie: false,
    }
  },

  computed: {
    emojies() {
      return emojies
    },
  },

  methods: {
    keyDownEvent(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        this.sendMessage()
      }
    },

    async sendMessage() {
      if (this.$auth.user.data.credits >= 100) {
        if (this.form.image) {
          await this.sendAsImage().catch((res) => {
            this.handleError(res)
          })
        } else {
          await this.sendAsText().catch((res) => {
            this.handleError(res)
          })
        }
      } else {
        await this.$router.push('/credits/buy')
      }
      this.$refs.messageBox.focus()
    },

    appendEmojie(emojie) {
      this.form.body += emojie
      this.showEmojie = false
    },

    async sendAsText() {
      if (!this.form.body || this.form.body.trim().length === 0) return
      this.sending = true
      const message = new Message(this.form).for(this.conversation)
      const { data } = await message.save()
      this.$emit('newMessage', new Message(data))
      this.clearForm()
      this.$store.commit(
        'authentication/subtractCredits',
        cost.MESSAGE_TEXT_CREDIT_COST
      )
      this.sending = false
    },

    async sendAsImage() {
      if (!this.form.image) return
      this.sending = true
      const formData = new FormData()
      formData.append('body', this.form.body)
      formData.append('image', this.form.image)
      formData.append('type', 'image')
      const { data } = await this.$axios.post(
        `/user-conversations/${this.conversation.id}/messages`,
        formData
      )
      this.$emit('newMessage', new Message(data.data))
      this.clearForm()
      this.$store.commit(
        'authentication/subtractCredits',
        cost.MESSAGE_IMAGE_CREDIT_COST
      )
      this.sending = false
    },

    imageChange($event) {
      const file = $event

      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imgSrc = e.currentTarget.result
        }
        reader.readAsDataURL(file)
      } else {
        this.imgSrc = null
      }
    },

    handleError(err) {
      if (err.response && err.response.status === 452) {
        this.$emit('credits-error')
      }
    },

    removeImage() {
      this.form.image = null
      this.imgSrc = null
    },

    clearForm() {
      this.form.body = ''
      this.form.image = null
      this.imgSrc = null
      this.$refs.messageBox.focus()
      this.showEmojie = false
    },
  },
}
</script>

<style lang="scss">
.message-form {
  position: relative;
}
.emojie-container {
  margin-top: 1.5em;
  .emojie-inner {
    position: relative;
  }
}
.emojie-btn {
  padding: 2px;
  border: none;
  background: none;
  &:focus {
    outline: none;
  }
}
</style>
