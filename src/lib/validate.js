import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import messages from '@/lib/zh_CN'
Validator.updateDictionary({
  zh_CN: {
    messages
  }
})
const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
}
Validator.extend('mobile', {
  messages: {
    cn: field => field + '必须是11位手机号码'
  },
  validate: value => {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})
Vue.use(VeeValidate, config)
