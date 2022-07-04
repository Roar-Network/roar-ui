export interface Post{
    id: string,
    author: string,
    username: string,
    date: string,
    text: string,
    count_fav: number,
    count_comment: number,
    count_share: number,
    category: number,
    fav: boolean,
    share: boolean,
}