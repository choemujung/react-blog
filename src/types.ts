export interface Item {
    id: number;
    title: string;
    content: string;
    category: string;    
    date: string;
}

export class NextId {
    private static id:number=5;

    static getId(): number {
        NextId.id += 1;
        return(NextId.id);
    }
}

export const getNow = (): string => {
    const date = new Date();
    return (
        String(date.getFullYear()) + '. ' + String(date.getMonth()+1) + '. ' + String(date.getDate()) + '. ' + 
        String(date.getHours()) + ':' + String(date.getMinutes())
    );
}