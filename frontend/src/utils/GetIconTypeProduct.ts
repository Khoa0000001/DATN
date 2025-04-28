/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  faPodcast,
  faTvAlt,
  faObjectGroup,
  faLayerGroup,
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
  faBox,
} from "@fortawesome/free-solid-svg-icons";

export default function GetIconType(iconType: any) {
  switch (iconType) {
    case "Tần số quét":
      return faPodcast;
    case "Tấm nền":
      return faLayerGroup;
    case "Kích thước":
      return faTvAlt;
    case "Góc nhìn":
      return faObjectGroup;
    default:
      return faBox;
  } // end of switch()
} // end of GetIconType() function
