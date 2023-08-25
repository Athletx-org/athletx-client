import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
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
                    surface: '#fff',
                    primary: '#fff',
                    'primary-darken-1': '#000',
                    secondary: '#03DAC5',
                    'secondary-darken-1': '#03DAC5',
                    error: '#ff0000',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00'
                },
            }
        }
    }
})