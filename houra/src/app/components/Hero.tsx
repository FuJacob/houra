import { FaGooglePlay, FaAppStore, FaUsers } from "react-icons/fa6";
const Hero = () => {
  return (
    <div className="flex-col justify-center items-center">
      <div className="py-24">
        <div className="flex justify-center items-center gap-8 font-semibold mb-6">
          <p className="flex justify-center items-center gap-2">
            <FaAppStore className="text-2xl" /> 4.8 ★ on App Store{" "}
            <span className="text-gray-500">152K reviews</span>
          </p>
          <p className="flex justify-center items-center gap-2">
            <FaGooglePlay className="text-2xl" />
            4.8 ★ on Google Play{" "}
            <span className="text-gray-500">1.3M reviews</span>
          </p>
        </div>
        <h1 className="font-sans font-black text-9xl uppercase text-center">
          One timer to save and spend time
        </h1>
        <p className="text-2xl font-semibold text-gray-500 px-54 py-8 text-center">
          Make your money work worldwide, for less. Send, spend and get paid. 40
          currencies. All at your fingertips.
        </p>

        <div className="flex justify-center gap-8 font-semibold text-lg">
          <button className="rounded-full px-8 py-4 bg-primary">
            Open an account
          </button>
          <button className="underline underline-offset-4">
            How does it work?
          </button>
        </div>
        <video
          src="https://wise.com/static-assets/app/_next/static/media/video-11090f1863ab5205b31842f53003fbea.webm"
          autoPlay
          muted
          className="autoplay w-full py-18"
        ></video>
        <div className="bg-gray-200 h-0.5" />
        <ul className="flex gap-2">
          <li className="flex-col px-8 py-12">
            <FaUsers className="text-xl bg-gray-200 w-16 h-16 p-4 rounded-full" />

            <div className="py-4">
              <h3 className="text-xl font-semibold py-2">
                Trusted by millions
              </h3>
              <p>
                Millions of customers globally move around 18 billion CAD each
                month
              </p>
            </div>
          </li>{" "}
          <li className="flex-col px-8 py-12">
            <FaUsers className="text-xl bg-gray-200 w-16 h-16 p-4 rounded-full" />

            <div className="py-4">
              <h3 className="text-xl font-semibold py-2">
                Trusted by millions
              </h3>
              <p>
                Millions of customers globally move around 18 billion CAD each
                month
              </p>
            </div>
          </li>{" "}
          <li className="flex-col px-8 py-12">
            <FaUsers className="text-xl bg-gray-200 w-16 h-16 p-4 rounded-full" />

            <div className="py-4">
              <h3 className="text-xl font-semibold py-2">
                Trusted by millions
              </h3>
              <p>
                Millions of customers globally move around 18 billion CAD each
                month
              </p>
            </div>
          </li>{" "}
        </ul>
      </div>
      <div className="bg-primary h-screen flex py-36 justify-center items-center">
        <div className="flex-col w-2/3 p-46">
          <h4 className="text-4xl font-bold py-6">Save on fees when sending money abroad</h4>
          <p className="pb-8" >
            Whether it’s 50 euros or 50,000 dollars, sending money shouldn't
            cost the earth. Wise lets you transfer money internationally, free
            from hidden fees. Try our calculator to see how much you can save
            versus high street banks.
          </p>
          <button className="bg-secondary px-8 py-4 text-primary font-bold rounded-full">Learn how to send money</button>
        </div>
        <div className="bg-white h-full w-1/3 mx-12">asd asd asd asd </div>
      </div>
    </div>
  );
};

export default Hero;
