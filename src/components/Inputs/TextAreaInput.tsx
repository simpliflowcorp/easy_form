"use client";

import * as React from "react";
import { blurCheck, validationCheck } from "../../helper/validationCheck";
import { useLanguageStore } from "@/store/store";
import ErroTextCnt from "./components/ErrorTextCnt";

export interface ITextAreaInputProps {
  label: string;
  value: string;
  updateValue: (value: string) => void;
  updateIsValid: (value: boolean) => void;
  isValid: boolean;
  reset: number;
  isRequired: boolean;
}

export default function TextAreaInput(props: ITextAreaInputProps) {
  const [isValid, setIsValid] = React.useState(true);
  const [IsNotEmpty, setIsNotEmpty] = React.useState(true);
  const [value, setValue] = React.useState(props.value as string);
  const lang = useLanguageStore((state) => state.language);

  React.useEffect(() => {
    if (props.reset) {
      if (props.value === "") {
        setIsNotEmpty(false);
      } else {
        setIsValid(props.isValid);
      }
    }
  }, [props.value, props.isValid, props.reset]);

  return (
    <>
      <div className="input-cnt">
        <label htmlFor="text">{props.label}</label>
        <textarea
          id="text"
          className={isValid || !IsNotEmpty ? "error-input" : ""}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            blurCheck(value, props, setIsValid, setIsNotEmpty, "text");
          }}
        />{" "}
        <ErroTextCnt isValid={isValid} IsNotEmpty={!IsNotEmpty} />
      </div>
    </>
  );
}
