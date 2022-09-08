export class userCat3CommentDto{
    id: number;
    cat3Id: number;
    parentId: number;
    userName: string;
    mobileNumber: string;
    text: string;
    registerTime: string;
    answers: userCat3CommentDto[];
}
