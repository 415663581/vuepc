import store from '@/store/index'
let stateData = store.state.navData
export function getChildCategory (curid, categorData = stateData, childids = []) {
    categorData.forEach((item) => {
        if (item.id === parseInt(curid)) {
            childids.push(curid)
            if (item.children) {
                item.children.forEach((subitem) => {
                    getChildCategory(subitem.id, item.children, childids)
                })
            }
        }
    })
    let readyids = childids
    return readyids
}
