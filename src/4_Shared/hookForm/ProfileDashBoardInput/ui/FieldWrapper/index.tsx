const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, isModifyMode, children } = props;
  return (
    <div
      className={`mb-6 p-2 rounded-lg transition-all duration-200 ${
        isModifyMode
          ? "border border-gray-500 bg-gray-500/20 text-grass shadow-sm"
          : "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 hover:border border-grass hover:bg-grass/20 hover:text-grass hover:shadow-sm active:border active:border-grass active:bg-grass/20 active:text-grass active:shadow-sm"
      }`}>
      <label className="text-xs font-semibold text-gray-300 uppercase mb-1 block">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-1 pl-2">{error.message}</p>
      )}
    </div>
  );
};
export default FieldWrapper;
