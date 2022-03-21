<template>
    <div>
        <ValidationProvider :name="ucfirst(input.name)" :vid="input.name" :rules="input.rules">
            <b-form-group
            class="row"
            :label-cols-sm="parseInt(input.cols)"
            :label-for="input.name"
            slot-scope="{ valid, errors }"
            >
            <template v-slot:label>
            {{ ucfirst(input.name) }} <span v-if="input.rules" class="text-danger">*</span>
            </template>
            <b-form-input
                :type="input.type"
                :id="input.name"
                :value="input.vmodel"
                v-model="value"
                @keyup="setData()"
                @change="setData()"
                :state="errors[0] ? false : (valid ? true : null)"
                ></b-form-input>
            <div class="invalid-feedback">
                {{ errors[0] }}
            </div>
            </b-form-group>
        </ValidationProvider>
    </div>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
export default {
  props: ['input'],
  data () {
      return {
          value: this.input.vmodel
      }
  },
  components: {
    ValidationProvider
  },
  methods: {
    ucfirst(str) {
        var firstLetter = str.substr(0, 1);
        return firstLetter.toUpperCase() + str.substr(1);
    },
    setData () {
        this.$emit('return-value', this.value)
    }
  }
}
</script>
