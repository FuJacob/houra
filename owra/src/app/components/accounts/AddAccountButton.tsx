import { useContext } from "react";
import { showAddAccountModalContext } from "../../accounts-mode/contexts";
const AddAccountButton = () => {
  const { setShowAddAccountModal } = useContext(showAddAccountModalContext);
  return (
    <button
      onClick={() => setShowAddAccountModal(true)}
      className="group relative px-6 py-3 transition-all duration-300 hover:scale-105"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/30 to-white/20 backdrop-blur-xl rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>

      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10 transition-all duration-300"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

      <div className="relative z-10 flex items-center gap-3">
        <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
          Add Account
        </span>
        <div className="relative">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm rounded-full transform rotate-3"></div>
          <div className="relative w-6 h-6 rounded-full bg-gray-900/90 backdrop-blur-sm text-white flex items-center justify-center text-sm leading-none border border-gray-800/20 shadow-lg group-hover:scale-110 transition-transform duration-300">
            +
          </div>
        </div>
      </div>
    </button>
  );
};

export default AddAccountButton;
