import { InputValidity, InputStyle, InputState, StyleFunctionModel } from "app/lib/types"
import { useEffect, useState } from "react"

export function useStyle(validation: InputState | undefined, fade?: number) {
  const [style, setStyle] = useState<string>(InputStyle.default);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const resetStyle = () => {
    if(timer) clearTimeout(timer);
    if(style === InputStyle.default) return;
    if (fade) {
      const isValid = style.includes(InputStyle.valid);
      setStyle(isValid ? `${InputStyle.valid} ${InputStyle.fadeOut}` : `${InputStyle.invalid} ${InputStyle.fadeOut}`);
      setTimer(setTimeout(() => {
        setStyle(InputStyle.default);
      }, fade));
    } else {
      setStyle(InputStyle.default);
    }
  }
  
  
  useEffect(() => {   
    if(validation) {
      if(timer) clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          switch (validation.validity) {
            case InputValidity.valid:
              setStyle(fade ? `${InputStyle.valid} ${InputStyle.fadeIn}` : InputStyle.valid);
              break;
            case InputValidity.invalid:
              setStyle(fade ? `${InputStyle.invalid} ${InputStyle.fadeIn}` : InputStyle.invalid);
              break;
            default:
              if (style !== InputStyle.default) {
                resetStyle();
              }
              break;
          }
        }, fade)
      );
    }
  }, [validation])

  return {style: style, resetStyle: resetStyle} as StyleFunctionModel;
}