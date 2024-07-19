export type Owner = {
    login: string;
}

export type RepoInformation = {
    name: string,
    stargazers_count: number,
    owner: Owner
}