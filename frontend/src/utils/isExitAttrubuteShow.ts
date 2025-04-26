export default function isExitAttrubuteShow(type: string) {
  switch (type) {
    case "CPU":
      return true;
    case "GPU":
      return true;
    case "RAM":
      return true;
    case "DISK":
      return true;
    case "MAIN":
      return true;
    case "SSD":
      return true;
    case "TV":
      return true;
    case "HZ":
      return true;
    case "Day":
      return true;
    case "LED":
      return true;
    case "PIN":
      return true;
    case "SIZE":
      return true;
    default:
      return false;
  }
}
