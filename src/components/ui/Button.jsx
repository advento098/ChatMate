export default function Button({
  onClick,
  className = "px-3 w-auto h-10 rounded-lg bg-blue-300 cursor-pointer hover:bg-blue-400 hover:text-white",
  children,
  onMouseDown,
  onMouseUp,
}) {
  return (
    <button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
