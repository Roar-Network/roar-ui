import { environment } from 'src/environments/environment';

async function getIPList(): Promise<string[]> {
    let ips: string[] = [];
    await fetch("http://"+environment.IP+":"+environment.port + "/system_network")
    .then(r => {
        if (r.status == 200)
            return r.json();
        else 
            throw "Error while connecting to server";
    })
    .then(r => {
        for (let i = 0; i < r.length; i++)
            ips.push(r[i]);
    })
    return ips;
}

export async function getIP(): Promise<string>  {
    let ip_list: string[] = [];
    await getIPList().then(r =>  ip_list = r);
    console.log(ip_list);
    let ip = "";
    for (let i = 0; i < ip_list.length; i++) {
        await fetch("http://"+ip_list[i] + ":" + environment.port + "/", {method: "HEAD", headers: {"Accept": "application/json"}})
        .then(r => {
            if (r.status == 200) 
                ip = ip_list[0]
        });
        if (ip != "")
            break;
    }
    console.log(ip)
    return ip;
}