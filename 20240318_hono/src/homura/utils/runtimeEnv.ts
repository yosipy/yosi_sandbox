export const includeInCSRBuild = import.meta.env.MODE === "client"

export const includeInSSRBuild = !includeInCSRBuild
