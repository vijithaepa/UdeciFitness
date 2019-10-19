import { ADD_ENTRY, RECEIVE_ENTRIES } from "../actions";

function entries(state = {}, action) {

    switch (action.type) {
        case ADD_ENTRY:
            console.log("Adding ", action.entry)
            return {
                ...state,
                ...action.entry
            }
        case RECEIVE_ENTRIES:
            return {
                ...state,
                ...action.entries
            }
        default:
            return state
    }
}

export default entries
