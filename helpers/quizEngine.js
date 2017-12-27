import {values} from 'lodash'

export function computeQuizResult(responsesByQuestion) {
    const responses = values(responsesByQuestion)
    const scores = responses.map(response => computeQuestionScore(response))
    const goodResponsesSum = scores.reduce((sum, currentValue) => sum + parseFloat(currentValue), 0)
    const ratio = (goodResponsesSum / responses.length).toFixed(2)
    return ratio * 100
}

const computeQuestionScore = (questionResponses) => {
    const goodResponsesCount = questionResponses.filter(response => response.isTruthy === response.userResponse).length
    const result = (goodResponsesCount / questionResponses.length).toFixed(2)
    return result
}