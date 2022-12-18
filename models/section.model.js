import { Model } from '@vuex-orm/core'
import Menu from './menu.model'
import Products from './product.model'
import SectionTranslation from './section_translation.model'

export default class Section extends Model {
    static entity = 'sections'

    static fields() {
        return {
            id: this.attr(''),
            name: this.attr(''),
            description: this.attr(''),
            imageURL: this.attr(''),
            MenuId: this.attr(''),
            section_translations: this.hasMany(SectionTranslation, 'id'),
            menu: this.belongsTo(Menu, 'MenuId'),
            products: this.hasMany(Products, 'id')
        }
    }

}