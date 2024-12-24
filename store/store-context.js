import { createContext, useReducer } from 'react'

export const topContext = createContext();

export const ACTION_TYPES = {
  SET_TOP_ARTISTS: 'SET_TOP_ARTISTS',
  SET_TOP_SONGS: 'SET_TOP_SONGS',
  SET_SORT_TIME_ARTISTS: 'SET_SORT_TIME_ARTISTS',
  SET_SORT_TIME_SONGS: 'SET_SORT_TIME_SONGS',
}

const topReducer = (state, action) => {
  switch(action.type){
    case ACTION_TYPES.SET_TOP_ARTISTS: {
      return { ...state, topArtists: action.payload.topArtists }
    }
    case ACTION_TYPES.SET_TOP_SONGS: {
      return { ...state, topSongs: action.payload.topSongs }
    }
    case ACTION_TYPES.SET_SORT_TIME_ARTISTS: {
      return { ...state, sortTimeArtists: action.payload.sortTimeArtists }
    }
    case ACTION_TYPES.SET_SORT_TIME_SONGS: {
      return { ...state, sortTimeSongs: action.payload.sortTimeSongs }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}` )
  }
}

const TopProvider = ({ children }) => {

  const initialState = {
    topArtists: "10",
    topSongs: "10",
    sortTimeArtists: false,
    sortTimeSongs: false,
  }

  const [state, dispatch] = useReducer(topReducer, initialState);

  return (
    <topContext.Provider value={{ state, dispatch}}>
      {children}
    </topContext.Provider>
  );

};

export default TopProvider;
