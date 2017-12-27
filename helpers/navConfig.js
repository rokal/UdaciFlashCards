import {primary, white,} from './colors'

export const getTabNavOptions = (title) => {
    return {
        tabBarOptions: {
            activeTintColor: white,
            style: {
                height: 56,
                backgroundColor: primary
            }
        },
        navigationOptions: {
            headerTintColor: white,
            title,
            headerStyle: {
                backgroundColor: primary,
                elevation: 0,
                shadowOpacity: 0
            }
        }
    }
}
