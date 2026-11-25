import { STATUS } from "./status"

export const compareNumber = (guess, answer) => {
    if (guess == null || answer == null) return {status: STATUS.UNKNOWN}
    if (guess === answer) return {status: STATUS.EXACT}
    return { status: STATUS.NONE, direction: answer > guess ? 'higher' : 'lower'}
}

export const compareSets = (guess, answer) => {
    if (guess == null || answer == null) return {status: STATUS.UNKNOWN}
    const matches = guess.map(item=>answer.includes(item) ? STATUS.EXACT : STATUS.NONE)
    if (guess.length === answer.length && answer.every(item => guess.includes(item))) 
        return {status: STATUS.EXACT, matches}
    const sameTraits = guess.filter(item => answer.includes(item))
    if (sameTraits.length === 0) 
        return {status: STATUS.NONE, matches}
    return {status: STATUS.PARTIAL, matches}
}

export const compareEqual = (guess, answer) => {
    return {status: guess === answer ? STATUS.EXACT : STATUS.NONE}
}

export const compareAttacks = (guess, answer) => {
    const answerNames = new Set(answer.map(attack => attack.name))
    const answerEffects = new Set(answer.flatMap(attack => attack.effects))
    const comparison = guess.map(attack => {
        if (answerNames.has(attack.name)) 
            return {name: attack.name, status: STATUS.EXACT, sharedEffects: []}
        else if (attack.effects.filter((e)=>answerEffects.has(e)).length !== 0) 
            return {name: attack.name, status: STATUS.PARTIAL, 
            sharedEffects: attack.effects.filter((e)=>answerEffects.has(e))}
        else 
            return {name: attack.name, status: STATUS.NONE, sharedEffects: []}
    })
    return {results: comparison, allExact: comparison.every((c)=>c.status === STATUS.EXACT)}
}

export const compareRow = (guess, answer, columns) => {
    return columns.map((column) => {
        const g = column.get(guess)
        const a = column.get(answer)
        return { key: column.key, value: g, text: column.format ? column.format(g): g,  ...column.compare(g, a) }
    })
}
