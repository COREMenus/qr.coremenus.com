import { Model } from '@vuex-orm/core'
import ProductTranslation from './product_translations.model'
import Section from './section.model'

export default class Product extends Model {
    static entity = 'products'

    static fields() {
        return {
            id: this.attr(''),
            name: this.attr(''),
            description: this.attr(''),
            images: this.attr([]),
            active: this.attr(false),
            price: this.attr(0),
            labels: this.attr([]),
            warnings: this.attr([]),
            SectionId: this.attr(''),
            product_translations: this.hasMany(ProductTranslation, 'id'),
            section: this.belongsTo(Section, 'SectionId')
        }
    }

}