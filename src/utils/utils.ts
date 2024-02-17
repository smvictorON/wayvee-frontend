export const checkTelMask = (value: string): string => {
  return value.substring(4, 5) === "9" ? "(99)99999-9999" : "(99)9999-9999"
}
