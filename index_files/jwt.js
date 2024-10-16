    document.getElementById("m").value = "Hello";

    function gojwt(size,method, iss, sub, id) {
        var kp = KEYUTIL.generateKeypair("RSA",size );
        var priv = KEYUTIL.getPEM(kp.prvKeyObj, "PKCS8PRV");
 
        document.getElementById("keys").innerHTML = "Private key:\n" + priv;
      
        var pub = KEYUTIL.getPEM(kp.pubKeyObj, "PKCS8PUB");
        document.getElementById("keys").innerHTML += "Public key:\n" + pub;

        var oHeader = { alg: method, typ: 'JWT' };
      
        var oPayload = {};
        var tNow = KJUR.jws.IntDate.get('now');
        var tEnd = KJUR.jws.IntDate.get('now + 1day');
        oPayload.iss = iss;
        oPayload.sub = sub;
        oPayload.nbf = tNow;
        oPayload.iat = tNow;
        oPayload.exp = tEnd;
        oPayload.jti = id

        var sHeader = JSON.stringify(oHeader);
        var sPayload = JSON.stringify(oPayload);

        document.getElementById("JWT").innerHTML = "Header:\n" + sHeader;
        document.getElementById("JWT").innerHTML += "\n\nPayload:\n" + sPayload;

        var sJWT = KJUR.jws.JWS.sign(method, sHeader, sPayload, priv);
        document.getElementById("JWT").innerHTML += "\n\nSignature:\n" + sJWT;

        var isValid = KJUR.jws.JWS.verifyJWT(sJWT, pub, { alg: [method], iss: [iss], sub: [sub] });
        document.getElementById("JWT").innerHTML += "\n\nValid JWT: " + isValid;
    }

    function gojwt2(name, method, iss, sub, id) {
        var kp = KEYUTIL.generateKeypair("EC", name);
        var priv = KEYUTIL.getPEM(kp.prvKeyObj, "PKCS8PRV");

        pub = KEYUTIL.getPEM(kp.pubKeyObj, "PKCS8PUB");

        document.getElementById("keys").innerHTML = pub;
        document.getElementById("keys").innerHTML += "Public key:\n" + pub;

        var oHeader = { alg: method, typ: 'JWT' };

        var oPayload = {};
        var tNow = KJUR.jws.IntDate.get('now');
        var tEnd = KJUR.jws.IntDate.get('now + 1day');
        oPayload.iss = iss;
        oPayload.sub = sub;
        oPayload.nbf = tNow;
        oPayload.iat = tNow;
        oPayload.exp = tEnd;
        oPayload.jti = id

        var sHeader = JSON.stringify(oHeader);
        var sPayload = JSON.stringify(oPayload);

        document.getElementById("JWT").innerHTML = "Header:\n" + sHeader;
        document.getElementById("JWT").innerHTML += "\n\nPayload:\n" + sPayload;

        var sJWT = KJUR.jws.JWS.sign(method, sHeader, sPayload, priv);
        document.getElementById("JWT").innerHTML += "\n\nSignature:\n" + sJWT;

        var isValid = KJUR.jws.JWS.verifyJWT(sJWT, pub, { alg: [method], iss: [iss], sub: [sub] });
        document.getElementById("JWT").innerHTML += "\n\nValid JWT: " + isValid;
    }

