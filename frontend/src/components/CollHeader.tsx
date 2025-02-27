import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function CollHeader({
  icon,
  titleArray,
  color,
  sizeIcon = "24",
}: {
  icon?: any;
  titleArray: string[];
  color?: string;
  sizeIcon?: string;
}) {
  return (
    <div
      className={`flex items-center bg-[${color}] rounded-[4px] h-[42px] cursor-pointer`}
    >
      {icon && (
        <div className="h-[42px] items-center flex justify-center w-[36px]">
          <FontAwesomeIcon icon={icon} className={`text-[${sizeIcon}px]`} />
        </div>
      )}
      <span className="flex flex-col text-[14px] font-[600] pl-[3px] pr-[8px]">
        {titleArray.map((title, index) => (
          <span key={index} className="hidden lg:block">
            {title}
          </span>
        ))}
      </span>
    </div>
  );
}
