const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({
    authStrategy: new LocalAuth()
});
 
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

const api = async (req,res) => {

    const token = "dG9rZW50b2tla2tlbnRhbmc="
    let nohp = req.query.nohp || req.body.nohp;
    const pesan = req.query.pesan || req.body.pesan;
    let tokenin = req.query.token || req.body.token;
    console.log(nohp,pesan);

    if (tokenin !== token){
        return res.status(401).json({status:"gagal",pesan:"token invalid"})
    }

    try{
        
        if(nohp.startsWith("0")){
            nohp = "62" + nohp.slice("1") + "@c.us";
        }else if(nohp.startsWith("62")){
            nohp = nohp + "@c.us";
        }else{
            nohp = "62" + nohp + "@c.us";
        }
        
        const user = await client.isRegisteredUser(nohp);

        if(user) {
            client.sendMessage(nohp, pesan);
            res.json({status:"berhasil terkirim", pesan});
        }else{
            res.json({status:"gagal", pesan : "no tidak terdaftar wa"});
            console.log(nohp,pesan);
        }

    }catch(error){
        console.log(error);
        res.status(500).json({status:"eror",pesan: "error server"});
        console.log(nohp,pesan);
    }


};

module.exports = api;