const CloseButton = ({size, strokeWidth,strokeColor}:{size?:number, strokeWidth?:number, strokeColor?:string}) => {
  return <>
  <svg
    width={size ? (size + 2).toString() : "34"}
    height={size ? (size + 2).toString() : "34"}
    fill="none"
    stroke={strokeColor ?? "#384549"}
    strokeWidth={strokeWidth?.toString() ?? "2"}
  >
  <line
    x1="1"
    y1="1"
    x2={size ? (size + 1).toString() : "33"}
    y2={size ? (size + 1).toString() : "33"}
  />
  <line
    x1={size ? (size + 1).toString() : "33"}
    y1="1"
    x2="1"
    y2={size ? (size + 1).toString() : "33"}
  />
  </svg>
  </>
};
export default CloseButton;