// 由一个组件，向上找到最近的指定组件

function findComponentUpward(context, componentName) {
    let parent = context.$parent;
    let name = parent.$options.name;

    while (parent && (!name || [componentName].indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}
// 由一个组件，向上找到所有的指定组件
function findComponentsUpward(context, componentName) {
    let parents = [];
    const parent = context.$parent;

    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent);
        return parents.concat(findComponentsUpward(parent, componentName));
    } else {
        return [];
    }
}
// 由一个组件，向下找到最近的指定组件
function findComponentDownward(context, componentName) {
    const childrens = context.$childrens;
    let children = null;
    if (childrens.length) {
        for (const child of childrens) {
            if (child.$options.name === componentName) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children;
}
// 由一个组件，向下找到所有指定的组件
function findComponentsDownward(context, componentName) {
    return context.$childrens.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []); //提供一个初始值[]
}
// 由一个组件，找到指定组件的兄弟组件
function findBrothersComponents(context, componentName, exceptMe = true) {
    let res = context.$parent.$childrens.filter(item => {
        return item.$options.name === componentName;
    });
    // Vue.js 在渲染组件时，都会给每个组件加一个内置的属性 _uid，这个 _uid 是不会重复的，借此我们可以从一系列兄弟组件中把自己排除掉。
    let index = res.findIndex(item => item._uid === context._uid);
    if (exceptMe) res.splice(index, 1);
    return res;
}

export {
    findComponentUpward,
    findComponentsUpward,
    findComponentDownward,
    findComponentsDownward,
    findBrothersComponents
}