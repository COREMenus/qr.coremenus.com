import { Model } from '@vuex-orm/core'
import Menu from './menu.model'

export default class MenuTranslation extends Model {
    static entity = 'menu_translations'

    static fields() {
        return {
            id: this.attr(''),
            name: this.attr(''),
            description: this.attr(''),
            locale: this.attr(''),
            MenuId: this.attr(''),
            menu: this.belongsTo(Menu, 'MenuId')
        }
    }
}