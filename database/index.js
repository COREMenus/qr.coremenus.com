import { Database } from '@vuex-orm/core'
import Menu from '~/models/menu.model'
import MenuTranslation from '~/models/menu_translation.model'
import Option from '~/models/option.model'
import OptionTranslation from '~/models/option_translation.model'
import Product from '~/models/product.model'
import ProductTranslation from '~/models/product_translations.model'
import Section from '~/models/section.model'
import SectionTranslation from '~/models/section_translation.model'

const database = new Database()

const products = {

    getters: {
        getFields: (state) => (product, locale) => {
            const fields = {
                name: product.name,
                description: product.description
            }
            const translation = ProductTranslation.query().where('ProductId', product.id).where('locale', locale).first()
            if (!translation) return fields
            fields.name = translation.name
            fields.description = translation.description
            return fields
        }
    }
}


database.register(Menu)
database.register(MenuTranslation)
database.register(Section)
database.register(SectionTranslation)
database.register(Product, products)
database.register(ProductTranslation)
database.register(Option)
database.register(OptionTranslation)


export default database