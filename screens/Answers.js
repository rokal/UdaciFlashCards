import React from 'react'
import {View, Text} from 'react-native'
import {map} from 'lodash'

export default function Answers ({answers}) {
    return (
        <View>
            {map(answers, (ans, index) => {
                return (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}} key={index} >
                        <Text>{`${index+1} - `}</Text>
                        <Text>{`${ans.body} - `}</Text>
                        <Text style = {{color: ans.isTruthy ? 'green' : 'red'}}>{ans.isTruthy ? 'Is true' : 'Is false'}</Text>
                    </View>
                )
            })}
        </View>
    )
}