import { Model } from '@vuex-orm/core'
import Section from './section.model'


export default class SectionTranslation extends Model {
    static entity = 'section_translations'

    static fields() {
        return {
            id: this.attr(''),
            name: this.attr(''),
            description: this.attr(''),
            locale: this.attr(''),
            SectionId: this.attr(''),
            menu: this.belongsTo(Section, 'SectionId')
        }
    }
}