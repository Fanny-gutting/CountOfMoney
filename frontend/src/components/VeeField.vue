<script setup lang="ts">
  import { computed, ref, toRef } from 'vue'
  import { IconEye, IconNoEye } from '@/components'
  import { Field, ErrorMessage, useField  } from 'vee-validate'
  import type { InputField } from '@/types'

  const props = defineProps({
    field: {
      type: Object as () => InputField,
      required: true
    }
  })

  const showPassword = ref(false)

  // use `toRef` to create reactive references to `name` prop which is passed to `useField`
  // this is important because vee-validte needs to know if the field name changes
  // https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
  const name = toRef(props.field, 'name')
  const { errorMessage } = useField(name)

  const type = computed(() => {
    if (props.field.as === 'select') return undefined
    else if (props.field.type === 'password') return showPassword.value ? 'text' : 'password'
    else return props.field.type ?? 'text'
  })

</script>

<template>
  <div class="form-control w-full" :key="field.name" v-if="field.if ? field.if() : true">

    <label v-if="field.label" class="label">
      <span class="label-text">{{ field.label }}<span v-if="field.required"></span></span>
    </label>
    
    <div class="relative">
      <Field
        :name="field.name"
        :id="field.name"
        :as="field.as ?? 'input'"
        :class="{
          'border-error': !!errorMessage,
          'input input-bordered w-full focus:outline-none hover:border-primary hover:border-opacity-50 focus:border-primary focus:border-opacity-100': true,
          'pr-16': (field.as === 'input' || !field.as) && field.type === 'password'
        }"
        :disabled="field.disabled"
        :type="type"
        :autocomplete="field.name"
      >
        <template v-if="field.as === 'select'">
          <option v-for="option in field.options" :key="option.label" :value="option.id">{{ option.label }}</option>
        </template>
      </Field>
      <template v-if="(field.as === 'input' || !field.as) && field.type === 'password'">
        <label class="swap swap-rotate absolute right-0 top-0 btn btn-ghost h-full" @click.prevent="showPassword = !showPassword">
          <input type="checkbox" v-model="showPassword" />
          <IconNoEye class="swap-off fill-current" height="24" width="24" />
          <IconEye class="swap-on fill-current" height="24" width="24" />
        </label>
      </template>
    </div>
    
    <ErrorMessage :name="field.name" class="text-error" />
  </div>
</template>