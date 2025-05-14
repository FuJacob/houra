export function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_RUNNING":
      return {
        ...state,
        running: action.payload,
      };
    case "SET_TIME":
      return {
        ...state,
        timeLeft: action.payload,
      };
  }
}

export const setRunning = (running: boolean) => ({
  type: "SET_RUNNING",
  payload: running,
});

export const setTimeLeft = (time: number) => ({
  type: "SET_TIME",
    payload: time,
});
