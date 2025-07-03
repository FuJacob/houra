import { useRef, useEffect } from "react";
import { getPiPStyles } from "./timer";

interface Account {
  id: string;
  account_name: string;
  colour: string;
}

interface TimerState {
  running: boolean;
  timeLeft: number;
}

interface UsePictureInPictureProps {
  selectedAccount: Account;
  state: TimerState;
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;
  formatTime: (hours: number, minutes: number, seconds: number) => string;
}

// Type declaration for Document Picture-in-Picture API
declare global {
  interface Window {
    documentPictureInPicture?: {
      requestWindow: (options: {
        width: number;
        height: number;
      }) => Promise<Window>;
    };
  }
}

export const usePictureInPicture = ({
  selectedAccount,
  state,
  hoursLeft,
  minutesLeft,
  secondsLeft,
  formatTime,
}: UsePictureInPictureProps) => {
  const pipWindowRef = useRef<Window | null>(null);

  // Picture-in-Picture functionality
  const createPiPWindow = async () => {
    if (!("documentPictureInPicture" in window)) {
      console.log("Document Picture-in-Picture not supported");
      return;
    }

    try {
      const pipWindow = await window.documentPictureInPicture!.requestWindow({
          height: 100,
          width: 200,
      });

      pipWindowRef.current = pipWindow;

      // Style the PiP window
      const styleElement = pipWindow.document.createElement("style");
      styleElement.textContent = getPiPStyles(selectedAccount.colour);
      pipWindow.document.head.appendChild(styleElement);

      // Create the container
      const containerDiv = pipWindow.document.createElement("div");
      containerDiv.className = "pip-container";

      // Create the timer display
      const timerDiv = pipWindow.document.createElement("div");
      timerDiv.className = "pip-timer";
      timerDiv.textContent = formatTime(hoursLeft, minutesLeft, secondsLeft);

      const accountDiv = pipWindow.document.createElement("div");
      accountDiv.className = "pip-account";
      accountDiv.textContent = selectedAccount.account_name;

      const statusDiv = pipWindow.document.createElement("div");
      statusDiv.className = "pip-status";
      statusDiv.textContent = state.running ? "Running" : "Paused";

      containerDiv.appendChild(timerDiv);
      containerDiv.appendChild(accountDiv);
      containerDiv.appendChild(statusDiv);

      pipWindow.document.body.appendChild(containerDiv);

      // Handle window close
      pipWindow.addEventListener("beforeunload", () => {
        pipWindowRef.current = null;
      });
    } catch (error) {
      console.error("Failed to create Picture-in-Picture window:", error);
    }
  };

  // Update PiP window
  const updatePiPWindow = () => {
    if (pipWindowRef.current && !pipWindowRef.current.closed) {
      const timerElement =
        pipWindowRef.current.document.querySelector(".pip-timer");
      const statusElement =
        pipWindowRef.current.document.querySelector(".pip-status");

      if (timerElement) {
        timerElement.textContent = formatTime(
          hoursLeft,
          minutesLeft,
          secondsLeft
        );
      }
      if (statusElement) {
        statusElement.textContent = state.running ? "Running" : "Paused";
      }
    }
  };

  // Close PiP window
  const closePiPWindow = () => {
    if (pipWindowRef.current && !pipWindowRef.current.closed) {
      pipWindowRef.current.close();
      pipWindowRef.current = null;
    }
  };

  // Handle visibility change (tab switch)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.hidden &&
        state.running &&
        selectedAccount.id !== "dummy-account"
      ) {
        // User switched tabs while timer is running
        createPiPWindow();
      } else if (!document.hidden && pipWindowRef.current) {
        // User came back to tab
        closePiPWindow();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      closePiPWindow();
    };
  }, [state.running, selectedAccount.id]);

  // Update PiP window when timer state changes
  useEffect(() => {
    updatePiPWindow();
  }, [state.timeLeft, state.running, hoursLeft, minutesLeft, secondsLeft]);

  // Cleanup effect for account changes
  useEffect(() => {
    closePiPWindow();
  }, [selectedAccount.id]);

  return {
    createPiPWindow,
    updatePiPWindow,
    closePiPWindow,
  };
};
