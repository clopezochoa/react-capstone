import { InputState, InputStyleType } from "app/lib/enum"
import { useEffect, useState } from "react"

const useStyle = (status: any, fade?: number) => {
  const [style, setStyle] = useState<string>(InputStyleType.default);

  useEffect(() => {
    switch (status) {
      case InputState.valid:
        setStyle(fade ? `${InputStyleType.valid} ${InputStyleType.fadeIn}` : InputStyleType.valid);
        break;
      case InputState.invalid:
        setStyle(fade ? `${InputStyleType.invalid} ${InputStyleType.fadeIn}` : InputStyleType.invalid);
        break;
      default:
        if (style !== InputStyleType.default) {
          if (fade) {
            const isValid = style.includes(InputStyleType.valid);
            setStyle(isValid ? `${InputStyleType.valid} ${InputStyleType.fadeOut}` : `${InputStyleType.invalid} ${InputStyleType.fadeOut}`);
            setTimeout(() => {
              setStyle(InputStyleType.default);
            }, fade)
          } else {
            setStyle(InputStyleType.default);
          }
        }
        break;
    }
  }, [status])

  return style;
}

export default useStyle;