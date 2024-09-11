type Button = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  selectedInputMode: string;
};
const selected = "bg-cyan-500 hover:bg-cyan-600 ";
const notSelected = " bg-gray-600 hover:bg-gray-700";

const InputModeButton = ({ text, onClick, selectedInputMode }: Button) => {
  const selectedStyling = () => {
    return selectedInputMode === text ? selected : notSelected;
  };
  return (
    <button
      onClick={onClick}
      className={`py-2 px-6  text-white font-semibold rounded-full focus:outline-none transition transform hover:scale-105 duration-200 ${selectedStyling()}`}
    >
      {text}
    </button>
  );
};

export default InputModeButton;
