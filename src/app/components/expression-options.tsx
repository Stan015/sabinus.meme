"use client";

import type { ExpressionOptions } from "@/types";

import { ChangeEvent, FC } from "react";

type Props = {
  expressionOptions: ExpressionOptions;
  expressions: ExpressionOptions;
  handleExpressionInputChange: (
    option: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleAddExpression: (option: string) => void;
};

const ExpressionOptions: FC<Props> = ({
  expressionOptions,
  expressions,
  handleAddExpression,
  handleExpressionInputChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="mb-2 flex gap-4 flex-wrap">
        <label className="font-bold text-md" htmlFor="memeExpressions">
          Select Expressions:
        </label>
        <textarea
          className="w-full h-[5.7rem] bg-gray-100 rounded-xl p-2 border transition-all dark:text-black hover:border-blue-400 border-white text-md ring-offset-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="memeExpressions"
          name="memeExpression"
          placeholder="Choose or enter expression"
          value={expressions.join(", ")}
          onChange={handleExpressionInputChange}
          required
        />
      </span>
      <span className="flex gap-2 flex-wrap max-w-[24rem]">
        {expressionOptions.map((option, index) => {
          let selected = false;

          if (expressions.includes(option)) {
            selected = true;
          }

          return (
            <button
              key={index}
              type="button"
              className={
                selected
                  ? "bg-blue-500 hover:bg-blue-500 text-white transition-all px-3 py-1 rounded-2xl relative"
                  : "bg-gray-100 hover:bg-blue-500 hover:text-white dark:text-black transition-all px-3 py-1 rounded-2xl relative"
              }
              onClick={() => handleAddExpression(option)}
            >
              {option}
            </button>
          );
        })}
      </span>
    </div>
  );
};

export default ExpressionOptions;
