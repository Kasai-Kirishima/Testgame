// Shared indexed-free mesh builder for the local WebGL renderer.
const PI=Math.PI;
export const colorHex=h=>{if(typeof h==='number')return [(h>>16&255)/255,(h>>8&255)/255,(h&255)/255];const s=String(h||'#b9b9a7').replace('#','');const n=parseInt(s.length===3?s.split('').map(x=>x+x).join(''):s,16)||0xb9b9a7;return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255];};
export class MeshBuilder {
    constructor(){this.p=[];this.n=[];this.c=[];}
    tri(a,b,c,col){const ab=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],ac=[c[0]-a[0],c[1]-a[1],c[2]-a[2]],nx=ab[1]*ac[2]-ab[2]*ac[1],ny=ab[2]*ac[0]-ab[0]*ac[2],nz=ab[0]*ac[1]-ab[1]*ac[0],l=Math.hypot(nx,ny,nz)||1,n=[nx/l,ny/l,nz/l],cc=Array.isArray(col)?col:colorHex(col);for(const v of [a,b,c]){this.p.push(...v);this.n.push(...n);this.c.push(...cc);}}
    quad(a,b,c,d,col){this.tri(a,b,c,col);this.tri(a,c,d,col);}
    quadReverse(a,b,c,d,col){this.tri(a,d,c,col);this.tri(a,c,b,col);}
    sphere(x,y,z,rx,ry,rz,col,segments=10,rings=7,phase=0){for(let j=0;j<rings;j++){const v0=-PI/2+PI*j/rings,v1=-PI/2+PI*(j+1)/rings;for(let i=0;i<segments;i++){const a0=2*PI*i/segments+phase,a1=2*PI*(i+1)/segments+phase;const p=(v,a)=>[x+Math.cos(v)*Math.cos(a)*rx,y+Math.sin(v)*ry,z+Math.cos(v)*Math.sin(a)*rz];this.quadReverse(p(v0,a0),p(v0,a1),p(v1,a1),p(v1,a0),col);}}}
    cylinder(ax,ay,az,bx,by,bz,r0,r1,col,segments=8){const dx=bx-ax,dy=by-ay,dz=bz-az,L=Math.hypot(dx,dy,dz)||1,ux=dx/L,uy=dy/L,uz=dz/L;let rx=uy,ry=-ux,rz=0;if(Math.hypot(rx,ry,rz)<.1){rx=0;ry=uz;rz=-uy;}let rl=Math.hypot(rx,ry,rz)||1;rx/=rl;ry/=rl;rz/=rl;const sx=uy*rz-uz*ry,sy=uz*rx-ux*rz,sz=ux*ry-uy*rx;for(let i=0;i<segments;i++){const a=2*PI*i/segments,b=2*PI*(i+1)/segments;const ring=(x,y,z,r,t)=>[x+r*(rx*Math.cos(t)+sx*Math.sin(t)),y+r*(ry*Math.cos(t)+sy*Math.sin(t)),z+r*(rz*Math.cos(t)+sz*Math.sin(t))];const p1=ring(ax,ay,az,r0,a),p2=ring(ax,ay,az,r0,b),p3=ring(bx,by,bz,r1,b),p4=ring(bx,by,bz,r1,a);this.quad(p1,p2,p3,p4,col);this.tri([ax,ay,az],p2,p1,col);this.tri([bx,by,bz],p4,p3,col);}}
    box(x,y,z,sx,sy,sz,col){const a=[x-sx/2,y-sy/2,z-sz/2],b=[x+sx/2,y-sy/2,z-sz/2],c=[x+sx/2,y+sy/2,z-sz/2],d=[x-sx/2,y+sy/2,z-sz/2],e=[x-sx/2,y-sy/2,z+sz/2],f=[x+sx/2,y-sy/2,z+sz/2],g=[x+sx/2,y+sy/2,z+sz/2],h=[x-sx/2,y+sy/2,z+sz/2];this.quadReverse(a,b,c,d,col);this.quadReverse(f,e,h,g,col);this.quadReverse(e,a,d,h,col);this.quadReverse(b,f,g,c,col);this.quadReverse(d,c,g,h,col);this.quadReverse(e,f,b,a,col);}
    arrays(){return {p:new Float32Array(this.p),n:new Float32Array(this.n),c:new Float32Array(this.c),count:this.p.length/3};}
}

