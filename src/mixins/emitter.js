//广播
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        let name = child.$options.name;
        if (name === componentName) {
            child.$emit(eventName, params);
        } else {
            broadcast.call(child, componentName, eventName, params);
        }
    });
}
//派发
function dispatch(componentName, eventName, params) {
    let parent = this.$parent || this.$root;
    let name = parent.$options.name;

    while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    if (parent) {
        parent.$emit(eventName, params);
    }
}

export default {
    methods: {
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        },
        dispatch(componentName, eventName, params) {
            dispatch.call(this, componentName, eventName, params);

        }
    }
}