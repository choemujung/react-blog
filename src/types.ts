export interface Item {
    id: number;
    title: string;
    content: string;
    category: string;    
    date: string;
}

export class NextId {
    private static id:number=0;

    static getId(): number {
        NextId.id += 1;
        return(NextId.id);
    }
}

