export const heToEn = text => {
  text = text.replace(/א/g, "a")
  text = text.replace(/ב/g, "b")
  text = text.replace(/ג/g, "g")
  text = text.replace(/ד/g, "d")
  text = text.replace(/ה/g, "h")
  text = text.replace(/ו/g, "v")
  text = text.replace(/ז/g, "z")
  text = text.replace(/ח/g, "h")
  text = text.replace(/ט/g, "t")
  text = text.replace(/י/g, "y")
  text = text.replace(/ך/g, "k")
  text = text.replace(/כ/g, "k")
  text = text.replace(/ל/g, "l")
  text = text.replace(/ם/g, "m")
  text = text.replace(/מ/g, "m")
  text = text.replace(/ן/g, "n")
  text = text.replace(/נ/g, "n")
  text = text.replace(/ס/g, "s")
  text = text.replace(/ע/g, "'e")
  text = text.replace(/ף/g, "p")
  text = text.replace(/פ/g, "p")
  text = text.replace(/ץ/g, "ts")
  text = text.replace(/צ/g, "ts")
  text = text.replace(/ק/g, "q")
  text = text.replace(/ר/g, "r")
  text = text.replace(/ש/g, "sh")
  text = text.replace(/ת/g, "t")
  text = text.replace(/ב/g, "b")
  text = text.replace(/כ/g, "k")
  text = text.replace(/פ/g, "p")
  text = text.replace(/ת/g, "t")
  text = text.replace(/ו/g, "u")
  text = text.replace(/ו/g, "v")
  text = text.replace(/וֹ/g, "o")
  text = text.replace(/ָ/g, "a")
  text = text.replace(/ַ/g, "a")
  text = text.replace(/ּ/g, "i")
  text = text.replace(/ײ/g, "i")
  text = text.replace(/װ/g, "y")
  text = text.replace(/ױ/g, "yi")
  text = text.replace(/ֿ/g, "a")
  text = text.replace(/־/g, "")
  text = text.replace(/\n/g, "\n")

  return text
}