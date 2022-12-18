import { Model } from '@vuex-orm/core'
import MenuTranslation from './menu_translation.model'
import Section from './section.model'

export default class Menu extends Model {
    static entity = 'menus'

    static fields() {
        return {
            id: this.attr(''),
            name: this.attr(''),
            description: this.attr(''),
            imageURL: this.attr(''),
            menu_translations: this.hasMany(MenuTranslation, 'id'),
            sections: this.hasMany(Section, 'id')
        }
    }

}