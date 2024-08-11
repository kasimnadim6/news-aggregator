import { PiNewspaperClippingDuotone } from 'react-icons/pi';
import { FiSearch } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkMode from './DarkMode';
import { RxHamburgerMenu } from 'react-icons/rx';
import { RiCloseLargeFill } from 'react-icons/ri';
import './Navbar.css';

type NavbarProps = {
  menuList: string[];
  searchQuery: string;
  setSearchQuery: (searchKey: string) => void;
};

const Navbar = ({ menuList, searchQuery, setSearchQuery }: NavbarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const searchQueryRef = useRef<HTMLInputElement>(null);
  const searchHandler = () => {
    if (searchQueryRef.current) {
      setSearchQuery(searchQueryRef.current.value);
    }
  };
  const changeMenuHandler = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    setIsNavOpen(false);
    const searchKey = (e.target as HTMLButtonElement).getAttribute(
      'data-search_key'
    );

    if (searchKey) {
      setSearchQuery(searchKey);
    }
    // personalized news page
    if (searchKey?.toLowerCase() === 'personalized') {
      navigate('/personalized');
      return;
    }
    navigate('/dashboard');
  };
  return (
    <nav className="sticky top-0 left-0 h-16 flex place-content-around bg-blue-950 text-white items-center p-2 gap-2 w-full z-50">
      <Link to="/dashboard" className="flex items-center gap-2">
        <PiNewspaperClippingDuotone className="text-[2rem]" />
        <h1 className="font-bold text-2xl">NEWS</h1>
      </Link>
      <div className="flex items-center relative w-72">
        <input
          type="text"
          className="text-black dark:text-white outline-none pl-3 pr-7 py-1 w-full rounded-2xl"
          placeholder="Search for articles"
          ref={searchQueryRef}
          onKeyUp={(e) => e.key === 'Enter' && searchHandler()}
        />
        <FiSearch
          className="absolute right-2 text-black cursor-pointer"
          onClick={searchHandler}
        />
      </div>
      <div className="block sm:hidden">
        <ul
          className="flex gap-4 font-light text-base tracking-wide cursor-pointer"
          onClick={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) =>
            changeMenuHandler(e)
          }
        >
          {menuList.map((menu) => {
            const isSelected = searchQuery.toLowerCase() === menu.toLowerCase();
            return (
              <li
                key={menu}
                className={`${
                  isSelected &&
                  'border-b-[1px] border-blue-200 transition ease-in-out delay-1000'
                }`}
                data-search_key={menu}
              >
                {menu}
              </li>
            );
          })}
        </ul>
      </div>
      <DarkMode />
      <div className="hidden sm:flex">
        <div
          className="space-y-2"
          onClick={() => setIsNavOpen((prev: boolean) => !prev)}
        >
          <RxHamburgerMenu
            className="text-gray-100 animate-pulse"
            fontSize={24}
          />
        </div>
        <div className={`${isNavOpen ? 'show-nav' : 'hidden'}`}>
          <ul
            className="flex flex-col items-center justify-between min-h-[225px]"
            onClick={(e) => changeMenuHandler(e)}
          >
            {menuList.map((menu) => {
              const isSelected =
                searchQuery.toLowerCase() === menu.toLowerCase();
              return (
                <li
                  key={menu}
                  className={`${
                    isSelected &&
                    'border-b-[1px] border-blue-200 transition ease-in-out delay-1000'
                  }`}
                  data-search_key={menu}
                >
                  {menu}
                </li>
              );
            })}
          </ul>
          <RiCloseLargeFill
            onClick={() => setIsNavOpen(false)}
            fontSize={18}
            className="animate-pulse"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
