export class Edge{
    id: number;
    status: boolean = false;
    constructor(num: number){
        this.id=num;
    }
}

export class Box{
    id: number;
    left: Edge;
    right: Edge;
    top: Edge;
    bottom: Edge;
    status: boolean=false;
    player: Player;
    constructor(num: number){
        this.id=num;
    }
}

export class Player{
    id: number;
    name: string="";
    icon: string="";
    points: number=0;
}
