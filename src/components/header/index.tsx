import Link from 'next/link';

const Header = () => {
  return (
    <header className='backdrop-blur max-h-20 fixed top-0 w-full flex justify-center'>
      <div className='container py-2 flex flex-row w-full justify-between'>
        <Link href={'/'}>
          <div className='uppercase text-lg font-semibold cursor-pointer'>CV Builder</div>
        </Link>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};

export default Header;
