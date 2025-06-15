//gets values from jobPosts OBJECT in job-data.js
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get("title");
    const jobLocation = urlParams.get("jobLocation");
    const company = urlParams.get("company");
    const experience = urlParams.get("experience");
    const closingDate = urlParams.get("closingDate");

    //communicates with job-detail.html template and sets values from job-data.js to the empty template container
    document.getElementById("job-title").innerText = title;
    document.getElementById("job-location").innerText = jobLocation;
    document.getElementById("job-company").innerText = company;
    document.getElementById("job-experience").innerText = experience;
    document.getElementById("job-closing-date").innerText = closingDate;
    
    

    // Find job description from jobPosts
    const job = jobPosts.find(job => job.title === title);
    document.getElementById("job-description").innerText = job ? job.description : "No description available.";
    if (job){
        document.getElementById("job-description").innerHTML = job.description.replace(/\n/g, "<br>");
     }
});
