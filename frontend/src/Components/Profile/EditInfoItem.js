import React from 'react'
import editInfoStyles from './ProfileInfo.module.css'
import buttonStyles from './DrawBorderButton.module.scss'

const EditInfoItem = ({itemName, input1, input2, stopShowingEdit, saveEvent, onInput2, onInput1, type}) => {

    let handleCancel = () => {
        stopShowingEdit()
    }

    let handleSave = () => {
        stopShowingEdit()
        saveEvent()
    }

  return (
    <div className={editInfoStyles.editInfoWrapper}>
        <div className={editInfoStyles.profileInfoItem}>{itemName}</div>
        <input type={type} className={editInfoStyles.editInfoInput} placeholder={input1} onInput={onInput1}></input>
        <input type={type} className={editInfoStyles.editInfoInput} placeholder={input2} onInput={onInput2}></input>
        <div className={editInfoStyles.editInfoButtonWrapper}>
            <button className={buttonStyles.drawCancelBorder} onClick={handleCancel}>Cancel</button>
            <button className={buttonStyles.drawBorder} onClick={handleSave}>Save Changes</button>
        </div>
    </div>
  )
}

export default EditInfoItem