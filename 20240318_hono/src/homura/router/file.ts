export const filePathToPath = (filePath: string) => {
  return filePath
    .replace(/\/src\/pages|page\.tsx$/g, "")
    .replace(/\/\((.+)\)\//, "/")
    .replace(/\[(.+)\]/, ":$1") // [param] -> :param
}
