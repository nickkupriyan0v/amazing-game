import { updateUser } from '../features/slices/sliceUser'
import { userRequests } from '../api/userRequests'
import { Dispatch } from '@reduxjs/toolkit'

export const addUserInfo2Store = (dispatch: Dispatch) => {
  userRequests
    .getUserInfo()
    .then(data => {
      if (data.success === true) {
        console.log(data)
        dispatch(updateUser(data.data))
      } else {
        console.log(data)
        console.log('error -->', data.error)
      }
    })
    .catch(data => {
      console.log(data)
      console.log('error -->', data.error)
    })
}
