export const filePathToPath = (filePath: string) => {
  return filePath
    .replace(/\/src\/pages|(page|server)\.tsx$/g, "")
    .replace(/\/\((.+)\)\//, "/") // /(path)/ -> /
    .replace(/\[(.+)\]/, ":$1") // [param] -> :param
}
