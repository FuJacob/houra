type State = {
  timeLeft: number;
  running: boolean;
};

type Action =
  | { type: "SET_RUNNING"; payload: boolean }
  | { type: "SET_TIME"; payload: number };

export function reducer(state: State, action: Action) {
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

export const setRunning = (running: boolean): Action => ({
  type: "SET_RUNNING",
  payload: running,
});

export const setTimeLeft = (time: number): Action => ({
  type: "SET_TIME",
  payload: time,
});
