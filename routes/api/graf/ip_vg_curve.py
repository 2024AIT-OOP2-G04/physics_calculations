import numpy as np
from matplotlib import pyplot as plt
import json
#from flask import Flask

#app = Flask(__name__)
def bibun(fx):#多項式を微分する(多項式はx0*x^3+x1*x^2+..+x3の形とし、fx[0]=x0,fx[1]=x1... と関連付ける
    dfx=[0]*(len(fx)-1)
    for i in range(len(fx)-1):
        dfx[i]=fx[i]*(len(fx)-1-i)
    return dfx

def sessensiki(dfx,fx,a):
    fa=[0]*2
    fa[0]=dainyu(dfx,a)
    fa[1]=fa[0]*(-1)*a+dainyu(fx,a)
    return fa

def dainyu(fx,a):
    fa=0
    for i in range(len(fx)):
        fa=fa+fx[i]*a**(len(fx)-i-1)
    return fa

def jissuukai(fx,c):#実数解を求める
    fkai=fx.copy()
    indexteisu=len(fx)-1
    fkai[indexteisu]=(fkai[indexteisu]-c)
    x_list=np.roots(fkai)
    kai=0
    for i in x_list:
        if np.iscomplex(i) == False or np.iscomplex(i) and abs(i.imag) < 0.0000001:
            if i.real<-4 and i.real>-14:
                kai=i.real
                break
    return kai

#@app.route("/ip_vg")
def ip_vg(s):
    #s='{"input_ip_vg":{"vp_230":[0,0.10,0.5,1.48,3.30,6.23,10.05,15.30,21.75],"vp_250":[0.05,0.35,1.10,2.63,4.98,8.38,12.83,18.45,25.55],"vp_270":[0.25,0.83,2.03,4.08,6.95,10.88,15.83,21.98,29.53]}}'
    data = json.loads(s)
    x=[-20,-18,-16,-14,-12,-10,-8,-6,-4]
    y230=data['input_ip_vg']['vp_230']
    y250=data['input_ip_vg']['vp_250']
    y270=data['input_ip_vg']['vp_270']
    fx1=np.polyfit(x, y230, 3)#特性曲線の近似式を求める
    fx2=np.polyfit(x, y250, 3)
    fx3=np.polyfit(x, y270, 3)
    dfx2=bibun(fx2)
    fxlist=[fx1,fx2,fx3]
    y=sessensiki(dfx2,fx2,-8)  #250.0Vでのx＝ー８における接線の式を求める
    dousaY=dainyu(fx2,-8)       #動作点を求める           
    #vp_vgにおける点を求める  
    ips={"ip="+str(dousaY-5):[],"ip="+str(dousaY):[],"ip="+str(dousaY+5):[]}
                                                        #     動作点−５、動作点、動作点＋５ 
                                                        #230V[                        ]
                                                        #250V[                        ]
                                                        #270V[                        ]    
    consen=np.zeros((2, 2))                #相互コンダクタンスを求めるための２点
    consen[0][0]=jissuukai(y,0)
    consen[1][0]=-6
    consen[1][1]=dainyu(y,-6)
    for j in range(3):
        ips["ip="+str(dousaY-5)].append(jissuukai(fxlist[j],dousaY-5))
        ips["ip="+str(dousaY)].append(jissuukai(fxlist[j],dousaY))
        ips["ip="+str(dousaY+5)].append(jissuukai(fxlist[j],dousaY+5))
    t=[]
    t2=[]
    dousaf=[]
    for num in [round(num * 0.1, 1) for num in range(-200,-10)]:
        t.append(num)
        if(num<-3.5):
            t2.append(num)
        if((num<-8+4.2) and (num>-8-4.2)):
            dousaf.append(dousaY)
        else:
            dousaf.append(-1) 


    y1 = np.poly1d(fx1)(t)
    y2 = np.poly1d(fx2)(t)
    y3 = np.poly1d(fx3)(t)
    ya=np.poly1d(y)(t2)
    
    #plt.plot(t,y3, label='3')
    #plt.plot(t,y2, label='2')
    #plt.plot(t,y1, label='1')
    #plt.plot(t,ya, label='a')
    #plt.legend()
    #plt.show()
    thisjsdata={"x":t,"vp230":y1,"vp250":y2,"vp270":y3,"sessen":ya,"dousaten":dousaY,"consen":consen,"dousaf":dousaf,"ips":ips}

    return json.dumps(thisjsdata, cls=NumpyArrayEncoder)


class NumpyArrayEncoder(json.JSONEncoder):
    def default(self,obj):
        if isinstance(obj,np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self,obj)
    
if __name__ == "__main__":
    ip_vg()
