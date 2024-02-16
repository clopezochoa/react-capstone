import { useEffect, useState } from 'react';
import { InputState, InputType, initialFormState, ValidationFunctionModel as FormModel } from 'app/lib/types';
import { validate } from 'app/lib/validation';

export function useForm(): FormModel {
  const [inputFormState, setInputFormState] = useState<Array<InputState>>(initialFormState);
  const [outputFormState, setOutputFormState] = useState<Array<InputState>>(initialFormState);

  const getState = (type: InputType): InputState | undefined => {
    return outputFormState.find(input => input.type === type);
  }
  const setInputState = (state: InputState) => {
    const tmpFormState = outputFormState.filter(input => input.type !== state.type);
    tmpFormState.push(state);
    setInputFormState(tmpFormState);
  }

  useEffect(() => {
    const updateStates = inputFormState.map(state => {return validate(state)});
    setOutputFormState(updateStates);
  }, [inputFormState]);

  return {inputFormState: inputFormState, outputFormState: outputFormState, getState, setInputState: setInputState} as FormModel;
};