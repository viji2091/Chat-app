import React from 'react'

const PopUp = ({ isOpen, onClose, linkId }) => {

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(linkId).then(() => {
            alert('Link ID copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h3 className="text-lg font-bold mb-4">Link ID</h3>
                <p className="mb-4">{linkId}</p>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                    onClick={handleCopy}
                >
                    Copy
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default PopUp
