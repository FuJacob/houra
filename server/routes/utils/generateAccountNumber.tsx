export default function generateAccountNumber() {
  let accountNumber = "";
  for (let i = 0; i < 16; i++) {
    const randomNumber = Math.floor(Math.random() * 10) % 10;
    accountNumber += randomNumber;
  }
  return accountNumber;
}
