import { useState } from "react";

export const Editable: React.FC<{ initialValue: string; className?: string; }> = (props) => {
  const { initialValue, className } = props;
  const [ isEdited, setIsEdited ] = useState(false);
  const [ value, setValue ] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleToggle = () => setIsEdited(!isEdited);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => e.target.select();

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleToggle();
  }

  return (
    <span className={className} style={{ cursor: 'pointer' }}>
      {isEdited
        ? <input
          type="text"
          className="editable"
          value={value}
          onChange={handleChange}
          onBlur={handleToggle}
          onKeyDown={handleEnterKey}
          autoFocus
          onFocus={handleFocus}
          spellCheck="false"
        />
        : <span onClick={handleToggle}>{value.trim() || initialValue}</span>
      }
    </span>
  );
}