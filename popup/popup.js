var cacheManager;

(function () {
    'use strict';

    $('#refresh-button').click(function () {
        RefreshTasks();
    });

    var backgroundPage = chrome.extension.getBackgroundPage();
    cacheManager = new backgroundPage.cachedContent();
    
    var content = cacheManager.getContent();
    if (content != null) {
        $(".all-tasks").append(content);
    }
}());

function RefreshTasks() {

    var issues;
    var allIssuesUrl = 'https://b2bpolis.atlassian.net/rest/api/2/search?jql=project=Scrum%20and%20assignee=vf%20and%20status%20in%20(Draft,Open,%22In%20Progress%22)';

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": allIssuesUrl,
        "method": "GET",
        "headers": {
            "authorization": "Basic dmZAY21pb3MucnU6MjM0d2VyXys="
        }
    };
    
    var tasks = $(".all-tasks");
    tasks.innerHTML = '';

    $.ajax(settings).done(function (response) {
        // console.log(response);
        issues = response.issues.slice(0, 3);
        console.log(issues);

        console.log('!!!');

        _.each(issues, function(issue) {

            var issueIcon = issue.fields.issuetype.iconUrl,
                issueType = issue.fields.issuetype.name,
                taskKey = issue.key,
                taskUrl = 'https://b2bpolis.atlassian.net/browse/' + taskKey,
                taskSummary = issue.fields.summary,
                taskStatus = issue.fields.status.name,
//                taskEstimate = issue.fields.timeoriginalestimate,
//                taskVersions = issue.fields.fixVersions,
                taskDescription = issue.fields.description;

            
            var task = $('#task-template')[0].content.cloneNode(true).firstElementChild;
            task.getElementsByClassName('task-icon')[0].alt = issueType;
            task.getElementsByClassName('task-icon')[0].src = issueIcon;
            task.getElementsByClassName('task-key')[0].firstElementChild.href = taskUrl;
            task.getElementsByClassName('task-key')[0].firstElementChild.text = taskKey;
            task.getElementsByClassName('task-summary')[0].textContent = taskSummary;
            task.getElementsByClassName('task-status')[0].textContent = taskStatus;
            task.getElementsByClassName('task-description')[0].textContent = taskDescription;

//            if (taskVersions) {
//                var taskVersion = taskVersions[0].name;
//                task.getElementsByClassName('task-version')[0].text = taskVersion;
//            }
//            
//            if (taskEstimate) {
//                var hours = Math.floor(taskEstimate / (60 * 60)),
//                    minutes = Math.floor(taskEstimate % (60 * 60) / 60);
//                task.getElementsByClassName('task-estimation')[0].text = hours + 'h' + ' ' + minutes + 'm';
//            }

            // var sdsdf = `
            // <div class="task">
            //     <img src="https://b2bpolis.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype" alt="Bug" class="task-icon">
            //     <span class="task-key"><a href="https://b2bpolis.atlassian.net/browse/SCRUM-3099">SCRUM-3099</a></span>
            //     <span class="task-summary">${issue}</span>
            //     <p class="task-status">Draft</p>
            //     <p class="task-description">Составить инструкцию по смене сертификата</p>
            // </div>
            // `;




            // var task = '<div class="task"><img src="' + issueIcon + '" alt="' + issueType + '" class="task-icon">' +
            //             '<span class="task-key"><a href="' + taskUrl + '">' + taskKey + '</a></span>' +
            //             '<span class="task-summary">' + taskSummary + '</span>' +
            //             '<p class="task-status">' + taskStatus + '</p>' +
            //             '<p class="task-description">' + taskDescription + '</p></div>';

//            console.log(task);

            tasks.append(task);
            cacheManager.saveContent(tasks.html);

        });

    });






    //
    // $.get(allIssuesUrl, function(data, status) {
    //     console.log(status);
    //     console.log(data);
    //
    //     // alert("Data: " + data + "\nStatus: " + status);
    // });


    // var task = '<div class="task"><img src="' + issueIcon + '" alt="' + issueIcon + '" class="task-icon">' +
    // '<span class="task-key"><a href="' + taskUrl + '">' + taskKey + '</a></span>' +
    // '<span class="task-summary">' + taskSummary + '</span>' +
    // '<p class="task-status">' + taskStatus + '</p>' +
    // '<p class="task-description">' + taskDescription + '</p></div>';

    // console.log('4533');
    // $(".all-tasks").append("<div>werwerwer</div>");

    // chrome.tabs.create({
    //         url: "https://b2bpolis.atlassian.net/browse/SCRUM-3099"
    //     }, function (tab) {
    //         console.log(tab);
    // });
}