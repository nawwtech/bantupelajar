export type Note={id:string,title:string,content:string,updatedAt:number};
export type Task={id:string,title:string,due:string,done:boolean};
export type QuizResult={id:string,subject:string,score:number,total:number,percent:number,at:number};
const key=(name:string)=>`bp_${name}`;
export function read<T>(name:string,fallback:T):T{if(typeof window==='undefined')return fallback;try{return JSON.parse(localStorage.getItem(key(name))||JSON.stringify(fallback)) as T}catch{return fallback}}
export function write<T>(name:string,value:T){if(typeof window!=='undefined')localStorage.setItem(key(name),JSON.stringify(value))}
