const ProgressBar = ({ step }) => {
  const progress = (step / 3) * 100;
  return (
    <div className="bg-gray-200 rounded-full h-2.5 mb-10">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
