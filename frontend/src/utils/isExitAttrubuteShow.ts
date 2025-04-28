export default function isExitAttrubuteShow(type: string, name: string) {
  if (type === "Màn hình")
    switch (name) {
      case "Tần số quét":
        return true;
      case "Tấm nền":
        return true;
      case "Kích thước":
        return true;
      case "Góc nhìn":
        return true;
      default:
        return false;
    }
}
