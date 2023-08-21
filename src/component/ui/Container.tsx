import { ReactNode, useState } from 'react';
const Container = ({
  container1,
  container2,
}: {
  container1: ReactNode;
  container2: ReactNode;
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex flex-col p-10 gap-4 font-sans">
        <h1 className="text-6xl tracking-wide font-extrabold">Hello, world</h1>
        {show ? container1 : null}
      </div>
      <div className="flex flex-col gap-4 p-10">
        {container2}
        <button
          className="h-10 bg-green-400 rounded-md m-4 outline-none w-24 hover:scale-110 transition duration-100 ease-in-out"
          onClick={() => setShow((prev) => !prev)}
        >
          {' '}
          Click
        </button>
      </div>
    </>
  );
};

export default Container;
