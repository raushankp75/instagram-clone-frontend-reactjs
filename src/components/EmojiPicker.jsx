import React, { useState } from 'react'
import emojiSvg from '../assets/emoji-add-svgrepo-com.svg'

// emoji picker
import EmojiPicker from 'emoji-picker-react';

const EmojiPicker = () => {

    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    return (
        <div className="picker-container">
            <input
                className="input-style"
                value={inputStr}
                onChange={e => setInputStr(e.target.value)} />
            <img
                className="emoji-icon"
                src={emojiSvg}
                onClick={() => setShowPicker(val => !val)} />
            {showPicker && <EmojiPicker
                pickerStyle={{ width: '100%' }}
                onEmojiClick={onEmojiClick} />}
        </div>
    )
}

export default EmojiPicker