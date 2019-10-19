export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD ENTRY'


export function receiveEntries(entries) {
    return {
        type: RECEIVE_ENTRIES,
        entries
    }
}

export function addEntry(entry) {

    console.log("Adding action", entry)
    return {
        type: ADD_ENTRY,
        entry
    }

}
