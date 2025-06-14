export function getTimeFromSeconds(seconds: number): [number, number, number] {
  const hoursLeft = Math.floor(seconds / 3600);
  const minutesLeft = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  return [hoursLeft, minutesLeft, secondsLeft];
}

export function formatTimeToHHMMSS(
  hoursLeft: number,
  minutesLeft: number,
  secondsLeft: number
): string {
  const currentTime = `${hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft}:${
    minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft
  }:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;

  return currentTime;
}

export function numberTimeToString(seconds: number): string {
  const hoursLeft = Math.floor(seconds / 3600);
  const minutesLeft = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  return `${hoursLeft}${minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}${
    secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
  }`;
}

export function parseTimeString(input: string): number {
  const digits = input.replace(/\D/g, '').slice(-6).padStart(6, '0');
  const hours = +digits.slice(0, 2);
  const minutes = +digits.slice(2, 4);
  const seconds = +digits.slice(4, 6);
  return hours * 3600 + minutes * 60 + seconds;
}

export function formatRawInput(input: string): string {
  const digits = input.replace(/\D/g, '').slice(-6).padStart(6, '0');
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}:${digits.slice(4, 6)}`;
}
