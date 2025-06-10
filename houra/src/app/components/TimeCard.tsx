import Link from "next/link";

interface TimeCardProps {
  seconds: number;
}

const TimeCard = ({ seconds }: TimeCardProps) => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 z-0 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-lg shadow-black/5 w-72 h-[26rem] p-6 flex flex-col justify-between items-center mx-auto">
      {/* Card Header */}
      <div className="w-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-500 font-light text-4xl mb-2">houra</p>
            <div className="text-sm font-medium">
              It's been <span className="font-bold">{seconds} seconds</span>.
            </div>
          </div>
          <img src="/logo.svg" className="w-8" alt="Houra logo" />
        </div>
      </div>

      {/* Card Image */}
      <div className="flex justify-end w-full px-6">
        <img src="/vertical_card.png" alt="Card" className="w-12" />
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
          href="/timer"
          className="w-full px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-gray-400 hover:text-gray-900 transition-colors text-lg font-medium text-center"
        >
          Or try as a guest
        </Link>
      </div>
    </div>
  );
};

export default TimeCard;
