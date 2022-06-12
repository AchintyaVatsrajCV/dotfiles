
let tab = null;

document.addEventListener('DOMContentLoaded', function () {

    const isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
          someDate.getMonth() == today.getMonth() &&
          someDate.getFullYear() == today.getFullYear()
        }

    const timeToTimestamp = (dt) =>{
        console.log(dt);
        var dateString = dt,
            dateTimeParts = dateString.split(' '),
            timeParts = dateTimeParts[1].split(':'),
            dateParts = dateTimeParts[0].split('-'),
            date;
            date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);console.log(date.getTime())
            return date.getTime()
        }

    chrome.storage.sync.get(null,(storagedata)=>{
        let lastDate = "";
        let today = false;
        if(storagedata.nextRemainder){
            lastDate = storagedata.lastDate;
            today = isToday(lastDate);
        }else{
            today = "off"
        }

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

    const start_mon_btn = document.getElementById('start_mon_btn');
    const take_record_mon_btn = document.getElementById('take_record_mon_btn');
    const stop_record_mon_btn = document.getElementById('stop_record_mon_btn');

    const set_reminder = document.querySelector(".set-reminder");
    const reminder_list = document.querySelector(".reminder-list");

    const progress_bar = document.getElementById('progress_bar');

    // remainder_input.min = new Date().toISOString().slice(0,16);

    const reRenderRemainder = () => {
        let allList = document.querySelectorAll("ul li");
        for(let i = 0;i < allList.length;i++){
            allList[i].remove();
        }
        updateTime()
    }

    const updateTime = (elements) => {
        for(let i = 0;i < elements.length; i++){
            let tempListElement = document.createElement("li");
            tempListElement.setAttribute("class","list-element");
            let tempListElementTime = document.createElement("p");
            tempListElementTime.setAttribute("class","list-element-time");
            tempListElementTime.innerText = elements[i];
            let tempListElementClear = document.createElement("button");
            tempListElementClear.setAttribute("class","list-element-clear");
            tempListElementClear.innerText = "clear";
            tempListElementClear.addEventListener("click",()=>{
                chrome.storage.sync.get(null, function(data) {
                    console.log(data)
                    if(data.remainders && data.remainders.length > 0){
                        let filteredRemainders = data.remainders.filter((ele,index)=>{
                            console.log(ele,elements[i])
                            if(ele != elements[i]){
                                return ele;
                            }
                        })
                        chrome.storage.sync.set({remainders:filteredRemainders})
                    }
                });
            })
            tempListElement.appendChild(tempListElementTime);
            tempListElement.appendChild(tempListElementClear);
            time_list_container.appendChild(tempListElement);
        }
    }

    function onTimeChange() {
        var timeSplit = document.querySelector("#time").value.split(':'),
          hours,
          minutes,
          meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
        if (hours > 12) {
          meridian = 'PM';
          hours -= 12;
        } else if (hours < 12) {
          meridian = 'AM';
          if (hours == 0) {
            hours = 12;
          }
        } else {
          meridian = 'PM';
        }
        return (hours + ':' + minutes + ' ' + meridian)
      }

    set_reminder.addEventListener("click",()=>{
        let date = document.querySelector("#date").value;
        let time = document.querySelector("#time").value;

        if(date && time){
            let reminderTime = (new Date(`${date}` + ' ' + `${time}` + ':00')).getTime();
            console.log(reminderTime)
            chrome.storage.sync.get(null,(data)=>{
                let reminders = data.reminders;
                if(!reminders){
                    reminders = [];
                }
                if(!reminders.includes(reminderTime)){
                    let normalTime = onTimeChange();
                    let listElement = document.createElement("li");
                    let checkBox = document.createElement("input");
                    checkBox.setAttribute("type","checkbox");
                    checkBox.setAttribute("class","checkbox");
                    checkBox.setAttribute("id",`${reminderTime}`);
                    listElement.appendChild(checkBox);
                    let dateSpan = document.createElement("span");
                    dateSpan.innerText = date;
                    let timeSpan = document.createElement("span");
                    timeSpan.innerText = normalTime;
                    listElement.appendChild(dateSpan);
                    listElement.appendChild(timeSpan);
                    reminder_list.appendChild(listElement);
                    reminders.push(reminderTime);
                    chrome.storage.sync.set({reminders})
                }else{
                    alert("Reminder Already found");
                }
            })
 
        }else{
            alert("Please select a date and time");
        }
        
    })

    close.addEventListener('click', function () {
        window.close();
    });

    chrome.tabs.getSelected(null, function (_tab) {
        tab = _tab
        const tabId = tab.id;
        chrome.tabs.sendMessage(tabId, { msg: 'needCount', tabId }, function (res) {
            console.log(res)
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
        progress_bar.style.display = 'block';
            chrome.tabs.sendMessage(tab.id, { msg: 'startMonitoring', tabId: tab.id }, function () {
                setTimeout(() => {
                    window.open('../monitor/monitor.html', '_blank');
                    window.location.reload()
                }, 1250);
                return true;
            })  
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
        progress_bar.style.display = 'block'
        chrome.tabs.sendMessage(tab.id, { msg: 'single_scan', tabId: tab.id }, function () {
            setTimeout(() => window.location.reload(), 750);
            return true;
        });
    });

    downloader.addEventListener('click', function () {
        progress_bar.style.display = 'block'
        chrome.tabs.sendMessage(tab.id, { msg: 'downloadReq', tabId: tab.id }, function () {
            setTimeout(() => window.location.reload(), 750);
            return true;
        })
    });

    clearer.addEventListener('click', function () {
        chrome.tabs.sendMessage(tab.id, { msg: 'clearAttendance', tabId: tab.id }, function () {
            counter.innerHTML = '0';
            return true;
        });
    });
    })

});
