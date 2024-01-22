import React, { useState } from 'react';

const InputBar = ({ onSend }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            onSend(input.trim());
            setInput('');
        }
    };

    return (
        <div className="input-bar d-flex">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="form-control form-control-lg me-2"
                placeholder="Type your message here..."
            />
            <button onClick={handleSend} className="btn btn-lg btn-primary">
                Send
            </button>
        </div>
    );
};

export default InputBar;