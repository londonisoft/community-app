<template>
    <div>
        <ValidationProvider :name="input.name | convertName" :vid="input.name" :rules="input.rules">
            <b-form-group
            class="row"
            :label-cols-sm="parseInt(input.cols)"
            :label-for="input.name"
            slot-scope="{ valid, errors }"
            >
            <template v-slot:label>
            {{ input.name | convertName }} <span v-if="input.rules" class="text-danger">*</span>
            </template>
            <b-form-checkbox-group
                :id="input.name"
                :value="input.vmodel"
                v-model="value"
                @change="setData()"
                :options="input.options"
                :state="errors[0] ? false : (valid ? true : null)"
                >
                </b-form-checkbox-group>
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
