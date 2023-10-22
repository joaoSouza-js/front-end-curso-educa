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

interface POST_DTO_CREATE {
    title: string,
    content: string,
    categoryId: string,
    schedule?: Date
}
