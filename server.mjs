import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
const root=process.cwd();
const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".json":"application/json",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".svg":"image/svg+xml",".ico":"image/x-icon"};
http.createServer(async(req,res)=>{
  try{
    const u=new URL(req.url,"http://localhost");
    let p=decodeURIComponent(u.pathname);
    if(p==="/") p="/index.html";
    const file=normalize(join(root,p));
    if(!file.startsWith(root)){res.writeHead(403);return res.end("Forbidden");}
    const data=await readFile(file);
    res.writeHead(200,{"content-type":types[extname(file).toLowerCase()]||"application/octet-stream"});
    res.end(data);
  }catch{res.writeHead(404,{"content-type":"text/plain; charset=utf-8"});res.end("Not Found");}
}).listen(Number(process.env.PORT||3000),"0.0.0.0");