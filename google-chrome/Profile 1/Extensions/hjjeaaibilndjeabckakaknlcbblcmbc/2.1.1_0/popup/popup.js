
let tab = null;

document.addEventListener('DOMContentLoaded', function () {

    const isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
          someDate.getMonth() == today.getMonth() &&
          someDate.getFullYear() == today.getFullYear()
        }

    const timeToTimestamp = (dt) =>{
        // console.log(dt);
        var dateString = dt,
            dateTimeParts = dateString.split(' '),
            timeParts = dateTimeParts[1].split(':'),
            dateParts = dateTimeParts[0].split('-'),
            date;
            date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);
            // console.log(date.getTime())
            return date.getTime()
        }

    chrome.storage.sync.get(null,(storagedata)=>{

    let permissionFlag = storagedata.permissionFlag;

    const ext_version = chrome.app.getDetails().version;

    // document.getElementById('version').innerHTML = `Version ${ext_version} by p2pdops`

    const counter = document.getElementById('counter');
    const start_mon_lay = document.getElementById('start_mon_lay');
    const live_mon_lay = document.getElementById('live_mon_lay');

    const downloader = document.getElementById('download');
    const refresher = document.getElementById('refresh');
    // const options = document.getElementById('options');
    const clearer = document.getElementById('clear');
    const close = document.getElementById('close');
    const guide = document.querySelector(".guide");
    const help_notes = document.querySelector(".help-notes");

    const start_mon_btn = document.getElementById('start_mon_btn');
    const take_record_mon_btn = document.getElementById('take_record_mon_btn');
    const stop_record_mon_btn = document.getElementById('stop_record_mon_btn');

    const set_reminder = document.querySelector(".set-reminder");
    const reminder_list = document.querySelector(".reminder-list");

    const delete_reminder = document.querySelector(".delete");
    const progress_bar = document.getElementById('progress_bar');

    // remainder_input.min = new Date().toISOString().slice(0,16);
    var myDate = document.querySelector("#date");
    var today = new Date();
    myDate.value = today.toISOString().substr(0, 10);
    myDate.setAttribute("min", today.toISOString().substr(0, 10));

    const reRenderRemainder = (data) => {
        let allList = document.querySelectorAll("ul li");
        for(let i = 0;i < allList.length;i++){
            allList[i].remove();
        }
        updateTime(data);
    }

    const updateTime = (elements) => {
        for(let i = 0;i < elements.length; i++){
            let tempListElement = document.createElement("li");
            tempListElement.setAttribute("class","list-element");
            let checkBox = document.createElement("input");
            checkBox.setAttribute("type","checkbox");
            checkBox.setAttribute("class","checkbox");
            checkBox.setAttribute("id",`${elements[i]}`);
            checkBox.addEventListener("click",()=>{
                let checkboxList = document.querySelectorAll(".checkbox");
                let delete_visible = false;
                for(let i = 0;i < checkboxList.length; i++){
                    if(checkboxList[i].checked){
                        delete_visible = true;
                    }
                }
                if(delete_visible){
                    delete_reminder.style.display = "unset";
                }else{
                    delete_reminder.style.display = "none";
                }
            })
            let tempListElementTime = document.createElement("p");
            tempListElementTime.setAttribute("class","list-element-time");
            tempListElementTime.innerText = (elements[i].split("TY")[1] == "daily") ? "daily @"+`${(timeConverter(elements[i].split("TY")[0])).split(" ")[3]}`: timeConverter(elements[i].split("TY")[0]);
            tempListElement.appendChild(checkBox);
            tempListElement.appendChild(tempListElementTime);
            reminder_list.appendChild(tempListElement);
        }
    }

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

    set_reminder.addEventListener("click",()=>{
        let date = document.querySelector("#date").value;
        let time = document.querySelector("#time").value;
        let type = document.querySelector("#reminder-type").value;
        if(date && time){
            chrome.permissions.request({origins: ["<all_urls>"],permissions: ["notifications"] }, function(granted) {
                if(granted){
                    let reminderTime = (new Date(`${date}` + ' ' + `${time}` + ':00')).getTime();
                    reminderTime = (reminderTime-(reminderTime%1000))/1000;

                    chrome.storage.sync.get(null,(data)=>{
                        let reminders = data.reminders;
                        if(!reminders){
                            reminders = [];
                        }
                        if(!reminders.includes(reminderTime)){
                            let tempListElement = document.createElement("li");
                            tempListElement.setAttribute("class","list-element");
                            let checkBox = document.createElement("input");
                            checkBox.setAttribute("type","checkbox");
                            checkBox.setAttribute("class","checkbox");
                            checkBox.setAttribute("id",`${reminderTime}`+ "TY" + `${type}`);
                            checkBox.addEventListener("click",()=>{
                                let checkboxList = document.querySelectorAll(".checkbox");
                                let delete_visible = false;
                                for(let i = 0;i < checkboxList.length; i++){
                                    if(checkboxList[i].checked){
                                        delete_visible = true;
                                    }
                                }
                                if(delete_visible){
                                    delete_reminder.style.display = "unset";
                                }else{
                                    delete_reminder.style.display = "none";
                                }
                            })
                            let tempListElementTime = document.createElement("p");
                            tempListElementTime.setAttribute("class","list-element-time");
                            tempListElementTime.innerText = (type == "daily") ? "daily @"+`${(timeConverter(reminderTime)).split(" ")[3]}`: timeConverter(reminderTime);
                            tempListElement.appendChild(checkBox);
                            tempListElement.appendChild(tempListElementTime);
                            reminder_list.appendChild(tempListElement);
                            reminders.push(`${reminderTime}`+ "TY" + `${type}`);
                            chrome.storage.sync.set({reminders})
                            chrome.runtime.sendMessage({message:"remainder-updated"},(response)=>{})
                            if(document.querySelector("details").offsetHeight < 25){
                                document.querySelector("summary").click();
                            }
                        }else{
                            // alert("Reminder Already found");
                            Swal.fire('Reminder Already found on this time')
                        }
                    })
                }else{
                    Swal.fire('Please allow the permission to get notified about your reminder while on any page')
                    // alert("Please allow the permission to get notified about your reminder while on any page")
                }
            })          
        }else{
            Swal.fire('Please enter the date and time')
            // alert("Please enter the date and time");
        }   
    })

    delete_reminder.addEventListener("click",()=>{
        let checkboxList = document.querySelectorAll(".checkbox");
        let finalList = [];

        for(let i = 0;i < checkboxList.length; i++){
            if(!checkboxList[i].checked){
                finalList.push(checkboxList[i].getAttribute("id"));
            }
        }
        chrome.storage.sync.set({reminders:finalList})
        reRenderRemainder(finalList)
    })

    close.addEventListener('click', function () {
        window.close();
    });

    chrome.tabs.getSelected(null, function (_tab) {
        tab = _tab
        const tabId = tab.id;
        chrome.tabs.sendMessage(tabId, { msg: 'needCount', tabId }, function (res) {
            // console.log(res)
            res = (res || { count: 0 });
            if (res.count) counter.innerHTML = res.count;
            return true;
        });
        chrome.tabs.sendMessage(tabId, { msg: 'isMonitoring', tabId }, function (res) {
            if (res) {
                start_mon_lay.style.display = 'none';
                live_mon_lay.style.display = 'flex';
            } else {
                start_mon_lay.style.display = 'block';
                live_mon_lay.style.display = 'none';
            }
            return true;
        });
    });

    start_mon_btn.addEventListener('click', function () {
        if(!permissionFlag){
            chrome.permissions.request({origins: ["<all_urls>"],permissions: ["notifications"] }, function(granted) {
                // if(granted){
                permissionFlag = true;
                // }
                chrome.storage.sync.set({permissionFlag:true})
                progress_bar.style.display = 'block';
                chrome.tabs.sendMessage(tab.id, { msg: 'startMonitoring', tabId: tab.id }, function () {
                    setTimeout(() => {
                        window.open('../monitor/monitor.html', '_blank');
                        window.location.reload()
                    }, 1250);
                    return true;
                })  
            })
        }else{
            progress_bar.style.display = 'block';
            chrome.tabs.sendMessage(tab.id, { msg: 'startMonitoring', tabId: tab.id }, function () {
                setTimeout(() => {
                    window.open('../monitor/monitor.html', '_blank');
                    window.location.reload()
                }, 1250);
                return true;
            })  
        }
         
    });

    take_record_mon_btn.addEventListener('click', function () {
        progress_bar.style.display = 'block'
        chrome.tabs.sendMessage(tab.id, { msg: 'takeNewMonSnap', tabId: tab.id }, function () {
            setTimeout(() => {
                chrome.tabs.query({ url: window.location.href.replace('popup/popup.html', '') + 'monitor/monitor.html' }, function (tabs) {
                    if (tabs.length)
                        chrome.tabs.update(tabs[0].id, { url: '../monitor/monitor.html' });
                    else
                        window.open('../monitor/monitor.html', '_blank');
                    window.location.reload()
                });
            }, 750);
            return true;
        })
    });

    stop_record_mon_btn.addEventListener('click', function () {
        chrome.tabs.sendMessage(tab.id, { msg: 'stopMonitoring', tabId: tab.id }, function () {
            setTimeout(() => {
                window.location.reload()
                window.open('../monitor/monitor.html', '_blank');
            }, 750);
            return true;
        })
    });

    console.log('DOMContentLoaded')


    // options.addEventListener('click', function () {
    //     chrome.runtime.openOptionsPage(function () {
    //         console.log('opened options')
    //         return true;
    //     })
    // });


    refresher.addEventListener('click', function () {
        if(!permissionFlag){
            chrome.permissions.request({origins: ["<all_urls>"],permissions: ["notifications"] }, function(granted) {
                // if(granted){
                permissionFlag = true;
                // }
                chrome.storage.sync.set({permissionFlag:true})
                progress_bar.style.display = 'block'
                chrome.tabs.sendMessage(tab.id, { msg: 'single_scan', tabId: tab.id }, function () {
                    setTimeout(() => window.location.reload(), 750);
                    return true;
                });
            })
        }else{
            progress_bar.style.display = 'block'
            chrome.tabs.sendMessage(tab.id, { msg: 'single_scan', tabId: tab.id }, function () {
                setTimeout(() => window.location.reload(), 750);
                return true;
            });
        }
        
    });

    downloader.addEventListener('click', function () {
        if(!permissionFlag){
            chrome.permissions.request({origins: ["<all_urls>"],permissions: ["notifications"] }, function(granted) {
                // if(granted){
                permissionFlag = true;
                // }
                chrome.storage.sync.set({permissionFlag:true})
                progress_bar.style.display = 'block'
                chrome.tabs.sendMessage(tab.id, { msg: 'downloadReq', tabId: tab.id }, function () {
                    setTimeout(() => window.location.reload(), 750);
                    return true;
                })
            })
        }else{
            progress_bar.style.display = 'block'
            chrome.tabs.sendMessage(tab.id, { msg: 'downloadReq', tabId: tab.id }, function () {
                setTimeout(() => window.location.reload(), 750);
                return true;
            })
        }
    });

    clearer.addEventListener('click', function () {
        if(!permissionFlag){
            chrome.permissions.request({origins: ["<all_urls>"],permissions: ["notifications"] }, function(granted) {
                // if(granted){
                permissionFlag = true;
                // }
                chrome.storage.sync.set({permissionFlag:true})
                chrome.tabs.sendMessage(tab.id, { msg: 'clearAttendance', tabId: tab.id }, function () {
                    counter.innerHTML = '0';
                    return true;
                });
            })
        }else{
            chrome.tabs.sendMessage(tab.id, { msg: 'clearAttendance', tabId: tab.id }, function () {
                counter.innerHTML = '0';
                return true;
            });
        }
        
    });

    guide.addEventListener("click",()=>{
        chrome.tabs.create({active: true, url: "https://sites.google.com/view/meet-attendance-collector/"});
    })

    chrome.tabs.query(
        {currentWindow: true, active : true},
        function(tabArray){
            // console.log(tabArray[0])
            if(tabArray && tabArray.length > 0 && tabArray[0] && !tabArray[0].url.includes("chrome://")){
                // console.log(tabArray[0].url.length)
                if(!tabArray[0].url.includes("https://meet.google.com/")){
                        document.querySelector(".singletime-container").style.display = "none";
                        document.querySelector(".timewise-container").style.display = "none";
                        help_notes.style.display = "flex";
                }else{
                    if(tabArray[0].url.length > 24){
                        // document.querySelector(".singletime-container").style.display = "none";
                        // document.querySelector(".timewise-container").style.display = "none";
                        // help_notes.style.display = "flex";
                    }else{
                        document.querySelector(".singletime-container").style.display = "none";
                        document.querySelector(".timewise-container").style.display = "none";
                        help_notes.style.display = "flex";
                    }
                }
        }else{
            document.querySelector(".singletime-container").style.display = "none";
            document.querySelector(".timewise-container").style.display = "none";
            help_notes.style.display = "flex";
        }
    })

    reRenderRemainder(storagedata.reminders)
    })

});

