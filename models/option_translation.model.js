import { Model } from '@vuex-orm/core'
import Option from './option.model'

export default class OptionTranslation extends Model {
    static entity = 'option_translations'

    static fields() {
        return {
            id: this.attr(''),
            name: this.attr(''),
            locale: this.attr(''),
            OptionId: this.attr(''),
            option: this.belongsTo(Option, 'OptionId')
        }
    }
}