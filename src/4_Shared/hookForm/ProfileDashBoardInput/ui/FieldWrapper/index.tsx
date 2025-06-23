const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, isModifyMode, children } = props;
  return (
    <div className="w-full">
      <label
        className={`text-xs font-semibold uppercase mb-2 block transition-colors duration-200 ${
          isModifyMode ? "text-grass" : "text-gray-400"
        }`}>
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5">{error.message}</p>}
    </div>
  );
};
export default FieldWrapper;
