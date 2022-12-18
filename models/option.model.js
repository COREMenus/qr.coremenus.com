import { Model } from '@vuex-orm/core'
import OptionTranslation from './option_translation.model'
import Product from './product.model'

export default class Option extends Model {
    static entity = 'option'

    static fields() {
        return {
            id: this.attr(''),
            name: this.attr(''),
            price: this.attr(0),
            calories: this.attr(0),
            ProductId: this.attr(''),
            product_option_translations: this.hasMany(OptionTranslation, 'id'),
            product: this.hasMany(Product, 'id')
        }
    }

}