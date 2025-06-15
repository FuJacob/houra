export default function generateid() {
  let id = "";
  for (let i = 0; i < 16; i++) {
    const randomNumber = Math.floor(Math.random() * 10) % 10;
    id += randomNumber;
  }
  return id;
}
