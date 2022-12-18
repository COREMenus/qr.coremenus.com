import { Model } from '@vuex-orm/core'
import Products from './product.model'


export default class ProductTranslation extends Model {
    static entity = 'product_translations'

    static fields() {
        return {
            id: this.attr(''),
            name: this.attr(''),
            description: this.attr(''),
            locale: this.attr(''),
            ProductId: this.attr(''),
            product: this.belongsTo(Products, 'ProductId')
        }
    }
}