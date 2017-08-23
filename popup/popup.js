(function () {
  'use strict';

  $('#refresh-button').click(function () {
    RefreshTasks();
  });
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
                // taskEstimateInHours = fields.timeoriginalestimate / 60 / 60,
                // taskVersion = fields.fixVersions[0].name,
                taskDescription = issue.fields.description;

            var task = $('#task');
            task.find('.task-icon').alt = issueType;
            task.find('.task-icon').src = issueIcon;
            task.find('.task-key').href = taskUrl;
            task.find('.task-key').text = taskKey;
            task.find('.task-summary').text = taskSummary;
            task.find('.task-status').text = taskStatus;
            task.find('.task-description').alt = taskDescription;




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

            console.log(task);

            $(".all-tasks").append(task);

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