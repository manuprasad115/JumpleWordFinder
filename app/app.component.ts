import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {WordResult} from './search';
@Component({
  selector: 'my-app',
  templateUrl:'app/templates/home.html',
})
export class AppComponent {
words: Array<string>=[];
result: Array<WordResult>=[];
str: string="";
load: boolean=false;
filteredResult: Array<WordResult>=[];
filter: boolean = false;
constructor(private http: Http) { 
    http.request("app/words.txt").subscribe(result =>{this.str=result.text().toLowerCase(); this.load=true;});
}
public search(_str:string){
  // if(this.str.indexOf(_str)>=0)
  // {
  //   alert("Found");
  // }
  // else{
  //   alert("Not Found");
  // }
  this.result=[];
  this.words = this.recr(_str).filter((elem, index, self) => index == self.indexOf(elem));
  this.words.forEach(_word => {
   let _wr: WordResult = new WordResult();
   _wr.word=_word;
   _wr.found=(this.str.indexOf('\n'+_word)>=0);
   this.result.push(_wr); 
  });
  this.filteredResult=this.result.filter(_res => _res.found);
}

public filterToggle()
{
  this.filter = !this.filter;
}

recr(data: string): Array<string>{
  let lst: Array<string>=[];

  	if(data.length<2)
		{
			lst.push(data);
			return lst;
		}
		else if(data.length==2)
		{
			lst.push(data.substring(1)+data.substring(0,1));
			lst.push(data);
			return lst;
		}
		else{
		
			
			for(let c: number = 0; c<data.length; c++)
			{
				let f: string = data.substring(c,(c+1));
				let set: string = data.substring(0,c)+data.substring(c+1);
				let lstt: Array<string> = this.recr(set);
        lstt.forEach(s => {
          lst.push(f+s);
					lst.push(s+f);
        });
			}
		
		}



  return lst;
}








 }
