<template>
  <div class="todo-modal">
    <b-modal 
      v-model="showModal" 
      title="Crate a todo" 
      ref="todo_modal"
      :no-close-on-esc="true"
      :no-close-on-backdrop="true"
      :hide-header-close="true"
      size="lg"
      hide-footer
    >
      <b-form @submit.prevent="onSubmit" hide-footer>
        <div class="form-group">
          <input 
            type="text"
            class="form-control"
            placeholder="Your todo description"
            v-model="description"
            data-vv-name="description"
            data-vv-as="Description"
            v-validate="'required|max:255'"
          >
          <span v-if="errors.first('description')" class="invalid-input">
            {{ errors.first('description') }}
          </span>
        </div>
        <div class="mt-3 modal-actoin-buttons">
          <button type="submit" class="btn btn-primary">Add</button>
          <a class="btn btn-danger" @click="cancel">close</a>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: [ 'value' ],
  data() {
    return {
      showModal: this.value,
      description: '',
    };
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('createTodo', this.description);
          this.$emit('input', false);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.description = '';
      });
    },
    cancel() {
      this.showModal = false;
      this.$emit('input', false);
      this.$refs.todo_modal.hide();
      this.description = '';
    },
  },
  watch: {
    value(newValue) {
      this.showModal = newValue;
    },
  },
}
</script>

<style>
.mt-3.modal-actoin-buttons {
  float: right;
}
</style>