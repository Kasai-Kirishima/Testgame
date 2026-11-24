export const $ = selector => document.querySelector(selector);
export const $$ = selector => [...document.querySelectorAll(selector)];
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
export const rand = (min, max) => min + Math.random() * (max - min);
export const distance2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
