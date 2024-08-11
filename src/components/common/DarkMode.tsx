import { useState } from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { MdOutlineWbSunny } from 'react-icons/md';

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightDarkClickHandler = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle('dark');
  };

  return (
    <button
      onClick={lightDarkClickHandler}
      className="p-2 border-[1px] rounded-full bg-slate-800 border-slate-600 cursor-pointer"
    >
      {isDarkMode ? (
        <MdOutlineWbSunny
          fontSize={15}
          className="text-[color:var(--light-color)]"
        />
      ) : (
        <FaRegMoon fontSize={15} />
      )}
    </button>
  );
};

export default DarkMode;
