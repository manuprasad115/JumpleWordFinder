import { Component, OnInit } from '@angular/core';
import{Edge,Box,Player} from './board';

@Component({
    selector: 'board',
    templateUrl: 'app/templates/board.html',
    styleUrls: ['app/styles/board.css']
})


export class BoardComponent implements OnInit {
    constructor() { this.drawBoard(); }
    boxsize: number = 6;
    edgeList: Array<Edge> = [];
    boxList: Array<Box>=[];
    playerList: Array<Player>=[];
    newPlayer: Player = new Player();
    currentPlayer: Player;
    currentPlayerIndex=0;
    playStart: boolean=false;

    drawBoard() {
        this.newPlayer.id=1;
        for (var i = 1; i <= this.boxsize; i++) {
            for (var j = 1; j <= this.boxsize; j++) {
                let _box = this.createBox();
                if (i == 1) {
                    _box.top=this.createEdge();
                }
                else {
                    _box.top=this.getBox(i-1,j).bottom;
                }
                if (j == 1) {
                    _box.left=this.createEdge();
                }
                else {
                     _box.left=this.getBox(i,j-1).right;
                }
                _box.bottom=this.createEdge();
                _box.right=this.createEdge();
            }
        }
    }

    createBox(): Box{
        let _b: Box= new Box(this.boxList.length+1);
        this.boxList.push(_b);
        return _b;
    }

    getBox(row: number, col: number)
    {
        let _bId: number = (row-1)*this.boxsize+col;
        return this.boxList.find(b => b.id==_bId);
    }
    createEdge(): Edge{
        let _e = new Edge(this.edgeList.length+1);
        this.edgeList.push(_e);
        return _e;
    }
    checkWin(_edgeId): boolean
    {
        let _flag: boolean =false;
        let _boxArray: Array<Box> = this.boxList.filter(x => x.top.id==_edgeId || x.bottom.id == _edgeId || x.left.id == _edgeId || x.right.id == _edgeId);
        for (var index = 0; index < _boxArray.length; index++){
               let _box=_boxArray[index];
               if(_box.top.status && _box.bottom.status && _box.left.status && _box.right.status)
               {
                   _box.status=true;
                   _box.player=this.currentPlayer;
                   _flag=true;
               }    
        }
        return _flag;
    }
    nextPlayer(): Player
    {
        this.currentPlayerIndex = (this.currentPlayerIndex==this.playerList.length-1)?0:++this.currentPlayerIndex;
        return this.playerList[this.currentPlayerIndex];
    }
    public isFirstBox(_id: number):boolean
    {
        return (_id % this.boxsize) == 1;
    }
    public setEdge(_edge: Edge){
        if(_edge.status){
           alert("Invalid Move");
        }
        else{
             _edge.status=true;
            if(this.checkWin(_edge.id))
            {
                this.currentPlayer.points=this.getPoints(this.currentPlayer);
                if(this.edgeList.filter(x => (!x.status)).length<1)
                {
                    alert("Game Finished");
                    let _winner: Player=this.playerList[0];
                    for (var index = 1; index < this.playerList.length; index++) {
                        if(_winner.points < this.playerList[index].points)
                        {
                            _winner=this.playerList[index];
                        }
                    }
                    alert("Congrats "+_winner.name+" you won the game");
                }
                //alert(this.currentPlayer.name + " won points" );
            }
            else{
             this.currentPlayer=this.nextPlayer();
            }
        }
    }
    public addPlayer(){
        this.playerList.push(this.newPlayer);
        let _newId: number = this.playerList[this.playerList.length-1].id+1;
        this.newPlayer=new Player();
        this.newPlayer.id=_newId;
    }
    public startGame(){
        if(this.playerList.length > 2){
            this.currentPlayerIndex=0;
            this.currentPlayer=this.playerList[0];
             this.playStart=true;
        }
        else{
            alert("Need minimum 2 players to start game");
        }
    }
    getPoints(_player: Player): number{
       return (this.boxList.filter(x => x.status ).filter(b => b.player.id == _player.id).length);
    }

    ngOnInit() { }
}