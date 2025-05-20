import { FaGooglePlay, FaAppStore, FaUsers } from "react-icons/fa6";
const Hero = () => {
  return (
    <div className=" flex-col flex justify-center items-center">
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
          Time is Currency. Spend It Wisely.
        </h1>
        <p className="text-xl text-gray-500 px-82 py-8 text-center">
          Spend your time like money. Buy, save, and manage daily time limits
          across your favorite activities — from gaming and streaming to
          studying and working. Clear, intentional, and in your control.
        </p>

        <div className="flex justify-center gap-8 font-semibold text-lg">
          <button className="rounded-full px-8 py-4 bg-primary">
            Start Managing Your Time
          </button>
          <button className="underline underline-offset-4">
            How does it work?
          </button>
        </div>
        <video
          src="/portfoliovideofinal.mp4"
          autoPlay
          loop
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
      <div className="bg-primary h-screen flex py-36 justify-center w-screen items-center">
        <div className="max-w-7xl flex-row flex justify-center items-center">
          <div className="flex flex-col items-start w-1/2 pr-24 text-left">
            <h4 className="text-4xl font-bold py-6">
              High speed, low fee transfers
            </h4>
            <p>
              Use our calculator to check prices for transfers in any of 40+
              currencies. Whether scheduling payments or putting down deposits —
              over half our transfers get there in under 20 seconds.1 Use it to
              believe it.
            </p>
            <button className="bg-secondary rounded-full text-primary px-8 py-4 font-bold mt-8">
              Learn how to send money
            </button>
          </div>
          <div className="w-1/2 pl-24">
            <div className="bg-white w-full rounded-3xl p-12 flex flex-col justify-center ">
              <p> Rate guaranteed (8h)</p> <p>1 USD = 0.8894 EUR</p>
              <ul className="space-y-6">
                <li>
                  <p className="font-semibold mb-2">You send exactly</p>
                  <div className="flex text-2xl font-bold border-1 rounded-xl w-full px-6 py-4 flex justify-between items-center">
                    <p> 1000 </p>
                    <p>USD</p>
                  </div>
                  <p className="text-gray-500 text-sm ">
                    Sending over 20,000 GBP or equivalent? We'll discount our
                    fee
                  </p>
                </li>
                <li>
                  <p className="font-semibold mb-2">Recipient gets</p>
                  <div className="flex text-2xl font-bold border-1 rounded-xl w-full px-6 py-4 flex justify-between items-center">
                    <p>884.53</p>
                    <p>EUR (ACH)</p>
                  </div>
                </li>
                <li>
                  <p className="font-semibold mb-2">Paying with</p>
                  <div className="flex text-2xl font-bold border-1 rounded-xl w-full px-6 py-4 flex justify-between items-center">
                    <p>Connected bank account (ACH)</p>
                  </div>

                  <ul className="text-gray-500 text-sm mb-2 mt-4 flex space-y-2 border-1 border-gray-300 rounded-2xl p-6 justify-center flex-col">
                    <li className="flex justify-between items-center">
                      <p> Change Connected bank account (ACH) fee </p>
                      <p>1.70 USD</p>
                    </li>

                    <li className="flex justify-between items-center">
                      <p>Our fee </p>
                      <p>1.70 USD</p>
                    </li>
                    <div className="h-0.25 bg-gray-300 w-full" />
                    <li className="flex justify-between items-center font-semibold">
                      <p> Total included fees (0.55%)</p>
                      <p>1.70 USD</p>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="flex text-sm flex-col justify-center items-start mt-2 mb-4">
                <p>You could save up to 37.65 USD</p>
                <p>Should arrive by Tuesday 9:00 AM</p>
              </div>{" "}
              <div className="flex w-full gap-2">
                <button className="border-1 rounded-full w-1/2 py-2 font-semibold">
                  Compare fees
                </button>
                <button className="bg-primary rounded-full w-1/2 py-2 font-semibold">
                  Send money
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* new section */}
      <div className="h-screen flex flex-col items-center w-screen bg-accent-2 py-20 ">
        <div className="w-full max-w-7xl flex flex-col items-center">
          <h2 className="text-5xl font-semibold mb-6">
            Do more with Wise in the US
          </h2>
          <p className="mb-6">
            You can use Wise for much more than just sending money. Here is
            what's available, based on where you live.
          </p>
          <button className="px-8 py-4 bg-primary rounded-full">
            Open an account
          </button>

          <ul className="flex justify-center items-center space-x-6 p-12">
            <li className="flex flex-col items-center justify-center gap-4 p-12 bg-background rounded-3xl">
              <img
                src="https://wise.com/static-assets/app/_next/static/media/bankDetails.USD.9509cf05.svg"
                alt=""
              />
              <p className="text-2xl font-semibold">Receive money fast</p>{" "}
              <p className="">
                Get paid easily in other currencies with global account details.
              </p>
              <p className="font-semibold">23 currencies</p>
              <button className="px-4 py-2 border-1 rounded-full">
                Explore getting paid
              </button>
            </li>

            <li className="flex flex-col items-center justify-center gap-4 p-12 bg-background rounded-3xl">
              <img
                src="https://wise.com/static-assets/app/_next/static/media/bankDetails.USD.9509cf05.svg"
                alt=""
              />
              <p className="text-2xl font-semibold">Receive money fast</p>{" "}
              <p className="">
                Get paid easily in other currencies with global account details.
              </p>
              <p className="font-semibold">23 currencies</p>
              <button className="px-4 py-2 border-1 rounded-full">
                Explore getting paid
              </button>
            </li>

            <li className="flex flex-col items-center justify-center gap-4 p-12 bg-background rounded-3xl">
              <img
                src="https://wise.com/static-assets/app/_next/static/media/bankDetails.USD.9509cf05.svg"
                alt=""
              />
              <p className="text-2xl font-semibold">Receive money fast</p>{" "}
              <p className="">
                Get paid easily in other currencies with global account details.
              </p>
              <p className="font-semibold">23 currencies</p>
              <button className="px-4 py-2 border-1 rounded-full">
                Explore getting paid
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
