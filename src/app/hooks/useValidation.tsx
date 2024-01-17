import React, { useEffect, useState } from 'react';
import { Validation } from 'app/lib/validation';
import { InputType } from 'app/lib/enum';

const useValidation = (validationType: InputType, statusSetter: React.SetStateAction<any>, defaultTime: number) => {
  const [validation, setValidation] = useState<Validation>();

  useEffect(() => {
    const newValidation = Validation.getInstance(validationType, statusSetter, defaultTime);
    setValidation(newValidation);
  }, []);

  if (validation) {
    return validation as Validation;
  }
};

export default useValidation;
