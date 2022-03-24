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

export const getNow = (): string => {
    const date = new Date();
    return (
        String(date.getFullYear()) + '. ' + String(date.getMonth()) + '. ' + String(date.getDay()) + '. ' + 
        String(date.getHours()) + ':' + String(date.getMinutes())
    );
}