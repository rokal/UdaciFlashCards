import {AsyncStorage} from 'react-native'
import {Permissions, Notifications} from 'expo'

export const NOTIFICATIONS_KEY  = 'UdaciFlashCard:Notifications'

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATIONS_KEY)
        .then(JSON.parse)
        .then(data => {
            if(data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                    if(status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() +1)
                        tomorrow.setHours(20)
                        tomorrow.setMinutes(0)

                        Notifications.scheduleLocalNotificationAsync(
                            {
                                title: 'Take your quiz',
                                body: 'You haven\'t study today yet. \\n Take a look on your daily tasks!',
                                android: {
                                    vibrate: true,
                                    priority: 'high',
                                    sound: true,
                                    sticky: false
                                },
                                ios: {
                                    sound: true
                                }
                            },
                            {
                                time: tomorrow,
                                repeat: 'day'
                            }
                        )
                        AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATIONS_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)
}