import {
  faMicrochip,
  faTachographDigital,
  faMemory,
  faHardDrive,
  faEthernet,
  faFloppyDisk,
  faTv,
  faSatelliteDish,
  faPlug,
  faLightbulb,
  faBatteryFull,
  faMaximize,
} from "@fortawesome/free-solid-svg-icons";

export default function GetIconType(iconType: string) {
  switch (iconType) {
    case "CPU":
      return faMicrochip;
    case "GPU":
      return faTachographDigital;
    case "RAM":
      return faMemory;
    case "DISK":
      return faHardDrive;
    case "MAIN":
      return faEthernet;
    case "SSD":
      return faFloppyDisk;
    case "TV":
      return faTv;
    case "HZ":
      return faSatelliteDish;
    case "Day":
      return faPlug;
    case "LED":
      return faLightbulb;
    case "PIN":
      return faBatteryFull;
    case "SIZE":
      return faMaximize;
    default:
      return faMicrochip;
  } // end of switch()
} // end of GetIconType() function
