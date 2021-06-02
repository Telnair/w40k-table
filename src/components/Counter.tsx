export const Counter: React.FC<{ step?: number; onChange: (value: number) => void; value: number }> = (props) => {
  const { value, step = 1, onChange } = props;

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const isDecrement = e.shiftKey;
    const nextValue = value + step * (isDecrement ? -1 : 1);
    onChange(Math.max(0, nextValue));
  }

  return (
    <span className="accented counter" style={{ cursor: 'pointer' }} onClick={handleClick}>{value}</span>
  );
};