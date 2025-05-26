import { mergeClass } from "@/libs/utils";

const CustomButton = ({
  text,
  handleOnclick,
}: {
  text: string;
  handleOnclick?: any;
}) => {
  return (
    <div>
      <button
        className={mergeClass(
          "bg-indigo-600 text-white border-none px-6 py-2.5 rounded-full font-bold cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg hover:bg-indigo-950"
        )}
        onClick={handleOnclick}
      >
        {text}
      </button>
    </div>
  );
};

export default CustomButton;
