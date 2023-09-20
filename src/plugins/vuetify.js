import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import {createVuetify} from 'vuetify'

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'myCustomTheme',
        themes: {
            myCustomTheme: {
                dark: false,
                variables: {},
                colors: {
                    background: '#fff',
                    primary: '#000',
                    paletteBlue: '#127cd2',
                    paletteLightBlue: '#C7EEFF',
                    paletteWhite: '#F1FCFD',
                    paletteBlack: '#393737'
                },
            }
        },
        icons: {
            defaultSet: 'fa',
            aliases,
            sets: {
                fa,
                mdi,
            },
        },
    }
})