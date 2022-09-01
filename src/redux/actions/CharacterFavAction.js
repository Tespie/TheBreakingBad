import { types } from './ActionType';


export const setrestaurentFavIdsList = (restaurentfavIds, item, remove = false) => {
  return async dispatch => {
    try {
      dispatch(loginLoader(restaurentfavIds, item, remove))
    }
    catch (error) {
      console.log('ERROR: ', error)
    }
  }
}

export const loginLoader = (restaurentfavIds, item, remove = false) => {
  var favEventList = restaurentfavIds
  if (remove) {
    return { type: types.FAVORITE_RESTAURENT_IDS, data: [] }
  }
  else if (item.isfavorite == "N") {
    const update = favEventList.filter(i => {
      console.log('loginLoader I: ', JSON.stringify(i))
      if (i.char_id !== item.char_id) {
        return i
      }
    })
    return { type: types.FAVORITE_RESTAURENT_IDS, data: update }
  } else {
    favEventList.push(item)
    return { type: types.FAVORITE_RESTAURENT_IDS, data: favEventList }
  }
}