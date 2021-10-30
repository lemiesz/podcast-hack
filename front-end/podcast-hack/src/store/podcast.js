//TYPE CONSTANTS
const LOAD = "podcast/load";
const ADD = "podcast/add";
const EDIT = "podcast/edit";
const REMOVE = "podcast/delete";

// ACTION CREATORS

const load = (podcast) => ({
    type: LOAD,
    podcast
})

const edit = (podcast) => ({
    type: EDIT,
    podcast
})

const add = (podcast) => ({
    type: ADD,
    podcast
})

const remove = (podcast) => ({
    type: REMOVE,
    podcast
})

