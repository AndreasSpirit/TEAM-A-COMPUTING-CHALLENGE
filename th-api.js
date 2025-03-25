const TH_TEST_API_URL = "https://codecyprus.org/th/test-api/"; // the test API base
const TH_API_URL = "https://codecyprus.org/th/api/"; // the API base url
function handleLeaderboard(leaderboard) {
    console.log(leaderboard);
    let options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
        second: '2-digit' };
    let html = ""; // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];
    console.log("leaderboardArray", leaderboardArray);
    console.log("length: " + leaderboardArray.length);

    for(const entry of leaderboardArray) {
    //for (let i = 0; i < leaderboardArray.length; i++) {
       // const entry = leaderboardArray[i];
        let date = new Date(entry['completionTime']);
        let formattedDate = date.toLocaleDateString("en-UK", options);
        html += "<tr>" +
            "<td>" + entry['player'] + "</td>" +
            "<td>" + entry['score'] + "</td>" +
            "<td>" + formattedDate + "</td>" +
            "</tr>";
    }

    let leaderboardElement = document.getElementById('test-results-table'); // table
    leaderboardElement.innerHTML += html; // append generated HTML to existing
}
function getLeaderBoard(url) {
// create and invoke the http request
    fetch(url, { method: "GET" })
        .then(response => response.json())
        .then(json => handleLeaderboard(json));
}
// for now, hardcoded
let session = "ag9nfmNvZGVjeXBydXNvcmdyFAsSB1Nlc3Npb24YgICA4OnngggM";
// let url = TH_TEST_API_URL + "leaderboard?sorted&session=" + session; // form url
// getLeaderBoard(url);

function getSession() {
    let url = new URL(window.location.href);
    return url.searchParams.get("session");
}
// checks if the test flag has been set in the URL
function isTest() {
    let url = new URL(window.location.href);
    return url.searchParams.get("test") != null;
}
// check if test and use the actual API or the TEST API accordingly
if(isTest()) {
// form the test service url
    let url = TH_TEST_API_URL + "leaderboard?size=20&sorted";
    getLeaderBoard(url);
} else {
// form the actual TH service url
    let session = getSession();
    let url = TH_API_URL + "leaderboard?sorted&session=" + session; // form url
    getLeaderBoard(url);
}
/**
 * This is a function to access the /leaderboard at the specified URL
 */