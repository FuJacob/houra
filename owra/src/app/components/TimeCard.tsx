import Link from "next/link";

interface TimeCardProps {
  seconds: number;
}

const TimeCard = ({ seconds }: TimeCardProps) => {
  return (
    <>
      <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-4">
        Why not spend and save like it?
      </p>
      <div className="absolute left-1/2 transform -translate-x-1/2 z-0 bg-white/10 backdrop-blur-2xl border border-gray-500/20 rounded-2xl shadow-lg shadow-black/5 w-96 h-[32rem] p-6 flex flex-col mx-auto">
        {/* Card Header */}
        <div className="flex justify-between mb-4 items-center">
          <div className="flex flex-col text-start">
            <p className="text-gray-500 font-light text-5xl mb-2">owra</p>
            <div className="text-base font-medium">
              It's been <span className="font-bold">{seconds} seconds</span>.
            </div>
          </div>
          <img src="/logo.svg" className="w-10" alt="Owra logo" />
        </div>

        {/* Card Image */}
        <div className="flex justify-end w-full px-6">
          <img src="/vertical_card.png" alt="Card" className="w-20" />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col w-full gap-3">
          <Link
            href="/signup"
            className="w-full px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-lg font-medium text-center"
          >
            Signup
          </Link>
          <Link
            href="/flex-mode"
            className="w-full px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-gray-400 hover:text-gray-900 transition-colors text-lg font-medium text-center"
          >
            Or try as a guest
          </Link>
        </div>
      </div>
    </>
  );
};

export default TimeCard;
