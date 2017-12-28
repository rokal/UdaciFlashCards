import {StyleSheet} from 'react-native'

const text = {
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
}

const center = {
    justifyContent: 'center',
    alignItems: 'center',
}
const styles = StyleSheet.create({
    center,
    text,
    inputText: {
        width: '100%',
        height: 40,
        textAlign: 'center',
        ...text
    },
    btn: {
        fontSize: 20,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft: 15,
        paddingRight: 15
    },
    container: {
        flex: 1,
        ...center
    }
})

export default styles