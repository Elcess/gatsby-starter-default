import axios from 'axios'
import Redux from 'redux'
import fertility from '../data/fertility.json'
import gni from '../data/gni.json'

// Initial State
const initialState = {}

// Actions
const DO_NOTHING = 'DO_NOTHING'
const GOT_FERTILITY = 'GOT_FERTILITY'
const GOT_GNI = 'GOT_GNI'

// Action Creators
export const doNothing = () => {
  return {
    type: DO_NOTHING,
  }
}

const gotFertility = data => {
  return {
    type: GOT_FERTILITY,
    data,
  }
}

const gotGNI = data => {
  return {
    type: GOT_GNI,
    data,
  }
}

// Thunk Creators
export const getFertility = () => {
  return dispatch => {
    try {
      // const { data } = await axios.get(
      //   '/http://api.worldbank.org/v2/countries/1w;us;xd;xt;xp;xn;xm/indicators/SP.DYN.TFRT.IN?date=1997:2016&format=jsonstat'
      // );
      // console.log(fertility);
      dispatch(gotFertility(fertility))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getGNI = () => {
  return dispatch => {
    try {
      // const { data } = await axios.get(
      //   '/http://api.worldbank.org/v2/countries/1w;us;xd;xt;xp;xn;xm/indicators/NY.GNP.PCAP.CD?date=1997:2016&format=jsonstat'
      // );
      dispatch(gotGNI(gni))
    } catch (err) {
      console.error(err)
    }
  }
}

// reducer
export default function dummyReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_FERTILITY:
      return { ...state, fertility: action.data }
    case GOT_GNI:
      return { ...state, gni: action.data }
    case DO_NOTHING:
      return state
    default:
      return state
  }
}
