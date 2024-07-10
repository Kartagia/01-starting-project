"use client";

import { useState } from "react";

/**
 * The progress component properites.
 * @typedef {Object} ProgressComponentProps
 * @property {number} [start=1] The start of the counter.
 * @property {number} [current] The initial counter. Defaults to start.
 * @property {number} [end=3] The last step reverting to start.
 * @property {string} [step="."] The string reprsenting a step.
 * @property {number} [interval=2] The interval in seconds between pgogress changes. If set to 0 the progress
 * will not change. 
 */

/**
 * The component representing a progress meter.
 * @param {ProgressComponentProps} param
 */
export function ProgressComponent(params = {}) {
  const [current, setCurrent] = useState(((params?.count) ?? params.start) ?? 1);
  const { start = 1, end = 3, step = ".", interval = 2 } = params;
  if (interval > 0) {
    const size = end - start +1;
    if (start < end) {
      /** Start timer to change the progress. */
      let currentStep = 0;
      setInterval(() => {
        currentStep = (currentStep + 1) % size;
        const result = ((current + currentStep - start) % size) + start;
        setCurrent(result);        
      }, interval * 1000);
    } else {
      /** @todo Allow working from larget to smaller */
    }
  }

  return (<span>{`${ (""+step).repeat(current)}`}</span>);
}

/**
 * The component showing loading status.
 * @param {string} [text="Loading"] The base text.
 * @param {number} [step=1] The current step.
 * @param {number} [steps=3] The maxnimum step.
 * @param {number} [delay=2] The delay in seconds between update of the step.
 * @param {string} [suffix="."] The suffix used for showing the progress.
 */

export default function LoadingComponent({ step = 1, steps = 3, text = "Loading", suffix = ".", delay = 2 }) {
  return (<p>{text}<ProgressComponent start={1} end={steps} step={suffix} interval={delay} /></p>);
}
