import React, { useState } from 'react';

const AddInterface = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const handleSave = () => {
    const event = {
      title,
      start,
      end,
    };

    onSave(event);
    onClose();
  };

  return (
    <div className="add-interface">
      <div className="overlay-content">
      </div>
    </div>
  );
}

export default AddInterface;
