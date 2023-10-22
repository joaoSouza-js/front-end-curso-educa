interface POST_DTO {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    scheduled: Date | null;
    published: boolean;
    categoryId: string;
    authorId: string;
    author:string,
    category:string
    owner: boolean;
}
