export const getIcon = (name: string) => {
  // 注意哦，这边路径不能使用@，new URL()无法识别这种别名路径
  return new URL(`/src/icons/svg/${name}.svg`, import.meta.url).href;
};