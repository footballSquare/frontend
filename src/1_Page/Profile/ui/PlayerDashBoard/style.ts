const STYLE = {
  container:
    "flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-white shadow-md rounded-lg",
  playerCard: "hidden sm:flex justify-center items-center",
  playerBox:
    "w-[120px] sm:w-[100px] md:w-[140px] lg:w-[160px] aspect-[3/4] bg-blue-900 text-white rounded-lg flex flex-col items-center justify-between p-4 shadow-md",
  formContainer: "w-full max-w-sm",
  formTitle: "text-blue-600 font-semibold text-center text-sm",
  formSubtitle: "text-lg font-bold text-center mt-1",
  formText: "text-gray-500 text-center text-xs",
  inputGroup: "grid grid-cols-2 gap-2",
  inputBox: "w-full p-1 text-xs",
  inputDisabled: "border-b bg-transparent text-gray-500",
  inputEnabled: "border rounded-md",
  disableSelectBox: "w-full p-1 text-xs border-b bg-transparent text-gray-500 ",
  enableSelectBox: "w-full p-1 text-xs border rounded-md",
  errorMessage: "text-red-500 text-xs",
  button: "w-full py-1 text-xs rounded-md font-bold mt-1",
  buttonBox:
    "flex w-full py-1 text-xs rounded-md font-bold mt-1 justify-end gap-2",
  saveButton: "bg-blue-600 text-white",
  editButton: "bg-blue-600 text-white",
  buttonContainer: "grid grid-cols-2 gap-1 w-full mt-2",
  logoutButton:
    "w-full h-6 border border-blue-600 text-blue-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200",
  deleteButton:
    "w-full h-6 border border-red-600 text-red-600 font-semibold px-2 py-0.5 text-[10px] rounded shadow-sm transition-all duration-200",
  buttonDisabled: "opacity-50 cursor-not-allowed",
  buttonHoverLogout: "hover:bg-blue-100",
  buttonHoverDelete: "hover:bg-red-100",
  roleText: "text-xs font-bold self-start",
  imageContainer: "flex-1 flex items-center justify-center",
  image: "max-w-[80%] max-h-[60%] object-contain",
  textContainer: "text-center",
  playerName: "text-sm font-semibold",
  playerNumber: "text-xs",
  explainLabel: "text-xs font-medium text-gray-600",
};
export default STYLE;
